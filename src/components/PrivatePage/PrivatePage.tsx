import { getHotels } from '@/app/actions/hotel'
import { getRates } from '@/app/actions/rate'
import PrivateForm from '@/components/PrivateForm'

async function PrivatePage() {
  const hotels = await getHotels()
  const rates = await getRates()

  return (
    <section className="w-full bg-neutral-50">
      <div className="mx-auto w-full max-w-screen-xl pb-20 pt-0 sm:pt-10">
        <PrivateForm hotels={hotels} rates={rates} />
      </div>
    </section>
  )
}

export default PrivatePage
