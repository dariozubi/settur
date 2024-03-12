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
      requiredPeopleError: t('required-number-error'),
      minimumPeopleError: t('minimum-people-error'),
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
      peopleLabels: {
        label: t('adults-number'),
      },
    }),
    [t]
  )
  return (
    <Card>
      <CardHeader>
        <Text
          from="Home"
          as="h2"
          variant="lg"
          className="mb-10 mt-5 px-10 font-bold"
        >
          book-your-trip
        </Text>
      </CardHeader>
      <CardContent className="mb-10">
        <BookForm labels={labels} />
      </CardContent>
    </Card>
  )
}

export default HomeBookCard
