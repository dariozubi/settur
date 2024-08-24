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

    const flag = await prisma.flag.findUnique({ where: { id: 'IS_ACTIVE' } })
    if (!flag?.value) {
      return new NextResponse('Site is not active', { status: 400 })
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
      const rates = await prisma.rate.findMany()
      const hotelValues = await prisma.hotel.findUnique({
        select: { zone: true },
        where: {
          id: hotel,
        },
      })

      if (!hotelValues) throw Error('Hotel no encontrado')

      // Prices and amount owed
      let products = []
      let totalPrice = 0
      let reservationPrice = 0
      const prodId =
        process.env.DEPLOY_CONTEXT === 'production'
          ? 'productId'
          : 'testProductId'

      if (isReserve) {
        const isShared = vehicle === 'SHARED'
        const reservationRate = isShared
          ? rates.find(
              r => r.additionalId === 'RESERVATION' && vehicle === 'SHARED'
            )
          : rates.find(
              r =>
                r.additionalId === 'RESERVATION' &&
                r.vehicle === vehicle &&
                r.zone === hotelValues.zone
            )

        if (!reservationRate) throw Error('Precio de reserva no encontrado')

        reservationPrice = isShared
          ? reservationRate.value * (adults + children)
          : reservationRate.value
        products.push(
          `${reservationRate[prodId]},${isShared ? adults + children : '1'}`
        )
      }

      const payingIndividuals = vehicle === 'SHARED' ? adults + children : 1

      if (type === 'round-trip') {
        const vehicleRate = rates.find(
          r =>
            r.zone === hotelValues.zone &&
            r.trip === 'ROUND' &&
            r.vehicle === vehicle
        )

        if (!vehicleRate) throw Error('Precio de vehículo no encontrado')

        totalPrice += vehicleRate.value * payingIndividuals
        if (!isReserve)
          products.push(`${vehicleRate?.[prodId]},${payingIndividuals}`)
      } else {
        const vehicleRate = rates.find(
          r =>
            r.zone === hotelValues?.zone &&
            r.trip === 'ONEWAY' &&
            r.vehicle === vehicle
        )
        if (!vehicleRate) throw Error('Precio de vehículo no encontrado')

        totalPrice += vehicleRate.value * payingIndividuals
        if (!isReserve)
          products.push(`${vehicleRate[prodId]},${payingIndividuals}`)
      }

      if (allItems.length > 0) {
        for (const item of allItems) {
          if (item !== 'WHEELCHAIR') {
            const itemRate = rates.find(r => r.additionalId === item)
            if (!itemRate) throw Error('Precio de adicional no encontrado')

            totalPrice += itemRate.value || 0
            if (!isReserve) products.push(`${itemRate[prodId]},1`)
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
        products,
        owed: isReserve ? totalPrice - reservationPrice : 0,
        vehicle: vehicle as Vehicle,
        isEnglish,
        trip,
        hotelId: hotel,
      }

      const order = await prisma.order.create({ data, select: { id: true } })
      return NextResponse.json({ orderId: order.id })
    } catch (e) {
      console.error(e)
      return new NextResponse(`Error creating order`, { status: 400 })
    }
  } catch (e) {
    return new NextResponse('JSON error', { status: 400 })
  }
}
