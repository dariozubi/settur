import prisma from '@/db'
import HomeCardSection from '../HomeCardSection'
import HomeHeroSection from '../HomeHeroSection'
import HomeRatesSection from '../HomeRatesSection'

async function HomePage() {
  const hotels = await prisma.hotel.findMany({ orderBy: { id: 'asc' } })
  const rates = await prisma.rate.findMany()
  const flag = await prisma.flag.findUnique({ where: { id: 'IS_ACTIVE' } })

  return (
    <>
      <HomeHeroSection hotels={hotels} isActive={!!flag?.value} />
      <HomeCardSection />
      <HomeRatesSection rates={rates} />
    </>
  )
}

export default HomePage
