import { Hotel } from '@prisma/client'

import { showHotel } from '@/lib/utils'
import SharedForm from '../SharedForm'
import { getRates } from '@/app/actions/rate'
import { getHotels } from '@/app/actions/hotel'

async function SharedPage() {
  const hotelsData = await getHotels()
  const rates = await getRates()
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
