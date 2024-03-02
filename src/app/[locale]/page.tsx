import HomePage from '@/pages/home'
import { PageProps } from '@/utils/types'
import { unstable_setRequestLocale } from 'next-intl/server'

export default function Home({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale)
  return <HomePage />
}
