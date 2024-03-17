import { useLocale } from 'next-intl'

export function useIsEnglish() {
  const locale = useLocale()
  return locale === 'en'
}
