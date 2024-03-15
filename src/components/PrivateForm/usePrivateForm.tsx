import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { toast } from '@/components/ui/use-toast'
import { PrivateFormLabels } from './types'
import { usePrivateSchema } from './usePrivateSchema'
import { usePrivateURLParams } from './usePrivateURLParams'

export function usePrivateForm({ error }: Pick<PrivateFormLabels, 'error'>) {
  const schema = usePrivateSchema({ error })
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: 'round-trip',
      adults: 1,
      children: 0,
      infants: 0,
      vehicle: 'sprinter',
      items: [],
    },
  })

  usePrivateURLParams(form)

  function onSubmit(data: z.infer<typeof schema>) {
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
