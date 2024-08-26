'use client'

import { Link } from '@/navigation'
import Card, { CardContent, CardFooter, CardHeader, CardTitle } from '../Card'
import { useTranslations } from 'next-intl'
import Button from '../Button'
import MainLayout from '../MainLayout'
import ErrorPage from '../ErrorPage'
import { contactMail, contactPhone } from '@/lib/consts'

type Props = {
  status: string
  orderId: string
}

function ReceiptPage({ status, orderId }: Props) {
  const t = useTranslations('receipt')

  if (status !== 'complete') return <ErrorPage error="receipt" />

  return (
    <MainLayout>
      <section
        id="success"
        className="-mt-[108px] flex min-h-screen w-full items-center justify-center p-10"
      >
        <Card className="max-w-[300px]">
          <CardHeader>
            <CardTitle className="text-center">{t('header')}</CardTitle>
          </CardHeader>
          <CardContent>
            {`${t('text', { orderId })} `}
            <Link href={`tel:${contactPhone}`} className="underline">
              {contactPhone}
            </Link>
            {` ${t('or-email')} `}
            <Link href={`mailto:${contactMail}`} className="underline">
              contactMail
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
