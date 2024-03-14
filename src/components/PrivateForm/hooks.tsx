import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'

import { toast } from '@/components/ui/use-toast'
import { PrivateFormLabels } from './types'
import { trips, vehicles } from '@/lib/consts'

export function usePrivateForm({
  required,
  minimum,
  minimumOne,
}: PrivateFormLabels['error']) {
  const searchParams = useSearchParams()
  const [first, ...others] = Object.keys(vehicles)
  const formSchema = useMemo(
    () =>
      z.object({
        hotel: z.string({
          required_error: required,
        }),
        type: z.enum(trips, {
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
      }),
    [first, minimum, minimumOne, others, required]
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: 'round-trip',
      adults: 1,
      children: 0,
      infants: 0,
      vehicle: 'sprinter',
    },
  })

  useEffect(() => {
    form.setValue('hotel', searchParams.get('hotel') || '')
    form.setValue('adults', Number(searchParams.get('adults')) || 1)
  }, [form, searchParams])

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return { form, onSubmit, formSchema }
}
