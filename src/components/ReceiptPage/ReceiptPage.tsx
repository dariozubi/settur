'use client'

import { Link } from '@/navigation'
import Card, { CardContent, CardFooter, CardHeader, CardTitle } from '../Card'
import { useTranslations } from 'next-intl'
import Button from '../Button'
import MainLayout from '../MainLayout'
import { contactMail, contactPhone } from '@/lib/consts'
import { Hotel, Order, Transfer } from '@prisma/client'
import OrderSummary from '../OrderSummary'
import { add } from 'date-fns'

type Props = {
  order: Order & { hotel: Hotel } & { transfers: Transfer[] }
}

function ReceiptPage({ order }: Props) {
  const t = useTranslations('receipt')

  const type =
    order.trip === 'ROUND'
      ? 'round-trip'
      : order.transfers[0].direction.toLowerCase()
  const arrival =
    type === 'round-trip' || type === 'hotel'
      ? {
          date: add(order.transfers[0].date, { hours: 6 }),
          flight: order.transfers[0].flight,
        }
      : undefined
  const departure =
    type === 'round-trip'
      ? {
          date: add(order.transfers[1].date, { hours: 6 }),
          flight: order.transfers[1].flight,
        }
      : type === 'airport'
        ? {
            date: add(order.transfers[0].date, { hours: 6 }),
            flight: order.transfers[0].flight,
          }
        : undefined

  return (
    <MainLayout>
      <section
        id="success"
        className="flex min-h-screen w-full items-center justify-center"
      >
        <Card className="max-w-[400px]">
          <CardHeader>
            <CardTitle className="text-center">{t('header')}</CardTitle>
          </CardHeader>
          <CardContent>
            {`${t('order', { orderId: order.id })} `}
            <div className="my-4">
              <OrderSummary
                name={order.name}
                surname={order.surname}
                email={order.email}
                phone={order.phone}
                type={type}
                hotel={order.hotel.name}
                adults={order.adults}
                childs={order.children}
                infants={order.infants}
                vehicle={
                  order.vehicle !== 'SHARED' ? order.vehicle : 'SPRINTER'
                }
                arrivalDate={arrival?.date}
                arrivalFlight={arrival?.flight}
                departureDate={departure?.date}
                departureFlight={departure?.flight}
                items={order.items}
                isEnglish={order.isEnglish}
              />
            </div>
            {`${t('text')} `}
            <Link href={`tel:${contactPhone}`} className="underline">
              {contactPhone}
            </Link>
            {` ${t('or-email')} `}
            <Link href={`mailto:${contactMail}`} className="underline">
              {contactMail}
            </Link>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link href="/">{t('return-home')}</Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </MainLayout>
  )
}

export default ReceiptPage
