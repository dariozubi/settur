import { Hotel } from '@prisma/client'

import { showHotel } from '@/lib/utils'
import SharedForm from '../SharedForm'

async function SharedPage() {
  const hotelsResponse = await fetch(`${process.env.NEXTAUTH_URL}api/hotels`)
  const hotelsData = await hotelsResponse.json()
  const ratesResponse = await fetch(`${process.env.NEXTAUTH_URL}api/rates`)
  const ratesData = await ratesResponse.json()
  const hotels = hotelsData.hotels.filter((h: Hotel) => showHotel(h.zone))
  return (
    <section className="w-full bg-neutral-50">
      <div className="mx-auto w-full max-w-screen-xl pb-20 pt-10">
        <SharedForm hotels={hotels} rates={ratesData.rates} />
      </div>
    </section>
  )
}

export default SharedPage
