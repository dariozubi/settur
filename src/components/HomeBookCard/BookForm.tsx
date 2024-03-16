'use client'

import Button from '@/components/Button'
import Form, { FormField } from '@/components/Form'
import HotelSelect from '@/components/HotelSelect'
import PeopleInput from '@/components/PeopleInput'
import { VehicleTypeRadio } from './VehicleTypeRadio'
import { useBookForm } from './hooks'
import { BookFormLabels } from './types'

type Props = {
  labels: BookFormLabels
}

export function BookForm({ labels }: Props) {
  const { form, onSubmit } = useBookForm(labels.error)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <FormField
          control={form.control}
          name="hotel"
          render={({ field }) => (
            <HotelSelect
              labels={labels.hotel}
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
              labels={labels.vehicleType}
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
              labels={labels.people}
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />

        <div className=" flex w-full justify-center">
          <Button className="mt-5" type="submit">
            {labels.submit}
          </Button>
        </div>
      </form>
    </Form>
  )
}
