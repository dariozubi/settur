import { useTranslations } from 'next-intl'
import Image from 'next/image'

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
        <p className="w-full text-balance pt-12 text-center text-2xl text-neutral-50 lg:pt-24">
          {t.rich('solutions', {
            br: () => <br />,
            b: m => <span className="font-extrabold">{m}</span>,
          })}
        </p>

        <div className="flex w-full flex-wrap justify-between gap-4 px-4 py-12 lg:gap-0 lg:py-24">
          <div className="w-full lg:w-1/4 xl:w-1/3">
            <Card className="mx-auto max-w-[350px]">
              <CardHeader>
                <CardTitle>{t('private')}</CardTitle>
              </CardHeader>

              <CardContent>
                <div
                  className={`relative mx-auto h-[150px] xl:h-[200px] ${vehicles['ESCALADE'].imgAspect}}`}
                >
                  <Image
                    src="/img/escalade.png"
                    alt={t('private')}
                    fill
                    className="pointer-events-none object-contain"
                    sizes="(max-width: 1280px) 100vw, 33vw"
                  />
                </div>

                <p className="text-center">{t('private-text')}</p>
              </CardContent>

              <CardFooter>
                <Button className="w-full">{t('learn-more')}</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="w-full lg:w-1/4 xl:w-1/3">
            <Card className="mx-auto max-w-[350px]">
              <CardHeader>
                <CardTitle>{t('shared')}</CardTitle>
              </CardHeader>

              <CardContent>
                <div
                  className={`relative mx-auto lg:h-[150px] xl:h-[200px] ${vehicles['SPRINTER'].imgAspect}`}
                >
                  <Image
                    src="/img/sprinter.png"
                    alt={t('shared')}
                    fill
                    className="pointer-events-none object-contain"
                    sizes="(max-width: 1280px) 100vw, 33vw"
                  />
                </div>

                <p className="text-center">{t('shared-text')}</p>
              </CardContent>

              <CardFooter>
                <Button className="w-full">{t('learn-more')}</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="w-full lg:w-1/4 xl:w-1/3">
            <Card className="mx-auto max-w-[350px]">
              <CardHeader>
                <CardTitle>{t('groups')}</CardTitle>
              </CardHeader>

              <CardContent>
                <div
                  className={`relative mx-auto my-6 aspect-[4307/2173] lg:h-[100px] xl:h-[150px]`}
                >
                  <Image
                    src="/img/autobus.png"
                    alt={t('groups')}
                    fill
                    className="pointer-events-none object-contain"
                    sizes="(max-width: 1280px) 100vw, 33vw"
                  />
                </div>

                <p className="text-center">{t('groups-text')}</p>
              </CardContent>

              <CardFooter>
                <Button className="w-full">{t('learn-more')}</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeCardSection
