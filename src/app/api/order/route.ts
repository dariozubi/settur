import { phoneRegexp, trips, vehicleBrands, vehicleTypes } from '@/lib/consts'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const prisma = new PrismaClient()
const [first, ...others] = vehicleBrands
const schema = z.object({
  name: z.string(),
  surname: z.string(),
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
  arrivalFlight: z.string().optional(),
  departureDate: z.coerce.date().optional(),
  departureFlight: z.string().optional(),
  vehicleType: z.enum(vehicleTypes),
})

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
