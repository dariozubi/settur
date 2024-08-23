'use server'

import prisma from '@/db'
import { getServerSession } from 'next-auth'
import { revalidateTag, unstable_cache } from 'next/cache'

export const getIsActive = unstable_cache(
  async () => {
    try {
      const data = await prisma.flag.findUnique({ where: { id: 'IS_ACTIVE' } })
      return data ? data?.value : false
    } catch (e) {
      return false
    }
  },
  ['getIsActive'],
  { tags: ['getIsActive'], revalidate: false }
)

export async function updateIsActive({ value }: { value: boolean }) {
  const session = await getServerSession()
  if (session) {
    if (value !== undefined) {
      try {
        await prisma.flag.update({
          where: { id: 'IS_ACTIVE' },
          data: { value },
        })
        revalidateTag('getIsActive')

        return { message: 'Precio actualizado' }
      } catch (e) {
        return { error: 'Error con Prisma' }
      }
    }

    return { error: 'No hay valor' }
  }

  return { error: 'Sin autorización' }
}
