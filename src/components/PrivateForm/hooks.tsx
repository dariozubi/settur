import { zodResolver } from '@hookform/resolvers/zod'
import { UseFormReturn, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'

import { toast } from '@/components/ui/use-toast'
import { PrivateFormLabels } from './types'
import { vehicles } from '@/lib/consts'

export function usePrivateForm({
  required,
  minimum,
  minimumOne,
}: PrivateFormLabels['error']) {
  const schema = useSchema({
    required,
    minimum,
    minimumOne,
  })
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: 'round-trip',
      adults: 1,
      children: 0,
      infants: 0,
      vehicle: 'sprinter',
    },
  })

  useURLParams(form)

  function onSubmit(data: z.infer<typeof schema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return { form, onSubmit }
}

function useURLParams(form: UseFormReturn<any>) {
  const searchParams = useSearchParams()
  useEffect(() => {
    const hotel = searchParams.get('hotel')
    if (hotel) form.setValue('hotel', hotel)
    form.setValue('adults', Number(searchParams.get('adults')) || 1)
  }, [form, searchParams])
}

function useSchema({
  required,
  minimum,
  minimumOne,
}: Omit<PrivateFormLabels['error'], 'tooManyPeople'>) {
  const [first, ...others] = Object.keys(vehicles)
  const formSchema = useMemo(() => {
    const baseSchema = z.object({
      hotel: z.string({
        required_error: required,
      }),
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
      vehicle: z.enum([first, ...others], {
        required_error: required,
      }),
    })
    const finalSchema = z.discriminatedUnion('type', [
      z
        .object({
          type: z.literal('round-trip'),
          arrivalDate: z.date({
            required_error: required,
          }),
          arrivalFlight: z.string({ required_error: required }),
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
        })
        .merge(baseSchema),
    ])
    return finalSchema
  }, [first, minimum, minimumOne, others, required])

  return formSchema
}
