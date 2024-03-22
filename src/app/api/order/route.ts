import { compareAsc, intervalToDuration } from 'date-fns'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import prisma from '@/db'
import { phoneRegexp, trips, vehicleBrands, vehicleTypes } from '@/lib/consts'

const [first, ...others] = vehicleBrands
const schema = z
  .object({
    name: z.string().trim().min(1),
    surname: z.string().trim().min(1),
    email: z.string().email(),
    phone: z.string().regex(phoneRegexp),
    hotel: z.string(),
    adults: z.coerce.number().int().min(1),
    children: z.coerce.number().int().min(0),
    infants: z.coerce.number().int().min(0),
    vehicle: z.enum([first, ...others]).optional(),
    items: z.array(z.string()),
    type: z.enum(trips),
    arrivalDate: z.coerce.date().optional(),
    arrivalFlight: z.string().trim().min(1).optional(),
    departureDate: z.coerce.date().optional(),
    departureFlight: z.string().trim().min(1).optional(),
    vehicleType: z.enum(vehicleTypes),
  })
  .refine(data => data.adults + data.children + data.infants < 50, {
    path: ['adults'],
  })
  .refine(
    data => {
      if (
        data.type === 'round-trip' &&
        data.arrivalDate &&
        data.departureDate
      ) {
        const compare = compareAsc(data.arrivalDate, data.departureDate)
        return compare === -1
      }
      return true
    },
    {
      path: ['departureDate'],
    }
  )
  .refine(
    data => {
      if (
        data.type === 'round-trip' &&
        data.arrivalDate &&
        data.departureDate
      ) {
        const interval = intervalToDuration({
          start: data.arrivalDate,
          end: data.departureDate,
        })
        return !interval.months || interval.months < 6
      }
      return true
    },
    {
      path: ['departureDate'],
    }
  )

export async function POST(request: Request) {
  try {
    const req = await request.json()
    const parsedResponse = schema.safeParse(req)

    if (!parsedResponse.success) {
      const { errors } = parsedResponse.error
      const error = errors.reduce(
        (p, c, i) =>
          `${p}- ${c.path} (${c.code}): ${c.message}${i === errors.length - 1 ? '' : '\n'}`,
        'Parse error:\n'
      )
      return new NextResponse(error, { status: 400 })
    }

    try {
      const order = await prisma.order.create({ data: req })
      return Response.json({ order })
    } catch (e) {
      return new NextResponse('Prisma error', { status: 400 })
    }
  } catch (e) {
    return new NextResponse('JSON error', { status: 400 })
  }
}
