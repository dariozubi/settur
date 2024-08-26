import { Column, Img, Link, Row, Section, Text } from '@react-email/components'
import * as React from 'react'
import { footer, link, logo } from './styles'
import { labels } from './const'
import { contactMail, contactPhone } from '@/lib/consts'

type Props = {
  texts: (typeof labels)['es']
}

export const Footer = ({ texts }: Props) => (
  <Section>
    <Row>
      <Column>
        <Text style={footer}>
          {texts.changes}{' '}
          <Link href={`tel:${contactPhone}`} style={link}>
            {contactPhone}
          </Link>{' '}
          {texts.orMail}{' '}
          <Link href={`mailto:${contactMail}`} style={link}>
            contactMail
          </Link>
          {'. '}
          {texts.timeOpen}
          {'. '}
          {texts.footer}
        </Text>
      </Column>
    </Row>
    <Row style={{ marginTop: '40px' }}>
      <Column align="center">
        <Img
          src="https://settur.netlify.app/img/logo.png"
          width="105"
          height="20"
          alt="STTUR"
          style={logo}
        />
        <Text style={footer}>Copyright © 2024 SETTUR</Text>
      </Column>
    </Row>
  </Section>
)
