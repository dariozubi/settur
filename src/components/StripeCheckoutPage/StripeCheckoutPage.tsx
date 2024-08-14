'use client'

import { useCallback } from 'react'
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js'
import axios from 'axios'
import { getStripe } from '@/lib/utils'
import { Order } from '@prisma/client'

type Props = {
  order: Pick<Order, 'prices' | 'owed' | 'id'> | null
}

function StripeCheckoutPage({ order }: Props) {
  const fetchClientSecret = useCallback<() => Promise<string>>(async () => {
    const r = await axios.post<{ clientSecret: string }>(
      '/api/checkout-session',
      { order }
    )
    return r.data.clientSecret
  }, [order])

  const options = { fetchClientSecret }

  if (!order) return null
  return (
    <div id="checkout" className="min-h-[820px] py-4">
      <EmbeddedCheckoutProvider stripe={getStripe()} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

export default StripeCheckoutPage
