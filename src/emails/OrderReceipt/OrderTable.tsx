import { Column, Row, Section, Text } from '@react-email/components'
import * as React from 'react'
import { Props as OrderProps } from './OrderReceipt'
import {
  informationTable,
  informationTableColumn,
  informationTableLabel,
  informationTableRow,
  informationTableValue,
} from './styles'
import { labels } from './const'
import { format } from 'date-fns'
import { enUS, es } from 'date-fns/locale'
import { getPrices } from '@/lib/utils'
import { Rate } from '@prisma/client'

type Props = {
  tripType: 'hotel' | 'airport' | 'round-trip'
  texts: (typeof labels)['es']
  rates: Rate[]
} & OrderProps

export const OrderTable = ({ order, texts, tripType, rates }: Props) => {
  const isPrivate = order.vehicle !== 'SHARED'
  const arrival = tripType !== 'airport' ? order.transfers[0] : undefined
  const departure =
    tripType === 'airport'
      ? order.transfers[0]
      : tripType === 'round-trip'
        ? order.transfers[1]
        : undefined
  const { vehiclePrice, itemsPrice, reservationPrice } = getPrices({
    rates,
    zone: order.hotel.zone,
    trip: order.trip,
    vehicle: order.vehicle,
    payingIndividuals: order.adults + order.children,
    items: order.items,
  })
  return (
    <Section style={informationTable}>
      <Row>
        <Column style={informationTableColumn} colSpan={2}>
          <Row>
            <Column>
              <Text style={informationTableLabel}>{texts.payment}</Text>
            </Column>
          </Row>
          <Row>
            <Column style={informationTableColumn}>
              <Text style={informationTableValue}>
                {texts.transportationServices}
              </Text>
            </Column>
            <Column
              style={{
                ...informationTableColumn,
                width: '65px',
                textAlign: 'right',
              }}
            >
              <Text style={informationTableValue}>{`${vehiclePrice} USD`}</Text>
            </Column>
          </Row>
          <Row>
            <Column style={informationTableColumn}>
              <Text style={informationTableValue}>{texts.additionals}</Text>
            </Column>
            <Column
              style={{
                ...informationTableColumn,
                width: '65px',
                textAlign: 'right',
              }}
            >
              <Text style={informationTableValue}>{`${itemsPrice} USD`}</Text>
            </Column>
          </Row>
          <Row>
            <Column style={informationTableColumn}>
              <Text style={informationTableValue}>Total</Text>
            </Column>
            <Column
              style={{
                ...informationTableColumn,
                width: '65px',
                textAlign: 'right',
              }}
            >
              <Text
                style={informationTableValue}
              >{`${vehiclePrice + itemsPrice} USD`}</Text>
            </Column>
          </Row>
          {order.owed > 0 && (
            <>
              <Row>
                <Column style={informationTableColumn}>
                  <Text style={informationTableValue}>{texts.reservation}</Text>
                </Column>
                <Column
                  style={{
                    ...informationTableColumn,
                    width: '65px',
                    textAlign: 'right',
                  }}
                >
                  <Text
                    style={informationTableValue}
                  >{`- ${reservationPrice} USD`}</Text>
                </Column>
              </Row>
              <Row>
                <Column style={informationTableColumn}>
                  <Text style={{ ...informationTableValue, color: 'red' }}>
                    {texts.amountDue}
                  </Text>
                </Column>
                <Column
                  style={{
                    ...informationTableColumn,
                    width: '65px',
                    textAlign: 'right',
                  }}
                >
                  <Text
                    style={{ ...informationTableValue, color: 'red' }}
                  >{`${vehiclePrice + itemsPrice - reservationPrice} USD`}</Text>
                </Column>
              </Row>
            </>
          )}
        </Column>
      </Row>
      <Row style={informationTableRow}>
        <Column colSpan={2}>
          <Row>
            <Column style={informationTableColumn}>
              <Text style={informationTableLabel}>{texts.client}</Text>
              <Text
                style={informationTableValue}
              >{`${order.name} ${order.surname}`}</Text>
              <Text style={informationTableValue}>{order.phone}</Text>
            </Column>
          </Row>

          <Row>
            <Column style={informationTableColumn}>
              <Text style={informationTableLabel}>Hotel</Text>
              <Text style={informationTableValue}>{order.hotel.name}</Text>
            </Column>
            <Column style={informationTableColumn}>
              <Text style={informationTableLabel}>{texts.tripType}</Text>
              <Text style={informationTableValue}>{texts[tripType]}</Text>
            </Column>
          </Row>
        </Column>
      </Row>
      <Row>
        {arrival && (
          <Column style={informationTableColumn}>
            <Text style={informationTableLabel}>{texts.arrivalFlight}</Text>
            <Text style={informationTableValue}>{arrival.flight}</Text>
            <Text style={informationTableValue}>
              {format(arrival.date, 'PPP p', {
                locale: order.isEnglish ? enUS : es,
              })}
            </Text>
          </Column>
        )}
        {departure && (
          <Column style={informationTableColumn}>
            <Text style={informationTableLabel}>{texts.departureFlight}</Text>
            <Text style={informationTableValue}>{departure.flight}</Text>
            <Text style={informationTableValue}>
              {format(departure.date, 'PPP p', {
                locale: order.isEnglish ? enUS : es,
              })}
            </Text>
          </Column>
        )}
      </Row>
      <Row>
        <Column style={informationTableColumn}>
          <Text style={informationTableLabel}>{texts.grownups}</Text>
          <Text style={informationTableValue}>{order.adults}</Text>
        </Column>
        <Column style={informationTableColumn}>
          <Text style={informationTableLabel}>{texts.children}</Text>
          <Text style={informationTableValue}>{order.children}</Text>
        </Column>
        <Column style={informationTableColumn}>
          <Text style={informationTableLabel}>{texts.infants}</Text>
          <Text style={informationTableValue}>{order.infants}</Text>
        </Column>
      </Row>
      <Row>
        <Column style={informationTableColumn}>
          {isPrivate && (
            <>
              <Text style={informationTableLabel}>{texts.vehicle}</Text>
              <Text style={informationTableValue}>
                {order.vehicle.charAt(0) +
                  order.vehicle.substring(1).toLowerCase()}
              </Text>
            </>
          )}
          <Text style={informationTableLabel}>{texts.vehicleType}</Text>
          <Text style={informationTableValue}>
            {isPrivate ? texts.private : texts.shared}
          </Text>
        </Column>
        {order.items.length > 0 && (
          <Column style={informationTableColumn}>
            <Text style={informationTableLabel}>{texts.additionals}</Text>
            {order.items.map(i => (
              <Text style={informationTableValue} key={i}>
                {/* @ts-ignore */}
                {texts[i]}
              </Text>
            ))}
          </Column>
        )}
      </Row>
    </Section>
  )
}
