import { usePathname as useNextPathname } from 'next/navigation'

export function useIsEnglish() {
  const nextPathname = useNextPathname()
  const isEnglish = nextPathname?.substring(0, 3) === '/en'

  return isEnglish
}
