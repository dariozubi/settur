import HomePage from '@/components/HomePage'
import { PageProps } from '@/lib/types'
import { unstable_setRequestLocale } from 'next-intl/server'

export default function Home({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale)
  return <HomePage />
}
