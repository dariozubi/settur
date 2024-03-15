import SharedPage from '@/components/SharedPage'
import { PageProps } from '@/lib/types'
import { unstable_setRequestLocale } from 'next-intl/server'

export default function Shared({ params: { locale } }: PageProps) {
  unstable_setRequestLocale(locale)
  return <SharedPage />
}
