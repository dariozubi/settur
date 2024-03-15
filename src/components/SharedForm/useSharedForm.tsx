import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { toast } from '@/components/ui/use-toast'
import { SharedFormLabels } from './types'
import { useSharedSchema } from './useSharedSchema'
import { useSharedURLParams } from './useSharedURLParams'

export function useSharedForm({ error }: Pick<SharedFormLabels, 'error'>) {
  const schema = useSharedSchema({ error })
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: 'round-trip',
      adults: 1,
      children: 0,
      infants: 0,
      items: [],
    },
  })

  useSharedURLParams(form)

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
