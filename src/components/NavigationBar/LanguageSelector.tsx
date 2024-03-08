'use client'

import { usePathname, useRouter } from '@/navigation'
import { usePathname as useNextPathname } from 'next/navigation'
import { Button } from '../ui/button'
import { Earth } from 'lucide-react'

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
      variant="ghost"
    >
      <Earth className="mr-1 size-4" />
      <span className="text-small font-medium">
        {isEnglish ? 'Español' : 'English'}
      </span>
    </Button>
  )
}
