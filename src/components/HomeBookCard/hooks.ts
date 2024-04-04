import { useMemo } from 'react'
import { Hotel } from '@prisma/client'

import { showHotel } from '@/lib/utils'
import { useRouter } from '@/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useTranslations } from 'next-intl'

export function useBookForm(dataHotels: Hotel[]) {
  const t = useTranslations('form.errors')
  const required = t('required')
  const minimum = t('minimum', { value: 0 })
  const notAvailable = t('not-available')
  const router = useRouter()

  const FormSchema = useMemo(
    () =>
      z
        .object({
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
        })
        .refine(
          data => {
            if (data.type === 'shared') {
              return dataHotels && showHotel(dataHotels[data.hotel].zone)
            }
            return true
          },
          {
            message: notAvailable,
            path: ['hotel'],
          }
        ),
    [dataHotels, minimum, notAvailable, required]
  )
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: 'private',
      people: 1,
    },
  })

  const isPrivate = form.watch('type') === 'private'
  const hotels = dataHotels
    ? isPrivate
      ? dataHotels
      : dataHotels.filter(h => showHotel(h.zone))
    : []

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const params = new URLSearchParams()
    params.set('hotel', String(data.hotel))
    params.set('adults', String(data.people))
    router.push(`/${data.type}?${params.toString()}`)
  }

  return { form, onSubmit, hotels }
}
