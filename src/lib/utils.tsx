import { Hotel } from '@prisma/client'
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
