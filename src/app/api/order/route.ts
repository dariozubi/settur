import { NextRequest, NextResponse } from 'next/server'

import prisma from '@/db'
import { schema } from './consts'
import { Direction, Trip, Vehicle } from '@prisma/client'

export async function POST(request: NextRequest) {
  try {
    const req = await request.json()
    const { privateItems, isEnglish, isReserve, ...data } = req
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

      // Price ids for rates
      const rates = await prisma.rate.findMany()
      let priceIds = []
      if (isReserve) {
        const reservationRate = rates.find(
          r => r.additionalId === 'RESERVATION'
        )
        priceIds.push(`${reservationRate?.priceId},${adults + children}`)
      } else {
        const payingIndividuals = vehicle === 'SHARED' ? adults + children : 1
        const hotelValues = await prisma.hotel.findUnique({
          select: { zone: true },
          where: {
            id: hotel,
          },
        })
        if (type === 'round-trip') {
          const vehicleRate = rates.find(
            r =>
              r.zone === hotelValues?.zone &&
              r.trip === 'ROUND' &&
              r.vehicle === vehicle
          )
          priceIds.push(`${vehicleRate?.priceId},${payingIndividuals}`)
        } else {
          const vehicleRate = rates.find(
            r =>
              r.zone === hotelValues?.zone &&
              r.trip === 'ONEWAY' &&
              r.vehicle === vehicle
          )
          priceIds.push(`${vehicleRate?.priceId},${payingIndividuals}`)
        }
        if (allItems.length > 0) {
          for (const item of allItems) {
            if (item !== 'WHEELCHAIR') {
              const itemRate = rates.find(r => r.additionalId === item)
              priceIds.push(`${itemRate?.priceId},1`)
            }
          }
        }
      }

      // Transfers and trip
      let transfers, trip
      if (type === 'round-trip') {
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
        rates: priceIds,
        vehicle: vehicle as Vehicle,
        isEnglish,
        trip,
        hotelId: hotel,
        isReserve,
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
