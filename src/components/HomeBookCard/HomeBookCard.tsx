import Text from '@/components/Text'
import { Card, CardContent, CardHeader } from '../ui/card'
import { useTranslations } from 'next-intl'
import { BookForm } from './BookForm'
import { useMemo } from 'react'

function HomeBookCard() {
  const t = useTranslations('Home')
  const labels = useMemo(
    () => ({
      requiredHotelError: t('required-hotel-error'),
      requiredTypeError: t('required-type-error'),
      submit: t('continue'),
      hotelLabels: {
        selectHotel: t('select-hotel'),
        searchHotel: t('search-hotel'),
        noResults: t('no-results'),
      },
      typeLabels: {
        type1: t('private'),
        type2: t('shared'),
      },
    }),
    [t]
  )
  return (
    <Card>
      <CardHeader>
        <Text from="Home" as="h2" variant="lg" className="px-10 font-bold">
          book-your-trip
        </Text>
      </CardHeader>
      <CardContent>
        <BookForm labels={labels} />
      </CardContent>
    </Card>
  )
}

export default HomeBookCard
