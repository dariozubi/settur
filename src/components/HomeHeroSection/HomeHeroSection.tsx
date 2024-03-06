import Text from '@/components/Text'
import Button from '@/components/Button'

function HomeHeroSection() {
  return (
    <section className="relative h-full w-full bg-gradient-to-b from-primary-10 via-sunset-10 to-sunset-2-10">
      <div className="mx-auto flex w-full max-w-screen-xl justify-between pt-10">
        <div className="w-5/12">
          <Text from="Home" isRichText className="mt-32">
            hero-text
          </Text>
        </div>
        <div className="-mb-[201px] mt-20 w-1/2 rounded-xl border border-primary-dark bg-light py-10 pt-10 opacity-100 shadow-brand">
          <Text from="Home" as="h2" variant="lg" className="px-10 font-bold">
            book-your-trip
          </Text>

          <div className="flex border-b border-b-primary-dark px-16 py-10">
            <Text from="Home" variant="md" className="font-bold">
              hotel
            </Text>

            <Text variant="md" className="mr-2">
              :
            </Text>

            <div className="min-w-40 border" />
          </div>
          <div className="flex gap-2 border-b border-b-primary-dark px-16 py-10">
            <Text from="Home" variant="md">
              hotel
            </Text>

            <div className="min-w-40 border" />
          </div>
          <div className="flex gap-2 px-16 py-10">
            <Text from="Home" variant="md">
              hotel
            </Text>

            <div className="min-w-40 border" />
          </div>

          <div className="flex justify-center">
            <Button from="Home">continue</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeHeroSection
