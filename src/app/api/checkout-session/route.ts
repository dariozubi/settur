import { NextRequest, NextResponse } from 'next/server'

import stripe from '@/payment'

export async function POST(request: NextRequest) {
  try {
    const req = await request.json()
    const { order } = req
    try {
      if (!order) return new NextResponse(`Order not found`, { status: 400 })
      try {
        const session = await stripe.checkout.sessions.create({
          ui_mode: 'embedded',
          line_items: order.prices.map((p: string) => {
            const [price, quantity] = p.split(',')
            return {
              price,
              quantity,
            }
          }),
          mode: 'payment',
          metadata: {
            order_id: order.id,
            is_reserve: order.owed > 0,
          },
          return_url: `${process.env.NEXTAUTH_URL}return?session_id={CHECKOUT_SESSION_ID}`,
        })

        return Response.json({ clientSecret: session.client_secret })
      } catch (e) {
        return new NextResponse(`Stripe error: ${e}`, { status: 400 })
      }
    } catch (e) {
      return new NextResponse(`Prisma error ${e}`, { status: 400 })
    }
  } catch (e) {
    return new NextResponse(`JSON error: ${e}`, { status: 400 })
  }
}
