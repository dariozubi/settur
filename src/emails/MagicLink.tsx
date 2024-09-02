import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

type Props = {
  url: string
}

const MagicLink = ({ url }: Props) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${process.env.NEXTAUTH_URL}img/logo.png`}
          width="210"
          height="40"
          alt="SETTUR"
          style={logo}
        />
        <Text style={tertiary}>Bienvenido administrador</Text>
        <Heading style={secondary}>
          Utiliza el siguiente link para ir a la zona de administración
        </Heading>
        <Section style={codeContainer}>
          <Text style={code}>
            {' '}
            <Link href={url} style={link}>
              Ingresar
            </Link>
          </Text>
        </Section>
        <Text style={paragraph}>No compartas este link.</Text>
        <Text style={paragraph}>
          Contacta a{' '}
          <Link href="mailto:login@plaid.com" style={link}>
            dariozubi@gmail.com
          </Link>{' '}
          si no solicitaste este código.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default MagicLink

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #eee',
  borderRadius: '5px',
  boxShadow: '0 5px 10px rgba(20,50,70,.2)',
  marginTop: '20px',
  margin: '0 auto',
  padding: '70px 40px',
}

const logo = {
  margin: '0 auto',
}

const tertiary = {
  color: '#0a85ea',
  fontSize: '11px',
  fontWeight: 700,
  fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
  height: '16px',
  letterSpacing: '0',
  lineHeight: '16px',
  margin: '16px 8px 8px 8px',
  textTransform: 'uppercase' as const,
  textAlign: 'center' as const,
}

const secondary = {
  color: '#000',
  display: 'inline-block',
  fontFamily: 'HelveticaNeue-Medium,Helvetica,Arial,sans-serif',
  fontSize: '20px',
  fontWeight: 500,
  lineHeight: '24px',
  width: '100%',
  textAlign: 'center' as const,
}

const codeContainer = {
  background: 'rgba(0,0,0,.05)',
  borderRadius: '4px',
  margin: '40px auto',
  verticalAlign: 'middle',
  width: '280px',
}

const code = {
  color: '#000',
  display: 'inline-block',
  fontFamily: 'HelveticaNeue-Bold',
  fontSize: '32px',
  fontWeight: 700,
  lineHeight: '40px',
  paddingBottom: '8px',
  paddingTop: '8px',
  margin: '0 auto',
  width: '100%',
  textAlign: 'center' as const,
}

const paragraph = {
  color: '#444',
  fontSize: '15px',
  fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
  letterSpacing: '0',
  lineHeight: '23px',
  padding: '0 40px',
  margin: '0',
  textAlign: 'center' as const,
}

const link = {
  color: '#444',
  textDecoration: 'underline',
}
