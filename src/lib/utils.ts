import { Additional, Hotel, Rate, Trip, Vehicle } from '@prisma/client'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Stripe, loadStripe } from '@stripe/stripe-js'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function showHotel(zone: Hotel['zone']) {
  if (!zone) return false
  return (
    zone === 'ZONE1' || zone === 'ZONE2' || zone === 'ZONE3' || zone === 'ZONE4'
  )
}

let stripePromise: Promise<Stripe | null>
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!)
  }
  return stripePromise
}

type Props = {
  rates: Rate[]
  zone?: Hotel['zone']
  trip: Trip
  vehicle: Vehicle
  payingIndividuals: number
  items: Additional[]
}
export function getPrices({
  rates,
  zone,
  trip,
  vehicle,
  payingIndividuals,
  items,
}: Props) {
  const vehiclePrice =
    Number(
      rates.find(
        r => r.zone === zone && r.trip === trip && r.vehicle === vehicle
      )?.value
    ) * (vehicle === 'SHARED' ? payingIndividuals : 1)
  const reservationPrice =
    payingIndividuals *
    Number(rates.find(r => r.additionalId === 'RESERVATION')?.value)
  const itemsPrice =
    items.length > 0
      ? items.reduce((prev: number, curr: Additional) => {
          const value =
            curr !== 'WHEELCHAIR'
              ? Number(rates.find(r => r.additionalId === curr)?.value)
              : 0
          return prev + value
        }, 0)
      : 0
  return { vehiclePrice, itemsPrice, reservationPrice }
}
