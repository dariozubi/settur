import { useTranslations } from 'next-intl'
import Image from 'next/image'

import Text from '@/components/Text'
import Card, {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/Card'
import Button from '@/components/Button'
import { vehicles } from '@/lib/consts'

function HomeCardSection() {
  const t = useTranslations('Home')
  return (
    <section className="flex bg-sky-950">
      <div className="mx-auto flex w-full max-w-screen-xl flex-wrap">
        <div className="w-5/12 text-balance py-16 text-center">
          <Text from="Home" variant="lg" isRichText className="text-neutral-50">
            solutions
          </Text>
        </div>

        <div className="flex w-full p-24">
          <Card className="mr-6 w-1/3">
            <CardHeader>
              <CardTitle>{t('private')}</CardTitle>
            </CardHeader>

            <CardContent>
              <div
                className={`relative h-[200px] ${vehicles['ESCALADE'].imgAspect}}`}
              >
                <Image
                  src="/img/escalade.png"
                  alt={t('private')}
                  fill
                  className="pointer-events-none object-contain"
                  sizes="(max-width: 1280px) 100vw, 33vw"
                />
              </div>

              <Text from="Home" className="text-center">
                private-text
              </Text>
            </CardContent>

            <CardFooter>
              <Button className="w-full">{t('learn-more')}</Button>
            </CardFooter>
          </Card>

          <Card className="mr-6 w-1/3">
            <CardHeader>
              <CardTitle>{t('shared')}</CardTitle>
            </CardHeader>

            <CardContent>
              <div
                className={`relative h-[200px] ${vehicles['SPRINTER'].imgAspect}`}
              >
                <Image
                  src="/img/sprinter.png"
                  alt={t('shared')}
                  fill
                  className="pointer-events-none object-contain"
                  sizes="(max-width: 1280px) 100vw, 33vw"
                />
              </div>

              <Text from="Home" className="text-center">
                shared-text
              </Text>
            </CardContent>

            <CardFooter>
              <Button className="w-full">{t('learn-more')}</Button>
            </CardFooter>
          </Card>

          <Card className="mr-6 w-1/3">
            <CardHeader>
              <CardTitle>{t('groups')}</CardTitle>
            </CardHeader>

            <CardContent>
              <div className={`relative my-6 aspect-[4307/2173] h-[150px]`}>
                <Image
                  src="/img/autobus.png"
                  alt={t('groups')}
                  fill
                  className="pointer-events-none object-contain"
                  sizes="(max-width: 1280px) 100vw, 33vw"
                />
              </div>

              <Text from="Home" className="text-center">
                groups-text
              </Text>
            </CardContent>

            <CardFooter>
              <Button className="w-full">{t('learn-more')}</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default HomeCardSection
