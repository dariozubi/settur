import { useTranslations } from 'next-intl'
import { CardTitle } from '../Card'

export const Header = () => {
  const t = useTranslations('Home')
  return (
    <CardTitle className="mb-5 mt-5 px-10 font-bold">
      {t('book-your-trip')}
    </CardTitle>
  )
}
