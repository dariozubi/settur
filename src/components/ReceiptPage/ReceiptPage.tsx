'use client'

import { Link, useRouter } from '@/navigation'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Card, { CardContent, CardFooter, CardHeader, CardTitle } from '../Card'
import { useTranslations } from 'next-intl'
import Skeleton from '../Skeleton'
import Button from '../Button'

function ReceiptPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState(null)
  const [orderId, setOrderId] = useState(null)
  const t = useTranslations('receipt')

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    if (searchParams && !sessionId) {
      router.push('/checkout')
    }

    fetch(`/api/checkout-session?session_id=${sessionId}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'open') {
          router.push('/checkout')
        }
        setStatus(data.status)
        setOrderId(data.orderId)
      })
  }, [router, searchParams])

  return (
    <section
      id="success"
      className="-mt-[108px] flex min-h-screen w-full items-center justify-center p-10"
    >
      <Card className="max-w-[300px]">
        {status === 'complete' ? (
          <>
            <CardHeader>
              <CardTitle className="text-center">{t('header')}</CardTitle>
            </CardHeader>
            <CardContent>
              {`${t('text', { orderId })} `}
              <Link href="tel:+525531455826" className="underline">
                +52 (55)31455826
              </Link>
              {` ${t('or-email')} `}
              <Link
                href="mailto:reservations@settur.com.mx"
                className="underline"
              >
                reservations@settur.com.mx
              </Link>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild>
                <Link href="/">{t('return-home')}</Link>
              </Button>
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader className="flex items-center">
              <Skeleton className="h-6 w-[200px]" />
              <Skeleton className="h-6 w-[200px]" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[250px]" />
            </CardContent>
          </>
        )}
      </Card>
    </section>
  )
}

export default ReceiptPage
