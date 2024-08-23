'use server'

import prisma from '@/db'
import { Operator } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { revalidateTag, unstable_cache } from 'next/cache'

export const getOperators = unstable_cache(
  async () => {
    try {
      const data = await prisma.operator.findMany({ orderBy: { id: 'asc' } })
      return data
    } catch (e) {
      return []
    }
  },
  ['getOperators'],
  { tags: ['getOperators'], revalidate: false }
)

export async function updateOperator({ id, name, phone }: Operator) {
  const session = await getServerSession()
  if (session) {
    if (name && phone && id) {
      try {
        await prisma.operator.update({
          where: { id },
          data: { name, phone },
        })
        revalidateTag('getOperators')

        return { message: 'Operador actualizado' }
      } catch (e) {
        return { error: 'Error con Prisma' }
      }
    }

    return { error: 'Error en los datos' }
  }

  return { error: 'Sin autorización' }
}

export async function createOperator({
  name,
  phone,
}: Pick<Operator, 'name' | 'phone'>) {
  const session = await getServerSession()
  if (session) {
    if (name && phone) {
      try {
        await prisma.operator.create({
          data: { name, phone },
        })
        revalidateTag('getOperators')

        return { message: 'Operador creada' }
      } catch (e) {
        return { error: 'Error con Prisma' }
      }
    }
    return { error: 'Error en los datos' }
  }

  return { error: 'Sin autorización' }
}
