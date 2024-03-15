'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Accordion } from '@/components/ui/accordion'
import { SharedFormLabels } from './types'
import DestinationAccordion from '../DestinationAccordion'
import PeopleAccordion from '../PeopleAccordion'
import ArrivalAccordion from '../ArrivalAccordion'
import DepartureAccordion from '../DepartureAccordion'
import UserAccordion from '../UserAccordion'
import AdditionalsAccordion from '../AdditionalsAccordion'
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
