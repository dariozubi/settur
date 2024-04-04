'use client'

import Form from '@/components/Form'
import Accordion from '@/components/Accordion'
import DestinationAccordion from '@/components/DestinationAccordion'
import PeopleAccordion from '@/components/PeopleAccordion'
import VehicleAccordion from '@/components/VehicleAccordion'
import FlightsAccordion from '@/components/FlightsAccordion'
import UserAccordion from '@/components/UserAccordion'
import AdditionalsAccordion from '@/components/AdditionalsAccordion'
import { usePrivateForm } from './usePrivateForm'
import { useState } from 'react'
import { ReviewDialog } from './ReviewDialog'

function PrivateForm() {
  const { form, onSubmit } = usePrivateForm()
  const [openAccordions, setOpenAccordions] = useState([
    'user',
    'destination',
    'people',
    'vehicle',
    'flights',
    'additionals',
  ])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="private-form">
        <Accordion
          type="multiple"
          value={openAccordions}
          onValueChange={setOpenAccordions}
        >
          <UserAccordion form={form} />

          <DestinationAccordion form={form} isPrivate />

          <PeopleAccordion form={form} />

          <FlightsAccordion form={form} />

          <VehicleAccordion form={form} />

          <AdditionalsAccordion form={form} type="private" />
        </Accordion>

        <ReviewDialog form={form} setOpenAccordions={setOpenAccordions} />
      </form>
    </Form>
  )
}

export default PrivateForm
