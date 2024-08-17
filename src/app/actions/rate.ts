'use server'

import prisma from '@/db'
import { Rate } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

export async function getRates() {
  try {
    const data = await prisma.rate.findMany({ orderBy: { id: 'asc' } })
    return { data }
  } catch (e) {
    return { data: null }
  }
}

export async function updateRate({
  id,
  value,
  priceId,
}: Pick<Rate, 'id' | 'value' | 'priceId'>) {
  const session = await getServerSession()
  if (session && value && priceId && id) {
    try {
      await prisma.rate.update({
        where: { id },
        data: { value, priceId },
      })
      revalidatePath('/admin/dashboard')

      return { message: 'Precio actualizado' }
    } catch (e) {
      return { error: 'Error con Prisma' }
    }
  }

  return { error: 'Sin autorización' }
}
