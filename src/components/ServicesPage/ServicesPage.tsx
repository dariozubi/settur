'use client'

import { vehicles } from '@/lib/consts'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { buttonVariants } from '../Button'
import Card, { CardContent, CardFooter, CardHeader, CardTitle } from '../Card'
import { Link } from '@/navigation'

function ServicesPage() {
  const t = useTranslations('services')
  return (
    <section className="min-h-screen w-full bg-neutral-50">
      <div className="mx-auto w-full max-w-screen-xl px-4">
        <div className="flex flex-wrap py-20 sm:py-40">
          <div className="flex w-full flex-col items-center justify-center gap-4 px-8 text-center sm:w-1/2">
            <h1 className="text-3xl font-black sm:text-5xl">
              {t('hero-header')}
            </h1>
            <p className="text-xl font-bold">{t('hero-text')}</p>
          </div>
          <div className="flex w-full items-center px-10 pt-20 sm:w-1/2 sm:pt-0">
            <div
              className={`relative w-full ${vehicles['ESCALADE'].imgAspect}`}
            >
              <Image
                src={`/img/escalade.png`}
                alt={'escalade'}
                fill
                className="object-contain"
                sizes="(max-width: 1280px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
        <hr />
        <div className="flex flex-wrap py-10 sm:py-20">
          <div className="flex w-full items-center px-4 py-2 sm:w-1/2 sm:px-10">
            <Card>
              <CardHeader>
                <CardTitle>{t('private-service')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{t('private-text')}</p>
                <hr className="my-4" />
                <p>{t('private-items')}</p>
                <ul className="pl-4">
                  <li className="flex items-center gap-4">
                    &#x2022; {t('wheelchair')}
                  </li>
                  <li className="flex items-center gap-4">
                    &#x2022; {t('petbox')}
                  </li>
                  <li className="flex items-center gap-4">&#x2022; Kayak</li>
                  <li className="flex items-center gap-4">
                    &#x2022; {t('bicycle')}
                  </li>
                  <li className="flex items-center gap-4">
                    &#x2022; {t('surf-table')}
                  </li>
                </ul>
                <hr className="my-4" />
                <p>{t('child-seats-text')}</p>
                <ul className="pl-4">
                  <li className="flex items-center gap-4">
                    &#x2022; {t('car-seat')}
                  </li>
                  <li className="flex items-center gap-4">
                    &#x2022; {t('booster-seat')}
                  </li>
                </ul>
                <hr className="my-4" />
                <p>{t('shopping')}</p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link
                  href="/private"
                  className={buttonVariants({ variant: 'outline' })}
                >
                  {t('reserve')}
                </Link>
              </CardFooter>
            </Card>
          </div>

          <div className="flex w-full flex-col items-center justify-between gap-4 px-4 py-2 sm:w-1/2 sm:px-10">
            <Card>
              <CardHeader>
                <CardTitle>{t('shared-service')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{t('shared-text')}</p>
                <hr className="my-4" />
                <p>{t('child-seats-text')}</p>
                <ul className="pl-4">
                  <li className="flex items-center gap-4">
                    &#x2022; {t('car-seat')}
                  </li>
                  <li className="flex items-center gap-4">
                    &#x2022; {t('booster-seat')}
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link
                  href="/shared"
                  className={buttonVariants({ variant: 'outline' })}
                >
                  {t('reserve')}
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('group-service')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{t('group-service-text')}</p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <a
                  href="mailto:info@settur.com.mx"
                  className={buttonVariants({ variant: 'outline' })}
                >
                  {t('contact')}
                </a>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesPage