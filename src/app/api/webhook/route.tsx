import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import stripe from '@/payment'
import prisma from '@/db'
import { renderAsync } from '@react-email/render'

import resend from '@/email'
import OrderReceipt from '@/emails/OrderReceipt'

const secret = process.env.STRIPE_WEBHOOK_SECRET || ''

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = headers().get('stripe-signature')

    const event = stripe.webhooks.constructEvent(body, signature, secret)

    if (event.type === 'checkout.session.completed') {
      const session = await stripe.checkout.sessions.retrieve(
        event.data.object.id
      )
      if (session.metadata.order_id) {
        const isReserve = session.metadata.is_reserve === 'true'
        const rates = await prisma.rate.findMany()
        const order = await prisma.order.update({
          where: {
            id: Number(session.metadata.order_id),
          },
          data: {
            status: isReserve ? 'RESERVED' : 'PAID',
          },
          include: {
            hotel: true,
            transfers: true,
          },
        })
        const subject = order.isEnglish
          ? `${isReserve ? 'Reservation' : 'Order'} #${order.id} confirmed`
          : `${isReserve ? 'Reservación' : 'Orden'} #${order.id} confirmada`

        const emailHTML = await renderAsync(
          <OrderReceipt order={order} rates={rates} />
        )
        await resend.emails.send({
          from: 'SETTUR<info@settur.com.mx>',
          to: [order.email],
          subject,
          html: emailHTML,
        })
      }
    }

    return NextResponse.json({ result: event, ok: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: 'something went wrong',
        ok: false,
      },
      { status: 500 }
    )
  }
}
