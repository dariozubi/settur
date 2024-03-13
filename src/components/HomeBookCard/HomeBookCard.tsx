import Text from '@/components/Text'
import { Card, CardContent, CardHeader } from '../ui/card'
import { useTranslations } from 'next-intl'
import { BookForm } from './BookForm'
import { useMemo } from 'react'
import { BookFormLabels } from './types'

function HomeBookCard() {
  const t = useTranslations('form')
  const labels: BookFormLabels = useMemo(
    () => ({
      error: {
        required: t('errors.required'),
        minimum: t('errors.minimum', { value: 1 }),
      },
      submit: t('continue'),
      hotel: {
        selectHotel: t('HotelSelect.select-hotel'),
        searchHotel: t('HotelSelect.search-hotel'),
        noResults: t('HotelSelect.no-results'),
      },
      vehicleType: {
        type1: t('VehicleTypeRadio.private'),
        type2: t('VehicleTypeRadio.shared'),
      },
      people: {
        label: t('PeopleInput.adults-number'),
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
