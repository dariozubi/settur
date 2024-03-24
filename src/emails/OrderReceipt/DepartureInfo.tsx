import { Heading, Hr, Section, Text } from '@react-email/components'
import * as React from 'react'
import { hr, paragraph, secondary } from './styles'
import { labels } from './const'

type Props = {
  texts: (typeof labels)['es']
}

export const DepartureInfo = ({ texts }: Props) => (
  <>
    <Section>
      <Heading style={secondary}>{texts.departures}</Heading>
      <Text style={paragraph}>{texts.departureText}</Text>
      <Hr style={hr} />
      <Text style={paragraph}>{texts.departureInstructions}</Text>
    </Section>
    <Hr style={hr} />
  </>
)
