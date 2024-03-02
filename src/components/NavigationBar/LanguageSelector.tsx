'use client'

import { Link, usePathname } from '@/navigation'
import { usePathname as useNextPathname } from 'next/navigation'
import { IoGlobeOutline } from 'react-icons/io5'

export const LanguageSelector = () => {
  const nextPathname = useNextPathname()
  const pathname = usePathname()
  const isEnglish = nextPathname?.substring(0, 3) === '/en'
  return (
    <Link
      href={pathname}
      locale={isEnglish ? 'es' : 'en'}
      className="flex items-center gap-1"
    >
      <IoGlobeOutline className="size-5" />
      <span className="text-base lg:text-xl">
        {isEnglish ? 'Español' : 'English'}
      </span>
    </Link>
  )
}
