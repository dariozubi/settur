import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
// import axios from 'axios'

import type { Props as VehicleProps } from '@/components/VehicleAccordion'
import { toast } from '@/components/Toast'
import { useErrorHandler } from '@/lib/hooks/useErrorHandler'
import { getPrivateSchema } from '@/lib/schemas'
import { FormLabels } from '@/lib/types'
import { useURLParams } from '@/lib/hooks/useURLParams'
import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
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
  const isEnglish = useIsEnglish()
  const errorHandler = useErrorHandler()
  const queryClient = useQueryClient()

  async function onSubmit(data: z.infer<typeof schema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
    try {
      await queryClient.fetchQuery({
        queryKey: ['createOrder'],
        queryFn: async () =>
          axios.post('/api/order', { ...data, isEnglish }).then(r => r.data),
      })
    } catch (e) {
      errorHandler(e)
    }
  }

  return { form, onSubmit }
}
