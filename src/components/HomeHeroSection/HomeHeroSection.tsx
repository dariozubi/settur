'use client'

import { Hotel } from '@prisma/client'
import HomeBookCard from '../HomeBookCard'
import { useTranslations } from 'next-intl'

type Props = {
  hotels: Hotel[]
}

function HomeHeroSection({ hotels }: Props) {
  const t = useTranslations('Home')
  return (
    <section className="relative -mt-[64px] min-h-screen w-full bg-gradient-to-b from-blue-200 via-violet-100 to-rose-50">
      <div className="mx-auto flex min-h-screen w-full max-w-screen-xl justify-between">
        <div className="flex w-5/12 flex-col items-center justify-center">
          <h1 className="text-center text-3xl">
            {t.rich('hero-text', {
              br: () => <br />,
              b: m => <span className="font-extrabold">{m}</span>,
            })}
          </h1>
        </div>
        <div className="flex w-1/2 items-center justify-center px-20">
          <HomeBookCard hotels={hotels} />
        </div>
      </div>
    </section>
  )
}

export default HomeHeroSection
