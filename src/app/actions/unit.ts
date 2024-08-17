'use server'

import prisma from '@/db'
import { Unit } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

export async function getUnits() {
  try {
    const data = await prisma.unit.findMany({ orderBy: { id: 'asc' } })
    return { data }
  } catch (e) {
    return { data: null }
  }
}

export async function updateUnit({ label, vehicle, id }: Unit) {
  const session = await getServerSession()
  if (session && label && vehicle && id) {
    try {
      await prisma.unit.update({
        where: { id },
        data: { label, vehicle },
      })
      revalidatePath('/admin/dashboard')

      return { message: 'Unidad actualizada' }
    } catch (e) {
      return { error: 'Error con Prisma' }
    }
  }

  return { error: 'Sin autorización' }
}

export async function createUnit({
  label,
  vehicle,
}: Pick<Unit, 'label' | 'vehicle'>) {
  const session = await getServerSession()
  if (session && label && vehicle) {
    try {
      await prisma.unit.create({
        data: { label, vehicle },
      })
      revalidatePath('/admin/dashboard')

      return { message: 'Unidad creada' }
    } catch (e) {
      return { error: 'Error con Prisma' }
    }
  }

  return { error: 'Sin autorización' }
}
