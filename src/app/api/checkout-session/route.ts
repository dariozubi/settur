import { NextRequest, NextResponse } from 'next/server'

import stripe from '@/payment'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const sessionId = searchParams.get('session_id')
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    return Response.json({
      status: session.status,
      orderId: session.metadata.order_id,
    })
  } catch (e) {
    return new NextResponse('Stripe error', { status: 400 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const req = await request.json()
    const { order } = req
    try {
      if (!order) return new NextResponse(`Order not found`, { status: 400 })
      try {
        const session = await stripe.checkout.sessions.create({
          ui_mode: 'embedded',
          line_items: order.priceIds.map((p: string) => ({
            price: p,
            quantity: 1,
          })),
          mode: 'payment',
          metadata: {
            order_id: order.id,
          },
          return_url: `${process.env.NEXTAUTH_URL}/return?session_id={CHECKOUT_SESSION_ID}`,
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
