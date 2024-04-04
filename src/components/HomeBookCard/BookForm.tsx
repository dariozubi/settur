'use client'

import { useTranslations } from 'next-intl'
import Button from '@/components/Button'
import Form, { FormField } from '@/components/Form'
import HotelSelect from '@/components/HotelSelect'
import PeopleInput from '@/components/PeopleInput'
import { VehicleTypeRadio } from './VehicleTypeRadio'
import { useBookForm } from './hooks'

export function BookForm() {
  const t = useTranslations('form')
  const { form, onSubmit, isLoading, hotels } = useBookForm()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <FormField
          control={form.control}
          disabled={isLoading}
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
