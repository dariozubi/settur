'use client'

import { Hotel } from '@prisma/client'
import HomeBookCard from '../HomeBookCard'
import { useTranslations } from 'next-intl'
import SetturLogo from '@/svg/settur.svg'

type Props = {
  hotels: Hotel[]
}

function HomeHeroSection({ hotels }: Props) {
  const t = useTranslations('Home')
  return (
    <section className="relative -mt-[64px] min-h-screen w-full bg-gradient-to-b from-blue-200 via-violet-100 to-rose-50">
      <div className="mx-auto flex min-h-screen w-full max-w-screen-xl flex-wrap justify-between">
        <div className="my-20 flex w-full flex-col items-center justify-center md:my-28 md:mt-0 md:w-5/12 lg:w-1/2">
          <SetturLogo className="w-full px-8" />
          <h1 className="px-8 text-center text-3xl">
            {t.rich('hero-text', {
              br: () => <br />,
              b: m => <span className="font-extrabold">{m}</span>,
            })}
          </h1>
        </div>
        <div className="mb-20 flex w-full items-center justify-center px-4 md:mb-0 md:w-7/12 md:px-20 lg:w-1/2">
          <HomeBookCard hotels={hotels} />
        </div>
      </div>
    </section>
  )
}

export default HomeHeroSection
