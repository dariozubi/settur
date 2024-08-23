'use server'

import prisma from '@/db'
import { Rate } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { revalidateTag, unstable_cache } from 'next/cache'

export const getRates = unstable_cache(
  async () => {
    try {
      const data = await prisma.rate.findMany({ orderBy: { id: 'asc' } })
      return data
    } catch (e) {
      return []
    }
  },
  ['getRates'],
  { tags: ['getRates'], revalidate: false }
)

export async function updateRate({
  id,
  value,
  productId,
  testProductId,
}: Pick<Rate, 'id' | 'value' | 'productId' | 'testProductId'>) {
  const session = await getServerSession()
  if (session) {
    if (value && productId && id) {
      try {
        await prisma.rate.update({
          where: { id },
          data: { value, productId, testProductId },
        })
        revalidateTag('getRates')

        return { message: 'Precio actualizado' }
      } catch (e) {
        return { error: 'Error con Prisma' }
      }
    }

    return { error: 'Error en los datos' }
  }

  return { error: 'Sin autorización' }
}
