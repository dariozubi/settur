import { flightRegexp, phoneRegexp, vehicleBrands } from './consts'
import { AnyZodObject, z } from 'zod'
import { FormErrors } from './types'
import { compareAsc } from 'date-fns'

function getFinalSchema({
  schema,
  required,
  departureAfterArrival,
  maximum,
  invalidFlight,
}: {
  schema: AnyZodObject
  required: string
  departureAfterArrival: string
  maximum: string
  invalidFlight: string
}) {
  const finalSchema = z
    .discriminatedUnion('type', [
      // @ts-ignore: Ni idea de como quitarlo
      z
        .object({
          type: z.literal('round-trip'),
          arrivalDate: z.date({
            required_error: required,
          }),
          arrivalFlight: z
            .string()
            .trim()
            .min(1, { message: required })
            .regex(flightRegexp, { message: invalidFlight }),
          departureDate: z.date({
            required_error: required,
          }),
          departureFlight: z
            .string()
            .trim()
            .min(1, { message: required })
            .regex(flightRegexp, { message: invalidFlight }),
        })
        .merge(schema),
      z
        .object({
          type: z.literal('hotel'),
          arrivalDate: z.date({
            required_error: required,
          }),
          arrivalFlight: z
            .string()
            .trim()
            .min(1, { message: required })
            .regex(flightRegexp, { message: invalidFlight }),
        })
        .merge(schema),
      z
        .object({
          type: z.literal('airport'),
          departureDate: z.date({
            required_error: required,
          }),
          departureFlight: z
            .string()
            .trim()
            .min(1, { message: required })
            .regex(flightRegexp, { message: invalidFlight }),
        })
        .merge(schema),
    ])
    .refine(
      data => {
        if (data.type === 'round-trip') {
          const compare = compareAsc(data.arrivalDate, data.departureDate)
          return compare === -1
        }
        return true
      },
      {
        message: departureAfterArrival,
        path: ['departureDate'],
      }
    )
    .refine(data => data.adults + data.children + data.infants < 50, {
      message: maximum,
      path: ['adults'],
    })
  return finalSchema
}

function getBaseSchema({
  required,
  email,
  phone,
  minimumOne,
  maximum,
  minimum,
}: Omit<FormErrors, 'tooManyPeople' | 'departureAfterArrival'>) {
  const schema = z.object({
    name: z.string().trim().min(1, { message: required }),
    surname: z.string().trim().min(1, { message: required }),
    email: z.string().email({ message: email }),
    phone: z.string().regex(phoneRegexp, { message: phone }),
    hotel: z.string({ required_error: required }),
    adults: z.coerce
      .number({ required_error: required })
      .int()
      .min(1, { message: minimumOne })
      .max(50, { message: maximum }),
    children: z.coerce
      .number({ required_error: required })
      .int()
      .min(0, { message: minimum })
      .max(50, { message: maximum }),
    infants: z.coerce
      .number({ required_error: required })
      .int()
      .min(0, { message: minimum })
      .max(50, { message: maximum }),

    items: z.array(z.string()),
  })
  return schema
}

export function getPrivateSchema({
  required,
  email,
  phone,
  minimumOne,
  maximum,
  minimum,
  departureAfterArrival,
  invalidFlight,
}: FormErrors) {
  const base = getBaseSchema({
    required,
    email,
    phone,
    minimumOne,
    minimum,
    maximum,
    invalidFlight,
  })
  const [first, ...others] = vehicleBrands
  const schema = base.merge(
    z.object({
      vehicle: z.enum([first, ...others], { required_error: required }),
      privateItems: z.enum([
        'petBox',
        'kayak',
        'bicycle',
        'surfTable',
        'nothing',
      ]),
    })
  )
  const final = getFinalSchema({
    schema,
    departureAfterArrival,
    maximum,
    required,
    invalidFlight,
  })
  return final
}

export function getSharedSchema({
  required,
  email,
  phone,
  minimumOne,
  maximum,
  minimum,
  departureAfterArrival,
  invalidFlight,
}: FormErrors) {
  const schema = getBaseSchema({
    required,
    email,
    phone,
    minimumOne,
    minimum,
    maximum,
    invalidFlight,
  })
  const final = getFinalSchema({
    schema,
    departureAfterArrival,
    maximum,
    required,
    invalidFlight,
  })
  return final
}
