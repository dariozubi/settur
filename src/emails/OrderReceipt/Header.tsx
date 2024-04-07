import { Heading, Img, Section, Text } from '@react-email/components'
import * as React from 'react'
import { Props as OrderProps } from './OrderReceipt'
import { code, codeContainer, logo, secondary, tertiary } from './styles'
import { labels } from './const'

type Props = {
  texts: (typeof labels)['es']
} & Pick<OrderProps, 'order'>

export const Header = ({ order, texts }: Props) => (
  <>
    <Img
      src="https://settur.netlify.app/img/logo.png"
      width="210"
      height="40"
      alt="SETTUR"
      style={logo}
    />
    <Text style={tertiary}>{texts.subtitle}</Text>
    <Heading style={secondary}>
      {order.isReserve ? texts.reservationHeader : texts.orderHeader}
    </Heading>
    <Section style={codeContainer}>
      <Text style={code}>{`${texts.order} #${order.id}`}</Text>
    </Section>
    <Heading style={secondary}>{texts.orderDetails}</Heading>
  </>
)
