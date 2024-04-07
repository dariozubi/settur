'use client'

import { useRouter } from '@/navigation'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Card, { CardContent, CardHeader, CardTitle } from '../Card'

function ReceiptPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState(null)
  const [orderId, setOrderId] = useState(null)

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

  if (status === 'complete') {
    return (
      <section id="success" className="flex w-full justify-center p-10">
        <Card className="max-w-[300px]">
          <CardHeader>
            <CardTitle className="text-center">
              Order #{orderId} confirmed
            </CardTitle>
          </CardHeader>
          <CardContent>
            Thank you for traveling with us. You&apos;ll soon receive an email
            with your order confirmation. We still have it stored in our system
            with the number {orderId}.
            <br />
            <br />
            Please contact us if you have any questions.
          </CardContent>
        </Card>
      </section>
    )
  }

  return null
}

export default ReceiptPage
