import { useMemo } from 'react'
import { useRouter } from '@/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { BookFormLabels } from './types'

export function useBookForm({ required, minimum }: BookFormLabels['error']) {
  const router = useRouter()
  const FormSchema = useMemo(
    () =>
      z.object({
        hotel: z
          .number({
            required_error: required,
          })
          .int(),
        type: z.enum(['private', 'shared'], {
          required_error: required,
        }),
        people: z.coerce
          .number({ required_error: required })
          .int()
          .min(1, { message: minimum }),
      }),
    [minimum, required]
  )
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: 'private',
      people: 1,
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const params = new URLSearchParams()
    params.set('hotel', String(data.hotel))
    params.set('adults', String(data.people))
    router.push(`/${data.type}?${params.toString()}`)
  }

  return { form, onSubmit }
}
