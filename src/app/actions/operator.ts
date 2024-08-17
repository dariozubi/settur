'use server'

import prisma from '@/db'
import { Operator } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

export async function getOperators() {
  try {
    const data = await prisma.operator.findMany({ orderBy: { id: 'asc' } })
    return { data }
  } catch (e) {
    return { data: null }
  }
}

export async function updateOperator({ id, name, phone }: Operator) {
  const session = await getServerSession()
  if (session && name && phone && id) {
    try {
      await prisma.operator.update({
        where: { id },
        data: { name, phone },
      })
      revalidatePath('/admin/dashboard')

      return { message: 'Operador actualizado' }
    } catch (e) {
      return { error: 'Error con Prisma' }
    }
  }

  return { error: 'Sin autorización' }
}

export async function createOperator({
  name,
  phone,
}: Pick<Operator, 'name' | 'phone'>) {
  const session = await getServerSession()
  if (session && name && phone) {
    try {
      await prisma.operator.create({
        data: { name, phone },
      })
      revalidatePath('/admin/dashboard')

      return { message: 'Operador creada' }
    } catch (e) {
      return { error: 'Error con Prisma' }
    }
  }

  return { error: 'Sin autorización' }
}
