import { Hotel } from '@prisma/client'

import { showHotel } from '@/lib/utils'
import SharedForm from '../SharedForm'
import prisma from '@/db'

async function SharedPage() {
  const hotelsData = await prisma.hotel.findMany({ orderBy: { id: 'asc' } })
  const rates = await prisma.rate.findMany()
  const hotels = hotelsData.filter((h: Hotel) => showHotel(h.zone))

  return (
    <section className="w-full bg-neutral-50">
      <div className="mx-auto w-full max-w-screen-xl pb-20 sm:pt-10">
        <SharedForm hotels={hotels} rates={rates} />
      </div>
    </section>
  )
}

export default SharedPage
