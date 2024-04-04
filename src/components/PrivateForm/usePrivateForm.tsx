import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import axios from 'axios'

import { useErrorHandler } from '@/lib/hooks/useErrorHandler'
import { getPrivateSchema } from '@/lib/schemas'
import { useURLParams } from '@/lib/hooks/useURLParams'
import { useRouter } from '@/navigation'
import { useIsEnglish } from '@/lib/hooks/useIsEnglish'
import { useTranslations } from 'next-intl'

export function usePrivateForm() {
  const t = useTranslations('form.errors')
  const errors = {
    required: t('required'),
    minimumOne: t('minimum', { value: 1 }),
    minimum: t('minimum', { value: 0 }),
    maximum: t('maximum', { value: 50 }),
    email: t('email'),
    phone: t('phone'),
    tooManyPeople: t('too-many-people'),
    departureAfterArrival: t('departure-after-arrival'),
    invalidFlight: t('invalid-flight'),
    form: t('form'),
  }
  const schema = getPrivateSchema(errors)
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      phone: '',
      arrivalFlight: '',
      departureFlight: '',
      type: 'round-trip',
      adults: 1,
      children: 0,
      infants: 0,
      vehicle: 'SPRINTER',
      items: [],
      privateItems: 'NOTHING',
    },
  })

  useURLParams(form)
  const errorHandler = useErrorHandler()
  const queryClient = useQueryClient()
  const isEnglish = useIsEnglish()
  const router = useRouter()

  async function onSubmit(data: z.infer<typeof schema>) {
    try {
      const res = await queryClient.fetchQuery({
        queryKey: ['createOrder'],
        queryFn: async () =>
          axios.post('/api/order', { ...data, isEnglish }).then(r => r.data),
      })
      router.push(`/checkout?orderId=${res.orderId}`)
    } catch (e) {
      errorHandler(e)
    }
  }

  return { form, onSubmit }
}
