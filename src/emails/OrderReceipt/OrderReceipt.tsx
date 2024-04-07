import { Body, Container, Head, Hr, Html } from '@react-email/components'
import * as React from 'react'

import { $Enums, Order, Rate } from '@prisma/client'
import { labels } from './const'
import { ArrivalInfo } from './ArrivalInfo'
import { OrderTable } from './OrderTable'
import { Header } from './Header'
import { container, hr, main } from './styles'
import { DepartureInfo } from './DepartureInfo'
import { Footer } from './Footer'

export type Props = {
  order: Order & {
    hotel: {
      id: number
      name: string
      zone: $Enums.Zone
    }
    transfers: {
      id: number
      flight: string
      date: Date
      direction: $Enums.Direction
      orderId: number
    }[]
  }
  rates: Rate[]
}

const OrderReceipt = ({ order, rates }: Props) => {
  const texts = labels[order.isEnglish ? 'en' : 'es']
  const tripType =
    order.trip === 'ROUND'
      ? 'round-trip'
      : order.transfers[0].direction === 'AIRPORT'
        ? 'airport'
        : 'hotel'

  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Header order={order} texts={texts} />

          <OrderTable
            texts={texts}
            order={order}
            tripType={tripType}
            rates={rates}
          />

          <Hr style={hr} />

          {tripType !== 'airport' && (
            <ArrivalInfo texts={texts} isPrivate={order.vehicle !== 'SHARED'} />
          )}

          {tripType !== 'hotel' && <DepartureInfo texts={texts} />}

          <Footer texts={texts} />
        </Container>
      </Body>
    </Html>
  )
}

export default OrderReceipt
