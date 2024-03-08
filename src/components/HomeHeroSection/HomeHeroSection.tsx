import Text from '@/components/Text'
import HomeBookBlock from '../HomeBookBlock'

function HomeHeroSection() {
  return (
    <section className="relative h-full w-full bg-gradient-to-b from-primary-10 via-sunset-10 to-sunset-2-10">
      <div className="mx-auto flex min-h-[400px] w-full max-w-screen-xl justify-between pt-10">
        <div className="flex w-5/12 flex-col justify-center">
          <Text from="Home" isRichText variant="lg" className="text-center">
            hero-text
          </Text>
        </div>
        <div className="-mb-[201px] mt-20 w-1/2">
          <HomeBookBlock />
        </div>
      </div>
    </section>
  )
}

export default HomeHeroSection