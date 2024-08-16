'use client'

import { Hotel } from '@prisma/client'
import HomeBookCard from '../HomeBookCard'
import { useTranslations } from 'next-intl'
import SetturLogo from '@/svg/settur.svg'

type Props = {
  hotels: Hotel[]
  isActive: Boolean
}

function HomeHeroSection({ hotels, isActive }: Props) {
  const t = useTranslations('Home')
  const activeClassName = isActive ? 'md:w-5/12 lg:w-1/2' : ''

  return (
    <section className="relative -mt-[64px] min-h-screen w-full bg-gradient-to-b from-blue-200 via-violet-100 to-rose-50">
      <div className="mx-auto flex min-h-screen w-full max-w-screen-xl flex-wrap justify-between">
        <div
          className={`mb-20 mt-40 flex w-full flex-col items-center justify-center md:my-28 md:mt-0 ${activeClassName}`}
        >
          <SetturLogo className="mb-10 w-full max-w-[800px] px-8" />
          <h1 className="px-8 text-center text-3xl">
            {t.rich('hero-text', {
              br: () => <br />,
              b: m => <span className="font-extrabold">{m}</span>,
            })}
          </h1>
        </div>
        {isActive && (
          <div className="mb-20 flex w-full items-center justify-center px-4 md:mb-0 md:w-7/12 md:px-20 lg:w-1/2">
            <HomeBookCard hotels={hotels} />
          </div>
        )}
      </div>
    </section>
  )
}

export default HomeHeroSection
