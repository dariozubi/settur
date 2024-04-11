'use client'

import { vehicles } from '@/lib/consts'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { buttonVariants } from '../Button'
import Card, { CardContent, CardFooter, CardHeader, CardTitle } from '../Card'
import {
  Accessibility,
  Baby,
  Bike,
  FishSymbol,
  PawPrint,
  Rocket,
  Ship,
} from 'lucide-react'
import { Link } from '@/navigation'

function ServicesPage() {
  const t = useTranslations('services')
  return (
    <section className="min-h-screen w-full bg-neutral-50">
      <div className="mx-auto w-full max-w-screen-xl px-4">
        <div className="flex py-40">
          <div className="flex w-1/2 flex-col items-center justify-center gap-4 px-8 text-center">
            <h1 className="text-5xl font-black">{t('hero-header')}</h1>
            <p className="text-xl font-bold">{t('hero-text')}</p>
          </div>
          <div className="flex w-1/2 items-center px-10">
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
        <div className="flex py-20">
          <div className="flex w-1/2 items-center px-10">
            <Card>
              <CardHeader>
                <CardTitle>{t('private-service')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{t('private-text')}</p>
                <hr className="my-4" />
                <p>{t('private-items')}</p>
                <div className="flex items-center gap-4">
                  <Accessibility className="size-4" />
                  <p>{t('wheelchair')}</p>
                </div>
                <div className="flex items-center gap-4">
                  <PawPrint className="size-4" />
                  <p>{t('petbox')}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Ship className="size-4" />
                  <p>Kayak</p>
                </div>
                <div className="flex items-center gap-4">
                  <Bike className="size-4" />
                  <p>{t('bicycle')}</p>
                </div>
                <div className="flex items-center gap-4">
                  <FishSymbol className="size-4" />
                  <p>{'surf-table'}</p>
                </div>
                <hr className="my-4" />
                <p>{t('child-seats-text')}</p>
                <div className="flex items-center gap-4">
                  <Baby className="size-4" />
                  <p>{t('car-seat')}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Rocket className="size-4" />
                  <p>{t('booster-seat')}</p>
                </div>
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

          <div className="flex w-1/2 flex-col items-center justify-between px-10">
            <Card>
              <CardHeader>
                <CardTitle>{t('shared-service')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{t('shared-text')}</p>
                <hr className="my-4" />
                <p>{t('child-seats-text')}</p>
                <div className="flex items-center gap-4">
                  <Baby className="size-4" />
                  <p>{t('car-seat')}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Rocket className="size-4" />
                  <p>{t('booster-seat')}</p>
                </div>
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
