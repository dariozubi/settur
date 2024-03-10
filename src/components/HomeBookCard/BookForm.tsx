'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'
import { type Props as HotelSelectProps, HotelSelect } from './HotelSelect'
import { useMemo } from 'react'
import { type Props as TypeRadioProps, TypeRadio } from './TypeRadio'

type Props = {
  labels: {
    requiredHotelError: string
    requiredTypeError: string
    submit: string
    hotelLabels: HotelSelectProps['labels']
    typeLabels: TypeRadioProps['labels']
  }
}

export function BookForm({ labels }: Props) {
  const {
    requiredHotelError,
    requiredTypeError,
    hotelLabels,
    submit,
    typeLabels,
  } = labels
  const FormSchema = useMemo(
    () =>
      z.object({
        hotel: z.string({
          required_error: requiredHotelError,
        }),
        type: z.enum(['private', 'shared'], {
          required_error: requiredTypeError,
        }),
      }),
    [requiredHotelError, requiredTypeError]
  )

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: 'private',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="hotel"
          render={({ field }) => (
            <HotelSelect
              labels={hotelLabels}
              value={field.value}
              onSelect={v => {
                form.setValue('hotel', v)
              }}
            />
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <TypeRadio
              labels={typeLabels}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <div className="flex w-full justify-center">
          <Button type="submit">{submit}</Button>
        </div>
      </form>
    </Form>
  )
}
