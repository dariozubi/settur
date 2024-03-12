'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'
import { useEffect, useMemo } from 'react'
import HotelSelect, {
  type Props as HotelSelectProps,
} from '@/components/HotelSelect'
import { useSearchParams } from 'next/navigation'
import TripTypeRadio, {
  type Props as TripTypeProps,
} from '@/components/TripTypeRadio'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

type Props = {
  labels: {
    requiredHotelError: string
    requiredTypeError: string
    hotelLabels: HotelSelectProps['labels']
    typeLabels: TripTypeProps['labels']
    destination: string
    submit: string
  }
}

function PrivateForm({ labels }: Props) {
  const {
    requiredHotelError,
    requiredTypeError,
    hotelLabels,
    typeLabels,
    submit,
    destination,
  } = labels

  const searchParams = useSearchParams()

  const FormSchema = useMemo(
    () =>
      z.object({
        hotel: z.string({
          required_error: requiredHotelError,
        }),
        type: z.enum(['round-trip', 'one-way'], {
          required_error: requiredTypeError,
        }),
      }),
    [requiredHotelError, requiredTypeError]
  )

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: 'round-trip',
    },
  })

  useEffect(() => {
    const hotel = searchParams.get('hotel')
    form.setValue('hotel', hotel || '')
  }, [form, searchParams])

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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Accordion type="multiple" defaultValue={['destination']}>
          <AccordionItem value="destination">
            <AccordionTrigger>{destination}</AccordionTrigger>

            <AccordionContent className="space-y-6 border-t py-10">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <TripTypeRadio
                    labels={typeLabels}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />

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
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className=" flex w-full justify-center">
          <Button className="mt-5" type="submit">
            {submit}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default PrivateForm
