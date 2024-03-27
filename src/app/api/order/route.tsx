import { NextResponse } from 'next/server'

import prisma from '@/db'
import resend from '@/email'
import { renderAsync } from '@react-email/render'
import OrderReceipt from '@/emails/OrderReceipt'
import { schema } from './consts'
import { format } from 'date-fns'
import { enUS, es } from 'date-fns/locale'

export async function POST(request: Request) {
  try {
    const req = await request.json()
    const { isEnglish, privateItems, ...data } = req
    const parsedResponse = schema.safeParse(data)

    if (!parsedResponse.success) {
      const { errors } = parsedResponse.error
      const error = errors.reduce(
        (p, c, i) =>
          `${p}- ${c.path} (${c.code}): ${c.message}${i === errors.length - 1 ? '' : '\n'}`,
        'Parse error:\n'
      )
      return new NextResponse(error, { status: 400 })
    }

    const {
      name,
      surname,
      email,
      phone,
      hotel,
      adults,
      children,
      infants,
      vehicle,
      items,
      type,
      arrivalDate,
      arrivalFlight,
      departureDate,
      departureFlight,
    } = data

    try {
      const transfers =
        type === 'round-trip'
          ? {
              create: [
                { flight: arrivalFlight, date: arrivalDate, vehicle },
                { flight: departureFlight, date: departureDate, vehicle },
              ],
            }
          : type === 'airport'
            ? {
                create: {
                  flight: departureFlight,
                  date: departureDate,
                  vehicle,
                },
              }
            : { create: { flight: arrivalFlight, date: arrivalDate, vehicle } }
      const data = {
        adults,
        children,
        infants,
        items: privateItems !== 'nothing' ? [...items, privateItems] : items,
        email,
        name,
        surname,
        phone,
        hotelId: hotel,
        transfers,
      }
      const order = await prisma.order.create({
        data,
        include: {
          hotel: true,
        },
      })
      const subject = isEnglish
        ? `Order #${order.id} confirmed`
        : `Orden #${order.id} confirmada`
      const emailHTML = await renderAsync(
        <OrderReceipt
          order={{ ...req, id: order.id }}
          hotelLabel={order.hotel.name}
          isEnglish={isEnglish}
          tripType={type}
          transportationServicePrice={200}
          additionalsPrice={50}
          arrivalFlight={arrivalFlight}
          arrivalDate={
            arrivalDate
              ? format(arrivalDate, 'PPP p', {
                  locale: isEnglish ? enUS : es,
                })
              : undefined
          }
          departureFlight={departureFlight}
          departureDate={
            departureDate
              ? format(departureDate, 'PPP p', {
                  locale: isEnglish ? enUS : es,
                })
              : undefined
          }
          vehicle={vehicle}
        />
      )
      const emailData = await resend.emails.send({
        from: 'SETTUR<info@settur.com.mx>',
        to: [data.email],
        subject,
        html: emailHTML,
      })

      return Response.json({
        order,
        email: emailData,
      })
    } catch (e) {
      return new NextResponse(`Prisma error: ${e}`, { status: 400 })
    }
  } catch (e) {
    return new NextResponse('JSON error', { status: 400 })
  }
}
