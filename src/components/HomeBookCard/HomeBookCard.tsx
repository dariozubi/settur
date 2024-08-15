import Card, { CardContent, CardHeader } from '@/components/Card'
import { BookForm } from './BookForm'
import { Header } from './Header'
import { Hotel } from '@prisma/client'

type Props = {
  hotels: Hotel[]
}

function HomeBookCard({ hotels }: Props) {
  return (
    <Card className="w-full">
      <CardHeader>
        <Header />
      </CardHeader>
      <CardContent className="mb-10">
        <BookForm dataHotels={hotels} />
      </CardContent>
    </Card>
  )
}

export default HomeBookCard
