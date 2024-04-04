import { Hotel } from '@prisma/client'

import { showHotel } from '@/lib/utils'
import SharedForm from '../SharedForm'

async function SharedPage() {
  const resp = await fetch(`${process.env.NEXTAUTH_URL}api/hotels`)
  const data = await resp.json()
  const hotels = data.hotels.filter((h: Hotel) => showHotel(h.zone))
  return (
    <section className="w-full bg-neutral-50">
      <div className="mx-auto w-full max-w-screen-xl pb-20 pt-10">
        <SharedForm hotels={hotels} />
      </div>
    </section>
  )
}

export default SharedPage
