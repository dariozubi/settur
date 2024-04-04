import PrivateForm from '@/components/PrivateForm'

async function PrivatePage() {
  const hotelsResponse = await fetch(`${process.env.NEXTAUTH_URL}api/hotels`)
  const hotelsData = await hotelsResponse.json()
  const ratesResponse = await fetch(`${process.env.NEXTAUTH_URL}api/rates`)
  const ratesData = await ratesResponse.json()

  return (
    <section className="w-full bg-neutral-50">
      <div className="mx-auto w-full max-w-screen-xl pb-20 pt-10">
        <PrivateForm hotels={hotelsData.hotels} rates={ratesData.rates} />
      </div>
    </section>
  )
}

export default PrivatePage
