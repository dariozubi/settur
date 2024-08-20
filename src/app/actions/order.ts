'use server'

import prisma from '@/db'
import { Order } from '@prisma/client'
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
        let extras = 0
        let notes = order.notes
        const hora = new Date().toLocaleString('es')
        if (newItems.length > 0) {
          extras += newItems.reduce(
            (prev, curr) =>
              prev + (rates.find(i => i.additionalId === curr)?.value || 0),
            0
          )
          notes += `${hora} ${session.user?.name} agregó ${newItems.toString()}\n`
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
          notes += `${hora} ${session.user?.name} agregó ${payingIndividuals} personas que pagan a $${rate} pp\n`
        }

        notes += `${hora} ${session.user?.name} añadió ${'$' + extras} en extras\n`

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
