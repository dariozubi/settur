'use client'

import { useTranslations } from 'next-intl'
import { Hotel } from '@prisma/client'

import Button from '@/components/Button'
import Form, { FormField } from '@/components/Form'
import HotelSelect from '@/components/HotelSelect'
import PeopleInput from '@/components/PeopleInput'
import { VehicleTypeRadio } from './VehicleTypeRadio'
import { useBookForm } from './hooks'

type Props = {
  dataHotels: Hotel[]
}

export function BookForm({ dataHotels }: Props) {
  const t = useTranslations('form')
  const { form, onSubmit, hotels } = useBookForm(dataHotels)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <VehicleTypeRadio value={field.value} onChange={field.onChange} />
          )}
        />

        <FormField
          control={form.control}
          name="hotel"
          render={({ field }) => (
            <HotelSelect
              value={field.value}
              onSelect={v => {
                form.setValue('hotel', v)
              }}
              hotels={hotels}
            />
          )}
        />

        <FormField
          control={form.control}
          name="people"
          render={({ field }) => (
            <PeopleInput
              label={t('PeopleInput.adults-number')}
              onChange={field.onChange}
              value={field.value}
            />
          )}
        />

        <div className=" flex w-full justify-center">
          <Button className="mt-5" type="submit">
            {t('continue')}
          </Button>
        </div>
      </form>
    </Form>
  )
}
