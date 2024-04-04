import Text from '@/components/Text'
import Card, { CardContent, CardHeader } from '@/components/Card'
import { BookForm } from './BookForm'

async function HomeBookCard() {
  const resp = await fetch(`${process.env.NEXTAUTH_URL}api/hotels`)
  const data = await resp.json()
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
        <BookForm dataHotels={data.hotels} />
      </CardContent>
    </Card>
  )
}

export default HomeBookCard
