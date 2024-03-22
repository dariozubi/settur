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
      vehicle: 'sprinter',
      items: [],
      privateItems: 'nothing',
    },
  })

  useURLParams(form)
  const errorHandler = useErrorHandler()

  async function onSubmit(data: z.infer<typeof schema>) {
    try {
      // const res = await axios.post('/api/order', {
      //   ...data,
      //   vehicleType: 'private',
      // })
      const res = { data }
      toast({
        title: 'You submitted the following values:',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(res.data, null, 2)}
            </code>
          </pre>
        ),
      })
    } catch (e) {
      errorHandler(e)
    }
  }

  return { form, onSubmit }
}
