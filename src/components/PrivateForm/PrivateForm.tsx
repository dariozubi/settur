'use client'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Accordion } from '@/components/ui/accordion'
import { PrivateFormLabels } from './types'
import { usePrivateForm } from './hooks'
import DestinationAccordion from '../DestinationAccordion'
import PeopleAccordion from '../PeopleAccordion'
import VehicleAccordion from '../VehicleAccordion'
import ArrivalAccordion from '../ArrivalAccordion'
import DepartureAccordion from '../DepartureAccordion'

type Props = {
  labels: PrivateFormLabels
}

function PrivateForm({ labels }: Props) {
  const { form, onSubmit } = usePrivateForm(labels.error)
  const type = form.watch('type')
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Accordion
          type="multiple"
          defaultValue={[
            'destination',
            'people',
            'vehicle',
            'arrival',
            'departure',
          ]}
        >
          <DestinationAccordion form={form} labels={labels} />

          <PeopleAccordion form={form} labels={labels} />

          <VehicleAccordion form={form} labels={labels} />

          {type !== 'airport' && (
            <ArrivalAccordion form={form} labels={labels} />
          )}

          {type !== 'hotel' && (
            <DepartureAccordion form={form} labels={labels} />
          )}
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
