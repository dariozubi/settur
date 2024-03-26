import { Hotel } from '@prisma/client'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function showHotel(zone: Hotel['zone']) {
  if (!zone) return false
  return (
    zone === 'ZONE1' || zone === 'ZONE2' || zone === 'ZONE3' || zone === 'ZONE4'
  )
}
