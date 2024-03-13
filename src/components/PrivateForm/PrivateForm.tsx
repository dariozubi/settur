'use client'

import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
import HotelSelect from '@/components/HotelSelect'
import TripTypeRadio from '@/components/TripTypeRadio'
import PeopleInput from '@/components/PeopleInput'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { PrivateFormLabels } from './types'
import { usePrivateForm } from './hooks'

type Props = {
  labels: PrivateFormLabels
}

function PrivateForm({ labels }: Props) {
  const { form, onSubmit } = usePrivateForm(labels.error)
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Accordion type="multiple" defaultValue={['destination', 'people']}>
          <AccordionItem value="destination">
            <AccordionTrigger>{labels.destination}</AccordionTrigger>

            <AccordionContent className="space-y-6 border-t py-10">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <TripTypeRadio
                    labels={labels.tripType}
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
                    labels={labels.hotel}
                    value={field.value}
                    onSelect={v => {
                      form.setValue('hotel', v)
                    }}
                  />
                )}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="people">
            <AccordionTrigger>{labels.people}</AccordionTrigger>

            <AccordionContent className="space-y-6 border-t py-10">
              <FormField
                control={form.control}
                name="adults"
                render={({ field }) => (
                  <PeopleInput
                    labels={labels.adults}
                    onChange={field.onChange}
                    value={field.value}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="children"
                render={({ field }) => (
                  <PeopleInput
                    labels={labels.children}
                    onChange={field.onChange}
                    value={field.value}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="infants"
                render={({ field }) => (
                  <PeopleInput
                    labels={labels.infants}
                    onChange={field.onChange}
                    value={field.value}
                  />
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className=" flex w-full justify-center">
          <Button className="mt-5" type="submit">
            {labels.submit}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default PrivateForm
