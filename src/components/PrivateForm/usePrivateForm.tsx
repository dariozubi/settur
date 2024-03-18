import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'

import { toast } from '@/components/Toast'
import { useErrorHandler } from '@/lib/hooks'
import { PrivateFormLabels } from './types'
import { usePrivateSchema } from './usePrivateSchema'
import { usePrivateURLParams } from './usePrivateURLParams'

export function usePrivateForm({ error }: Pick<PrivateFormLabels, 'error'>) {
  const schema = usePrivateSchema({ error })
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
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
    },
  })

  usePrivateURLParams(form)
  const errorHandler = useErrorHandler()

  async function onSubmit(data: z.infer<typeof schema>) {
    try {
      const res = await axios.post('/api/order', {
        ...data,
        vehicleType: 'private',
      })
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
