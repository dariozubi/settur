import { useTranslations } from 'next-intl'
import Image from 'next/image'

import Card, {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/Card'
import { vehicles } from '@/lib/consts'
import Link from 'next/link'

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
                    sizes="(max-width: 350px) 100vw, 33vw"
                  />
                </div>

                <p className="text-center">{t('private-text')}</p>
              </CardContent>

              <CardFooter>
                <Link
                  className="inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-stone-50 ring-offset-white transition-colors hover:bg-stone-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-stone-50 dark:text-stone-900 dark:ring-offset-stone-950 dark:hover:bg-stone-50/90 dark:focus-visible:ring-stone-300"
                  href="/services"
                >
                  {t('learn-more')}
                </Link>
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
                    sizes="(max-width: 350px) 100vw, 33vw"
                  />
                </div>

                <p className="text-center">{t('shared-text')}</p>
              </CardContent>

              <CardFooter>
                <Link
                  className="inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-stone-50 ring-offset-white transition-colors hover:bg-stone-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-stone-50 dark:text-stone-900 dark:ring-offset-stone-950 dark:hover:bg-stone-50/90 dark:focus-visible:ring-stone-300"
                  href="/services"
                >
                  {t('learn-more')}
                </Link>
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
                    sizes="(max-width: 350px) 100vw, 33vw"
                  />
                </div>

                <p className="text-center">{t('groups-text')}</p>
              </CardContent>

              <CardFooter>
                <Link
                  className="inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-stone-50 ring-offset-white transition-colors hover:bg-stone-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-stone-50 dark:text-stone-900 dark:ring-offset-stone-950 dark:hover:bg-stone-50/90 dark:focus-visible:ring-stone-300"
                  href="/services"
                >
                  {t('learn-more')}
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeCardSection
