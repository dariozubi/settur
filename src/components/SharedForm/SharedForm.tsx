'use client'

import { Form } from '@/components/ui/form'
import Button from '@/components/Button'
import Accordion from '@/components/Accordion'
import DestinationAccordion from '@/components/DestinationAccordion'
import PeopleAccordion from '@/components/PeopleAccordion'
import ArrivalAccordion from '@/components/ArrivalAccordion'
import DepartureAccordion from '@/components/DepartureAccordion'
import UserAccordion from '@/components/UserAccordion'
import AdditionalsAccordion from '@/components/AdditionalsAccordion'
import { SharedFormLabels } from './types'
import { useSharedForm } from './useSharedForm'

type Props = {
  labels: SharedFormLabels
}

function SharedForm({ labels }: Props) {
  const { form, onSubmit } = useSharedForm({ error: labels.error })
  const type = form.watch('type')
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Accordion
          type="multiple"
          defaultValue={[
            'user',
            'destination',
            'people',
            'arrival',
            'departure',
          ]}
        >
          <UserAccordion form={form} labels={labels} />

          <DestinationAccordion form={form} labels={labels} />

          <PeopleAccordion form={form} labels={labels} />

          {type !== 'airport' && (
            <ArrivalAccordion form={form} labels={labels} />
          )}

          {type !== 'hotel' && (
            <DepartureAccordion form={form} labels={labels} />
          )}

          <AdditionalsAccordion form={form} labels={labels} />
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
