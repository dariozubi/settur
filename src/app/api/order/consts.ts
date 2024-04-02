import { compareAsc, intervalToDuration } from 'date-fns'
import { z } from 'zod'
import { items, phoneRegexp, trips, vehicleBrands } from '@/lib/consts'

const [first, ...others] = vehicleBrands
export const schema = z
  .object({
    name: z.string().trim().min(1),
    surname: z.string().trim().min(1),
    email: z.string().email(),
    phone: z.string().regex(phoneRegexp),
    hotel: z.number().int(),
    adults: z.coerce.number().int().min(1),
    children: z.coerce.number().int().min(0),
    infants: z.coerce.number().int().min(0),
    vehicle: z.enum([first, ...others, 'SHARED']),
    items: z.array(z.enum(items)),
    type: z.enum(trips),
    arrivalDate: z.coerce.date().optional(),
    arrivalFlight: z.string().trim().min(1).optional(),
    departureDate: z.coerce.date().optional(),
    departureFlight: z.string().trim().min(1).optional(),
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
