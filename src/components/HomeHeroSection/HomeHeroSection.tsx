import Image from 'next/image'
import Text from '@/components/Text'
import Button from '@/components/Button'

function HomeHeroSection() {
  return (
    <section className="from-primary-10 via-secondary-10 to-tertiary-10 relative h-full w-full bg-gradient-to-b">
      <div className="mx-auto flex w-full max-w-screen-xl justify-between pt-10">
        <div className="w-5/12">
          <figure>
            <div className="relative aspect-[978/182]">
              <Image
                src="/img/logo.png"
                alt="image"
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 50vw"
                priority={true}
              />
            </div>

            <figcaption>
              <Text from="Home" as="h1" variant="lg" className="font-bold">
                ground-transportation-services
              </Text>
            </figcaption>
          </figure>

          <Text from="Home" isRichText className="mt-32">
            hero-text
          </Text>
        </div>
        <div className="shadow-brand bg-light border-primary-dark -mb-[201px] mt-20 w-1/2 rounded-xl border py-10 pt-10 opacity-100">
          <Text from="Home" as="h2" variant="lg" className="px-10 font-bold">
            book-your-trip
          </Text>

          <div className="border-b-primary-dark flex border-b px-16 py-10">
            <Text from="Home" variant="md" className="font-bold">
              hotel
            </Text>

            <Text variant="md" className="mr-2">
              :
            </Text>

            <div className="min-w-40 border" />
          </div>
          <div className="border-b-primary-dark flex gap-2 border-b px-16 py-10">
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
