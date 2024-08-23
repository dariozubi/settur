import HomeCardSection from '../HomeCardSection'
import HomeHeroSection from '../HomeHeroSection'
import HomeRatesSection from '../HomeRatesSection'
import { getRates } from '@/app/actions/rate'
import { getHotels } from '@/app/actions/hotel'
import { getIsActive } from '@/app/actions/flag'

async function HomePage() {
  const hotels = await getHotels()
  const rates = await getRates()
  const isActive = await getIsActive()

  return (
    <>
      <HomeHeroSection hotels={hotels} isActive={isActive} />
      <HomeCardSection />
      <HomeRatesSection rates={rates} />
    </>
  )
}

export default HomePage
