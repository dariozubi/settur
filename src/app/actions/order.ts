'use server'

import prisma from '@/db'
import { Order } from '@prisma/client'
import { format } from 'date-fns'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

export async function updateOrder({
  adults,
  children,
  infants,
  items,
  id,
}: Pick<Order, 'id' | 'adults' | 'children' | 'infants' | 'items'>) {
  const session = await getServerSession()
  if (session && id) {
    try {
      const order = await prisma.order.findUnique({
        where: { id },
        include: { hotel: true },
      })
      if (order) {
        const rates = await prisma.rate.findMany()
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
        revalidatePath('/admin/dashboard')
      }

      return { message: 'Orden actualizada' }
    } catch (e) {
      return { error: 'Error con Prisma' }
    }
  }

  return { error: 'Sin autorización' }
}
