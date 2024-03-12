'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
import HotelSelect, {
  type Props as HotelSelectProps,
} from '@/components/HotelSelect'
import { useMemo } from 'react'
import {
  type Props as VehicleTypeRadioProps,
  VehicleTypeRadio,
} from './VehicleTypeRadio'
import { type Props as PeopleInputProps, PeopleInput } from './PeopleInput'
import { useRouter } from '@/navigation'

type Props = {
  labels: {
    requiredHotelError: string
    requiredTypeError: string
    requiredPeopleError: string
    minimumPeopleError: string
    submit: string
    hotelLabels: HotelSelectProps['labels']
    typeLabels: VehicleTypeRadioProps['labels']
    peopleLabels: PeopleInputProps['labels']
  }
}

export function BookForm({ labels }: Props) {
  const {
    requiredHotelError,
    requiredTypeError,
    requiredPeopleError,
    minimumPeopleError,
    hotelLabels,
    typeLabels,
    peopleLabels,
    submit,
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
        people: z.coerce
          .number({ required_error: requiredPeopleError })
          .int()
          .positive({ message: minimumPeopleError })
          .min(1, { message: minimumPeopleError }),
      }),
    [
      minimumPeopleError,
      requiredHotelError,
      requiredPeopleError,
      requiredTypeError,
    ]
  )

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: 'private',
      people: 1,
    },
  })
  const router = useRouter()

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const params = new URLSearchParams()
    params.set('hotel', data.hotel)
    router.push(`/${data.type}?${params.toString()}`)
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
            <VehicleTypeRadio
              labels={typeLabels}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <FormField
          control={form.control}
          name="people"
          render={({ field }) => (
            <PeopleInput
              labels={peopleLabels}
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />

        <div className=" flex w-full justify-center">
          <Button className="mt-5" type="submit">
            {submit}
          </Button>
        </div>
      </form>
    </Form>
  )
}
