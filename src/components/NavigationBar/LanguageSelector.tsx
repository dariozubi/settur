'use client'

import { usePathname, useRouter } from '@/navigation'
import { Button } from '@nextui-org/react'
import { usePathname as useNextPathname } from 'next/navigation'
import { IoGlobeOutline } from 'react-icons/io5'

export const LanguageSelector = () => {
  const nextPathname = useNextPathname()
  const pathname = usePathname()
  const router = useRouter()
  const isEnglish = nextPathname?.substring(0, 3) === '/en'
  return (
    <Button
      onClick={() =>
        router.replace(pathname, { locale: isEnglish ? 'es' : 'en' })
      }
      variant="light"
      startContent={<IoGlobeOutline className="size-4" />}
    >
      <span className="text-base">{isEnglish ? 'Español' : 'English'}</span>
    </Button>
  )
}
