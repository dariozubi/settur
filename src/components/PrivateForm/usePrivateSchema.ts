import { z } from 'zod'
import { useMemo } from 'react'

import { PrivateFormLabels } from './types'
import { vehicles } from '@/lib/consts'

export function usePrivateSchema({ error }: Pick<PrivateFormLabels, 'error'>) {
  const { required, minimum, minimumOne, email, phone } = error
  const [first, ...others] = useMemo(() => Object.keys(vehicles), [])
  const phoneRegex = useMemo(
    () =>
      new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/),
    []
  )
  const formSchema = useMemo(() => {
    const baseSchema = z.object({
      name: z.string({ required_error: required }),
      surname: z.string({ required_error: required }),
      email: z.string({ required_error: required }).email({ message: email }),
      phone: z
        .string({ required_error: required })
        .regex(phoneRegex, { message: phone }),
      hotel: z.string({ required_error: required }),
      adults: z.coerce
        .number({ required_error: required })
        .int()
        .min(1, { message: minimumOne }),
      children: z.coerce
        .number({ required_error: required })
        .int()
        .min(0, { message: minimum }),
      infants: z.coerce
        .number({ required_error: required })
        .int()
        .min(0, { message: minimum }),
      vehicle: z.enum([first, ...others], { required_error: required }),
      items: z.array(z.string()),
    })
    const finalSchema = z.discriminatedUnion('type', [
      z
        .object({
          type: z.literal('round-trip'),
          arrivalDate: z.date({
            required_error: required,
          }),
          arrivalFlight: z.string({ required_error: required }),
          departureDate: z.date({
            required_error: required,
          }),
          departureFlight: z.string({ required_error: required }),
        })
        .merge(baseSchema),
      z
        .object({
          type: z.literal('hotel'),
          arrivalDate: z.date({
            required_error: required,
          }),
          arrivalFlight: z.string({ required_error: required }),
        })
        .merge(baseSchema),
      z
        .object({
          type: z.literal('airport'),
          departureDate: z.date({
            required_error: required,
          }),
          departureFlight: z.string({ required_error: required }),
        })
        .merge(baseSchema),
    ])
    return finalSchema
  }, [email, first, minimum, minimumOne, others, phone, phoneRegex, required])

  return formSchema
}