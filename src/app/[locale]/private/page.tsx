import PrivatePage from '@/components/PrivatePage'
import { PageProps } from '@/lib/types'
import { unstable_setRequestLocale } from 'next-intl/server'

export default function Private({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale)
  return <PrivatePage />
}
