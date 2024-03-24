import { Body, Container, Head, Hr, Html } from '@react-email/components'
import * as React from 'react'

import { trips } from '@/lib/consts'
import { Order } from '@prisma/client'
import { labels } from './const'
import { ArrivalInfo } from './ArrivalInfo'
import { OrderTable } from './OrderTable'
import { Header } from './Header'
import { container, hr, main } from './styles'
import { DepartureInfo } from './DepartureInfo'
import { Footer } from './Footer'

export type Props = {
  order: Order
  hotelLabel: string
  isEnglish: boolean
  tripType: (typeof trips)[number]
  transportationServicePrice: number
  additionalsPrice: number
  arrivalFlight?: string
  arrivalDate?: string
  departureFlight?: string
  departureDate?: string
  vehicle: string
}

const OrderReceipt = ({
  order,
  isEnglish,
  hotelLabel,
  tripType,
  transportationServicePrice,
  additionalsPrice,
  arrivalFlight,
  arrivalDate,
  departureFlight,
  departureDate,
  vehicle,
}: Props) => {
  const texts = labels[isEnglish ? 'en' : 'es']
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Header order={order} texts={texts} />

          <OrderTable
            texts={texts}
            order={order}
            isEnglish={isEnglish}
            hotelLabel={hotelLabel}
            tripType={tripType}
            transportationServicePrice={transportationServicePrice}
            additionalsPrice={additionalsPrice}
            arrivalFlight={arrivalFlight}
            arrivalDate={arrivalDate}
            departureFlight={departureFlight}
            departureDate={departureDate}
            vehicle={vehicle}
          />

          <Hr style={hr} />

          {tripType !== 'airport' && (
            <ArrivalInfo texts={texts} vehicle={vehicle} />
          )}

          {tripType !== 'hotel' && <DepartureInfo texts={texts} />}

          <Footer texts={texts} />
        </Container>
      </Body>
    </Html>
  )
}

export default OrderReceipt
