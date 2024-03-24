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

type Props = {
  texts: (typeof labels)['es']
} & OrderProps

export const OrderTable = ({
  order,
  texts,
  hotelLabel,
  tripType,
  transportationServicePrice,
  additionalsPrice,
  arrivalDate,
  arrivalFlight,
  departureDate,
  departureFlight,
  vehicle,
}: Props) => {
  const isPrivate = vehicle !== 'SHARED'
  return (
    <Section style={informationTable}>
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
              <Text style={informationTableValue}>{hotelLabel}</Text>
            </Column>
          </Row>
          <Row>
            <Column style={informationTableColumn}>
              <Text style={informationTableLabel}>{texts.tripType}</Text>
              <Text style={informationTableValue}>{texts[tripType]}</Text>
            </Column>
          </Row>
        </Column>
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
              <Text
                style={informationTableValue}
              >{`${transportationServicePrice} USD`}</Text>
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
              <Text
                style={informationTableValue}
              >{`${additionalsPrice} USD`}</Text>
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
              >{`${transportationServicePrice + additionalsPrice} USD`}</Text>
            </Column>
          </Row>
        </Column>
      </Row>
      <Row>
        {tripType !== 'airport' && (
          <Column style={informationTableColumn}>
            <Text style={informationTableLabel}>{texts.arrivalFlight}</Text>
            <Text style={informationTableValue}>{arrivalFlight}</Text>
            <Text style={informationTableValue}>{arrivalDate}</Text>
          </Column>
        )}
        {tripType !== 'hotel' && (
          <Column style={informationTableColumn}>
            <Text style={informationTableLabel}>{texts.departureFlight}</Text>
            <Text style={informationTableValue}>{departureFlight}</Text>
            <Text style={informationTableValue}>{departureDate}</Text>
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
            <Row>
              <Column style={informationTableColumn}>
                <Text style={informationTableLabel}>{texts.vehicle}</Text>
                <Text style={informationTableValue}>
                  {vehicle.charAt(0) + vehicle.substring(1).toLowerCase()}
                </Text>
              </Column>
            </Row>
          )}
          <Row>
            <Column style={informationTableColumn}>
              <Text style={informationTableLabel}>{texts.vehicleType}</Text>
              <Text style={informationTableValue}>
                {isPrivate ? texts.private : texts.shared}
              </Text>
            </Column>
          </Row>
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
