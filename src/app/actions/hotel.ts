'use server'

import prisma from '@/db'
import { unstable_cache } from 'next/cache'

export const getHotels = unstable_cache(
  async () => {
    try {
      const data = await prisma.hotel.findMany({ orderBy: { id: 'asc' } })
      return data
    } catch (e) {
      return []
    }
  },
  ['getHotels'],
  { tags: ['getHotels'], revalidate: false }
)
