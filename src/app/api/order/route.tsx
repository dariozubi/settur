import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/db'
import { schema } from './consts'
import { Direction, Trip, Vehicle } from '@prisma/client'

export async function POST(request: NextRequest) {
  try {
    const req = await request.json()
    const { privateItems, isEnglish, ...data } = req
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
    } = parsedResponse.data

    try {
      const allItems =
        privateItems !== 'NOTHING' ? [...items, privateItems] : items

      const hotelValues = await prisma.hotel.findUnique({
        select: { zone: true },
        where: {
          id: hotel,
        },
      })

      let rates = []
      let transfers, trip
      const payingIndividuals = vehicle === 'SHARED' ? adults + children : 1
      if (type === 'round-trip') {
        const vehicleRate = await prisma.rate.findFirst({
          select: { priceId: true },
          where: {
            trip: 'ROUND',
            vehicle: vehicle as Vehicle,
            zone: hotelValues?.zone,
          },
        })
        rates.push(`${vehicleRate?.priceId},${payingIndividuals}`)
        transfers = {
          create: [
            {
              flight: arrivalFlight?.toUpperCase() || '',
              date: arrivalDate || '',
              direction: 'HOTEL' as Direction,
            },
            {
              flight: departureFlight?.toUpperCase() || '',
              date: departureDate || '',
              direction: 'AIRPORT' as Direction,
            },
          ],
        }
        trip = 'ROUND' as Trip
      } else {
        const vehicleRate = await prisma.rate.findFirst({
          select: { priceId: true },
          where: {
            trip: 'ONEWAY',
            vehicle: vehicle as Vehicle,
            zone: hotelValues?.zone,
          },
        })
        rates.push(`${vehicleRate?.priceId},${payingIndividuals}`)
        trip = 'ONEWAY' as Trip
        if (type === 'airport') {
          transfers = {
            create: {
              flight: departureFlight?.toUpperCase() || '',
              date: departureDate || '',
              direction: 'AIRPORT' as Direction,
            },
          }
        } else {
          transfers = {
            create: {
              flight: arrivalFlight?.toUpperCase() || '',
              date: arrivalDate || '',
              direction: 'HOTEL' as Direction,
            },
          }
        }
      }
      if (allItems.length > 0) {
        for (const item of allItems) {
          if (item !== 'WHEELCHAIR') {
            const itemRate = await prisma.rate.findFirst({
              select: { priceId: true },
              where: {
                additionalId: item,
              },
            })
            rates.push(`${itemRate?.priceId},1`)
          }
        }
      }

      const data = {
        adults,
        children,
        infants,
        items: allItems,
        email,
        name,
        surname,
        phone,
        transfers,
        rates,
        vehicle: vehicle as Vehicle,
        isEnglish,
        trip,
        hotelId: hotel,
      }

      const order = await prisma.order.create({ data, select: { id: true } })
      return NextResponse.json({ orderId: order.id })
    } catch (e) {
      console.error(e)
      return new NextResponse(`Prisma error`, { status: 400 })
    }
  } catch (e) {
    return new NextResponse('JSON error', { status: 400 })
  }
}
