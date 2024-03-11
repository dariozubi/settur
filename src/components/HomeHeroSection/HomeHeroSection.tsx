import Text from '@/components/Text'
import HomeBookCard from '../HomeBookCard'

function HomeHeroSection() {
  return (
    <section className="relative -mt-[64px] h-full w-full bg-gradient-to-b from-blue-200 via-violet-100 to-rose-50">
      <div className="mx-auto flex min-h-[400px] w-full max-w-screen-xl justify-between pt-10">
        <div className="flex w-5/12 flex-col justify-center">
          <Text from="Home" isRichText variant="lg" className="text-center">
            hero-text
          </Text>
        </div>
        <div className="-mb-[201px] mt-20 w-1/2">
          <HomeBookCard />
        </div>
      </div>
    </section>
  )
}

export default HomeHeroSection
