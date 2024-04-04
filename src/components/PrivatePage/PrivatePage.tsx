import PrivateForm from '@/components/PrivateForm'

async function PrivatePage() {
  const resp = await fetch(`${process.env.NEXTAUTH_URL}api/hotels`)
  const data = await resp.json()

  return (
    <section className="w-full bg-neutral-50">
      <div className="mx-auto w-full max-w-screen-xl pb-20 pt-10">
        <PrivateForm hotels={data.hotels} />
      </div>
    </section>
  )
}

export default PrivatePage
