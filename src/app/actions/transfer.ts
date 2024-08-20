'use server'

import prisma from '@/db'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

export async function getTraslados() {
  try {
    const data = await prisma.transfer.findMany({
      where: {
        OR: [
          { order: { status: { equals: 'RESERVED' } } },
          { order: { status: { equals: 'PAID' } } },
        ],
        AND: {
          date: { gte: new Date(new Date().setDate(new Date().getDate() - 1)) },
        },
      },
      include: {
        order: { include: { hotel: true } },
        unit: true,
      },
      orderBy: { date: 'asc' },
    })
    return { data }
  } catch (e) {
    return { data: null }
  }
}

export async function addReturnTransfer({
  orderId,
  date,
  flight,
  rateId,
}: {
  orderId: number
  date: Date
  flight: string
  rateId: number
}) {
  const session = await getServerSession()
  if (session) {
    if (orderId && date && flight && rateId) {
      try {
        const transfer = await prisma.transfer.create({
          data: {
            orderId,
            date,
            flight: flight.toUpperCase(),
            direction: 'AIRPORT',
          },
          select: { id: true },
        })
        const order = await prisma.order.findUnique({
          where: { id: orderId },
          include: { hotel: true },
        })
        const rate = await prisma.rate.findUnique({ where: { id: rateId } })
        await prisma.order.update({
          where: { id: orderId },
          data: {
            trip: 'ROUND',
            notes:
              order?.notes +
              `${new Date().toLocaleString('es')} ${session.user?.name} agregó el regreso #${transfer.id}\n${new Date().toLocaleString('es')} ${session.user?.name} agregó un extra de $${rate?.value}\n`,
            extras: rate?.value,
          },
        })
        revalidatePath('/admin/traslados')

        return { message: 'Traslado creado' }
      } catch (e) {
        return { error: 'Error con Prisma' }
      }
    }

    return { error: 'Error en los datos' }
  }

  return { error: 'Sin autorización' }
}

export async function addTransferUnit({
  transferId,
  unitId,
}: {
  transferId: number
  unitId: number
}) {
  const session = await getServerSession()
  if (session && transferId && unitId) {
    try {
      await prisma.transfer.update({
        where: { id: transferId },
        data: { unit: { connect: { id: unitId } } },
      })
      revalidatePath('/admin/traslados')

      return { message: 'Traslado actualizado' }
    } catch (e) {
      return { error: 'Error con Prisma' }
    }
  }

  return { error: 'Sin autorización' }
}

export async function setAsNoShow({ transferId }: { transferId: number }) {
  const session = await getServerSession()
  if (session && transferId) {
    try {
      const transfer = await prisma.transfer.update({
        where: { id: transferId },
        data: { isNoShow: true },
        select: { orderId: true, id: true },
      })
      const order = await prisma.order.findUnique({
        where: { id: transfer.orderId },
        select: { notes: true },
      })
      if (order)
        await prisma.order.update({
          where: { id: transfer.orderId },
          data: {
            notes:
              order.notes +
              `${new Date().toLocaleString('es')} ${session.user?.name} decretó la transferencia #${transfer.id} como NO SHOW\n`,
          },
        })
      revalidatePath('/admin/traslados')

      return { message: 'Traslado actualizado' }
    } catch (e) {
      return { error: 'Error con Prisma' }
    }
  }

  return { error: 'Sin autorización' }
}
