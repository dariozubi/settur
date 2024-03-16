'use client'

import { Earth } from 'lucide-react'

import { usePathname, useRouter } from '@/navigation'
import Button from '@/components/Button'
import { useIsEnglish } from '@/lib/hooks'

export const LanguageSelector = () => {
  const pathname = usePathname()
  const router = useRouter()
  const isEnglish = useIsEnglish()

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
