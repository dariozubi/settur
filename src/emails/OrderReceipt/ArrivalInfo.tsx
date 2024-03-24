import { Heading, Hr, Section, Text } from '@react-email/components'
import * as React from 'react'
import { Props as OrderProps } from './OrderReceipt'
import { hr, paragraph, secondary } from './styles'
import { labels } from './const'

type Props = {
  texts: (typeof labels)['es']
} & Pick<OrderProps, 'vehicle'>

export const ArrivalInfo = ({ vehicle, texts }: Props) => {
  const isPrivate = vehicle !== 'SHARED'
  return (
    <>
      <Section>
        <Heading style={secondary}>{texts.internationalArrival}</Heading>
        <Text style={paragraph}>
          {texts.internationalArrivalText(
            isPrivate ? texts.yourName : texts.settur
          )}
        </Text>
        <Hr style={hr} />
        <Heading style={secondary}>{texts.nationalArrival}</Heading>
        <Text style={paragraph}>
          {texts.nationalArrivalText(isPrivate ? texts.yourName : texts.settur)}
        </Text>
        <Hr style={hr} />
        <Text style={paragraph}>{texts.tolerance}</Text>
        <Hr style={hr} />
        <Text style={paragraph}>{texts.weWaiting}</Text>
      </Section>
      <Hr style={hr} />
    </>
  )
}
