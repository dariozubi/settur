import { Vehicle } from '@prisma/client'

export const vehicles: Record<
  Omit<Vehicle, 'COACH' | 'SHARED'>[number],
  { seats: number; imgAspect: string }
> = {
  ESCALADE: {
    seats: 5,
    imgAspect: 'aspect-[1775/1057]',
  },
  SUBURBAN: {
    seats: 6,
    imgAspect: 'aspect-[587/264]',
  },
  HIACE: {
    seats: 10,
    imgAspect: 'aspect-[404/220]',
  },
  SPRINTER: {
    seats: 17,
    imgAspect: 'aspect-[700/480]',
  },
}

export const vehicleBrands = Object.keys(vehicles)
export const trips = ['round-trip', 'airport', 'hotel'] as const
export const phoneRegexp = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
)
export const flightRegexp = new RegExp(
  /^([a-zA-Z][\d]|[\d][a-zA-Z]|[a-zA-Z]{2,3})(\d{1,})$/
)
export const vehicleTypes = ['private', 'shared'] as const
export const items = [
  'shopping',
  'carSeat',
  'boosterSeat',
  'wheelchair',
  'petBox',
  'kayak',
  'bicycle',
  'surfTable',
  'nothing',
] as const
