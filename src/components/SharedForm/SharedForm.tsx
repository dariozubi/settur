'use client'

import Form from '@/components/Form'
import Button from '@/components/Button'
import Accordion from '@/components/Accordion'
import DestinationAccordion from '@/components/DestinationAccordion'
import PeopleAccordion from '@/components/PeopleAccordion'
import FlightsAccordion from '@/components/FlightsAccordion'
import UserAccordion from '@/components/UserAccordion'
import AdditionalsAccordion from '@/components/AdditionalsAccordion'
import { useSharedForm } from './useSharedForm'
import { FormLabels } from '@/lib/types'

type Props = {
  labels: FormLabels
}

function SharedForm({ labels }: Props) {
  const { form, onSubmit } = useSharedForm({ error: labels.error })
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
          <UserAccordion form={form} labels={labels} />

          <DestinationAccordion form={form} labels={labels} />

          <PeopleAccordion form={form} labels={labels} />

          <FlightsAccordion form={form} labels={labels} />

          <AdditionalsAccordion form={form} labels={labels} type="shared" />
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

export default SharedForm
