'use server'

import prisma from '@/db'
import { Order, Vehicle, Zone } from '@prisma/client'
import { format } from 'date-fns'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { getRates } from './rate'
import { ZoneChartData } from '@/components/OrderZonesChart'
import { VehicleChartData } from '@/components/OrderVehiclesChart'
import { OrdersChartData } from '@/components/OrdersChart'
import { OrderEarningsData } from '@/components/OrderEarningsChart'

export async function updateOrder({
  adults,
  children,
  infants,
  items,
  id,
}: Pick<Order, 'id' | 'adults' | 'children' | 'infants' | 'items'>) {
  const session = await getServerSession()
  if (session) {
    if (typeof id === 'number') {
      try {
        const order = await prisma.order.findUnique({
          where: { id },
          include: { hotel: true },
        })
        if (order) {
          const rates = await getRates()
          const isPrivate = order.vehicle !== 'SHARED'
          const newItems = items.filter(i => !order.items.includes(i))
          let extras = order.extras
          let notes = order.notes
          const hour = format(new Date(), 'dd/MM/yy HH:mm')
          if (newItems.length > 0) {
            extras += newItems.reduce(
              (prev, curr) =>
                prev + (rates.find(i => i.additionalId === curr)?.value || 0),
              0
            )
            notes += `${hour} ${session.user?.name} agregó ${newItems.toString()}\n`
          }

          if (!isPrivate) {
            const payingIndividuals =
              adults - order.adults + children - order.children
            const rate =
              rates.find(
                i =>
                  i.vehicle === order.vehicle &&
                  i.trip === order.trip &&
                  i.zone === order.hotel.zone
              )?.value || 1
            extras += rate * payingIndividuals
            notes += `${hour} ${session.user?.name} agregó ${payingIndividuals} personas a $${rate} pp\n`
          }

          notes += `${hour} ${session.user?.name} añadió $${extras} en extras\n`

          await prisma.order.update({
            where: { id },
            data: { adults, children, infants, items, extras, notes },
          })
          revalidatePath('/admin/operacion')
        }

        return { message: 'Orden actualizada' }
      } catch (e) {
        return { error: 'Error con Prisma' }
      }
    }

    return { error: 'Error en los datos' }
  }

  return { error: 'Sin autorización' }
}

export async function getOrderChartsData() {
  const session = await getServerSession()
  if (session) {
    try {
      const orders = await prisma.order.findMany({ include: { hotel: true } })

      let zoneData = [] as ZoneChartData
      Object.keys(Zone).forEach(z =>
        zoneData.push({ zone: z as Zone, total: 0, cash: 0 })
      )

      let vehicleData = [] as VehicleChartData
      Object.keys(Vehicle).forEach(v =>
        vehicleData.push({ vehicle: v as Vehicle, total: 0, cash: 0 })
      )

      let ordersData = [
        {
          trip: 'round',
          total: 0,
          fill: 'var(--color-round)',
        },
        {
          trip: 'oneway',
          total: 0,
          fill: 'var(--color-oneway)',
        },
      ] as OrdersChartData
      let ordersCreated = 0

      let earningsData = [
        {
          money: 'cash',
          total: 0,
          fill: 'var(--color-cash)',
        },
        {
          money: 'online',
          total: 0,
          fill: 'var(--color-online)',
        },
      ] as OrderEarningsData

      orders.forEach(o => {
        const zIdx = zoneData.findIndex(z => z.zone === o.hotel.zone)
        zoneData[zIdx].total += o.total - o.owed
        zoneData[zIdx].cash += o.owed

        const vIdx = vehicleData.findIndex(v => v.vehicle === o.vehicle)
        vehicleData[vIdx].total += o.total - o.owed
        vehicleData[vIdx].cash += o.owed

        earningsData[0].total += o.owed
        earningsData[1].total += o.total - o.owed

        const oIdx = ordersData.findIndex(
          order => order.trip.toUpperCase() === o.trip
        )
        if (o.status === 'PAID' || o.status === 'RESERVED')
          ordersData[oIdx].total += 1
        if (o.status === 'CREATED') ordersCreated += 1
      })

      return {
        zone: {
          data: zoneData.filter(z => z.total > 0),
        },
        vehicle: {
          data: vehicleData.filter(v => v.total > 0),
        },
        orders: {
          data: ordersData.filter(o => o.total > 0),
          created: ordersCreated,
        },
        earnings: { data: earningsData },
      }
    } catch (e) {
      return {
        ...empty,
        error: 'Error con Prisma',
      }
    }
  }

  return {
    ...empty,
    error: 'Sin autorización',
  }
}

const empty = {
  zone: {
    data: [],
  },
  vehicle: {
    data: [],
  },
  orders: {
    data: [],
    created: 0,
  },
  earnings: { data: [] },
}
