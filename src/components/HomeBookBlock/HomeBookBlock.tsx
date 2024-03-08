import Text from '@/components/Text'
import { HotelSelect } from './HotelSelect'
import { Card, CardContent, CardHeader } from '../ui/card'
import { useTranslations } from 'next-intl'

function HomeBookBlock() {
  const t = useTranslations('Home')
  return (
    <Card>
      <CardHeader>
        <Text from="Home" as="h2" variant="lg" className="px-10 font-bold">
          book-your-trip
        </Text>
      </CardHeader>
      <CardContent>
        <HotelSelect
          selectHotel={t('select-hotel')}
          searchHotel={t('search-hotel')}
          noResults={t('no-results')}
        />
      </CardContent>
    </Card>
  )
}

export default HomeBookBlock
