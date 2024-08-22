import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'
import { useTranslations } from 'next-intl'

import { getSharedSchema } from '@/lib/schemas'
import { useErrorHandler } from '@/lib/hooks/useErrorHandler'
import { useURLParams } from '@/lib/hooks/useURLParams'
import { useRouter } from '@/navigation'
import { useIsEnglish } from '@/lib/hooks/useIsEnglish'
import { useState } from 'react'
import { Status } from '@/lib/types'
import { getUTCDates } from '@/lib/utils'

export function useSharedForm() {
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
  const schema = getSharedSchema(errors)
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
      items: [],
    },
  })
  useURLParams(form)
  const errorHandler = useErrorHandler()
  const queryClient = useQueryClient()
  const isEnglish = useIsEnglish()
  const router = useRouter()
  const [status, setStatus] = useState<Status>(undefined)

  async function onReserve(data: z.infer<typeof schema>) {
    setStatus('reserving')
    const { arrivalDate, departureDate } = getUTCDates(
      data.arrivalDate,
      data.departureDate
    )
    try {
      const res = await queryClient.fetchQuery({
        queryKey: ['createOrder'],
        queryFn: async () =>
          axios
            .post('/api/order', {
              ...data,
              arrivalDate,
              departureDate,
              vehicle: 'SHARED',
              privateItems: 'NOTHING',
              isEnglish,
              isReserve: true,
            })
            .then(r => r.data),
      })
      if (res.orderId) {
        router.push(`/checkout?orderId=${res.orderId}`)
      }
    } catch (e) {
      errorHandler(e)
    }
  }

  async function onFullPay(data: z.infer<typeof schema>) {
    setStatus('paying')
    const { arrivalDate, departureDate } = getUTCDates(
      data.arrivalDate,
      data.departureDate
    )
    try {
      const res = await queryClient.fetchQuery({
        queryKey: ['createOrder'],
        queryFn: async () =>
          axios
            .post('/api/order', {
              ...data,
              arrivalDate,
              departureDate,
              vehicle: 'SHARED',
              privateItems: 'NOTHING',
              isEnglish,
              isReserve: false,
            })
            .then(r => r.data),
      })
      if (res.orderId) {
        router.push(`/checkout?orderId=${res.orderId}`)
      }
    } catch (e) {
      errorHandler(e)
    }
  }

  return { form, onReserve, onFullPay, status }
}
