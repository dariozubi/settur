import PrivateForm from '@/components/PrivateForm'
import prisma from '@/db'

async function PrivatePage() {
  const hotels = await prisma.hotel.findMany({ orderBy: { id: 'asc' } })
  const rates = await prisma.rate.findMany()

  return (
    <section className="w-full bg-neutral-50">
      <div className="mx-auto w-full max-w-screen-xl pb-20 pt-0 sm:pt-10">
        <PrivateForm hotels={hotels} rates={rates} />
      </div>
    </section>
  )
}

export default PrivatePage
