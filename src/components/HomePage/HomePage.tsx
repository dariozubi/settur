import prisma from '@/db'
import HomeCardSection from '../HomeCardSection'
import HomeHeroSection from '../HomeHeroSection'
import HomeRatesSection from '../HomeRatesSection'

async function HomePage() {
  const hotels = await prisma.hotel.findMany({ orderBy: { id: 'asc' } })
  const rates = await prisma.rate.findMany()
  return (
    <>
      <HomeHeroSection hotels={hotels} />
      <HomeCardSection />
      <HomeRatesSection rates={rates} />
    </>
  )
}

export default HomePage
