'use client'

import { useTranslations } from 'next-intl'
import Form from '@/components/Form'
import Button from '@/components/Button'
import Accordion from '@/components/Accordion'
import DestinationAccordion from '@/components/DestinationAccordion'
import PeopleAccordion from '@/components/PeopleAccordion'
import FlightsAccordion from '@/components/FlightsAccordion'
import UserAccordion from '@/components/UserAccordion'
import AdditionalsAccordion from '@/components/AdditionalsAccordion'
import { useSharedForm } from './useSharedForm'

function SharedForm() {
  const t = useTranslations('form')
  const { form, onSubmit } = useSharedForm()
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Accordion
          type="multiple"
          defaultValue={[
            'user',
            'destination',
            'people',
            'flights',
            'additionals',
          ]}
        >
          <UserAccordion form={form} />

          <DestinationAccordion form={form} />

          <PeopleAccordion form={form} />

          <FlightsAccordion form={form} />

          <AdditionalsAccordion form={form} type="shared" />
        </Accordion>

        <div className=" flex w-full justify-center">
          <Button className="mt-5" type="submit">
            {t('continue')}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default SharedForm
