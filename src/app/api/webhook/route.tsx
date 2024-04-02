import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import stripe from '@/payment'
import prisma from '@/db'
import { renderAsync } from '@react-email/render'
import { format } from 'date-fns'
import { enUS, es } from 'date-fns/locale'

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
        const order = await prisma.order.update({
          where: {
            id: Number(session.metadata.order_id),
          },
          data: {
            status: 'PAID',
          },
          include: {
            hotel: true,
            transfers: true,
          },
        })
        const subject = order.isEnglish
          ? `Order #${order.id} confirmed`
          : `Orden #${order.id} confirmada`
        const type =
          order.trip === 'ROUND'
            ? 'round-trip'
            : order.transfers[0].direction === 'AIRPORT'
              ? 'airport'
              : 'hotel'
        const arrivalFlight =
          type === 'hotel' ? order.transfers[0].flight : undefined
        const arrivalDate =
          type === 'hotel' ? order.transfers[0].date : undefined
        const departureFlight =
          type === 'airport' ? order.transfers[0].flight : undefined
        const departureDate =
          type === 'airport' ? order.transfers[0].date : undefined

        const emailHTML = await renderAsync(
          <OrderReceipt
            order={order}
            hotelLabel={order.hotel.name}
            isEnglish={order.isEnglish}
            tripType={type}
            transportationServicePrice={200}
            additionalsPrice={50}
            arrivalFlight={arrivalFlight}
            arrivalDate={
              arrivalDate
                ? format(arrivalDate, 'PPP p', {
                    locale: order.isEnglish ? enUS : es,
                  })
                : undefined
            }
            departureFlight={departureFlight}
            departureDate={
              departureDate
                ? format(departureDate, 'PPP p', {
                    locale: order.isEnglish ? enUS : es,
                  })
                : undefined
            }
            vehicle={order.vehicle}
          />
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
