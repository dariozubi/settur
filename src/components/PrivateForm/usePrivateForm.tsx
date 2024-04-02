import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import axios from 'axios'

import type { Props as VehicleProps } from '@/components/VehicleAccordion'
import { useErrorHandler } from '@/lib/hooks/useErrorHandler'
import { getPrivateSchema } from '@/lib/schemas'
import { FormLabels } from '@/lib/types'
import { useURLParams } from '@/lib/hooks/useURLParams'
import { useRouter } from '@/navigation'
import { useIsEnglish } from '@/lib/hooks/useIsEnglish'

export type PrivateFormLabels = FormLabels & VehicleProps['labels']

export function usePrivateForm({ error }: Pick<PrivateFormLabels, 'error'>) {
  const schema = getPrivateSchema(error)
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
      privateItems: 'nothing',
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
