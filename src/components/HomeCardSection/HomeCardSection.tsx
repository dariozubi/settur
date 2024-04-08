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
        <p className="w-full text-balance pt-24 text-center text-2xl text-neutral-50">
          {t.rich('solutions', {
            br: () => <br />,
            b: m => <span className="font-extrabold">{m}</span>,
          })}
        </p>

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

              <p className="text-center">{t('private-text')}</p>
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

              <p className="text-center">{t('shared-text')}</p>
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

              <p className="text-center">{t('groups-text')}</p>
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
