'use client'

import Button from '@/components/Button'
import Form from '@/components/Form'
import Accordion from '@/components/Accordion'
import DestinationAccordion from '@/components/DestinationAccordion'
import PeopleAccordion from '@/components/PeopleAccordion'
import VehicleAccordion from '@/components/VehicleAccordion'
import FlightsAccordion from '@/components/FlightsAccordion'
import UserAccordion from '@/components/UserAccordion'
import AdditionalsAccordion from '@/components/AdditionalsAccordion'
import { PrivateFormLabels, usePrivateForm } from './usePrivateForm'
import { useState } from 'react'

type Props = {
  labels: PrivateFormLabels
}

function PrivateForm({ labels }: Props) {
  const { form, onSubmit } = usePrivateForm({ error: labels.error })
  const [openAccordions, setOpenAccordions] = useState([
    'user',
    'destination',
    'people',
    'vehicle',
    'flights',
    'additionals  ',
  ])
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Accordion
          type="multiple"
          value={openAccordions}
          onValueChange={setOpenAccordions}
        >
          <UserAccordion form={form} labels={labels} />

          <DestinationAccordion form={form} labels={labels} />

          <PeopleAccordion form={form} labels={labels} />

          <FlightsAccordion form={form} labels={labels} />

          <VehicleAccordion form={form} labels={labels} />

          <AdditionalsAccordion form={form} labels={labels} type="private" />
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
