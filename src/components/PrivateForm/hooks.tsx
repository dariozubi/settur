import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'

import { toast } from '@/components/ui/use-toast'

type ErrorLabels = {
  required: string
  minimum: string
  minimumOne: string
}

export function usePrivateForm({ required, minimum, minimumOne }: ErrorLabels) {
  const searchParams = useSearchParams()
  const FormSchema = useMemo(
    () =>
      z.object({
        hotel: z.string({
          required_error: required,
        }),
        type: z.enum(['round-trip', 'one-way'], {
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
      }),
    [minimum, minimumOne, required]
  )

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: 'round-trip',
      adults: 1,
      children: 0,
      infants: 0,
    },
  })

  useEffect(() => {
    form.setValue('hotel', searchParams.get('hotel') || '')
    form.setValue('adults', Number(searchParams.get('adults')) || 1)
  }, [form, searchParams])

  function onSubmit(data: z.infer<typeof FormSchema>) {
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
