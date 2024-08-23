'use server'

import prisma from '@/db'
import { Unit } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { revalidateTag, unstable_cache } from 'next/cache'

export const getUnits = unstable_cache(
  async () => {
    try {
      const data = await prisma.unit.findMany({ orderBy: { id: 'asc' } })
      return data
    } catch (e) {
      return []
    }
  },
  ['getUnits'],
  { tags: ['getUnits'] }
)

export async function updateUnit({ label, vehicle, id }: Unit) {
  const session = await getServerSession()
  if (session) {
    if (label && vehicle && id) {
      try {
        await prisma.unit.update({
          where: { id },
          data: { label, vehicle },
        })
        revalidateTag('getUnits')

        return { message: 'Unidad actualizada' }
      } catch (e) {
        return { error: 'Error con Prisma' }
      }
    }
    return { error: 'Error en los datos' }
  }

  return { error: 'Sin autorización' }
}

export async function createUnit({
  label,
  vehicle,
}: Pick<Unit, 'label' | 'vehicle'>) {
  const session = await getServerSession()
  if (session) {
    if (label && vehicle) {
      try {
        await prisma.unit.create({
          data: { label, vehicle },
        })
        revalidateTag('getUnits')

        return { message: 'Unidad creada' }
      } catch (e) {
        return { error: 'Error con Prisma' }
      }
    }
    return { error: 'Error en los datos' }
  }

  return { error: 'Sin autorización' }
}
