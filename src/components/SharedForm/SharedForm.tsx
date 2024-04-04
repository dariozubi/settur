'use client'

import { useState } from 'react'
import { Hotel, Rate } from '@prisma/client'

import Form from '@/components/Form'
import Accordion from '@/components/Accordion'
import DestinationAccordion from '@/components/DestinationAccordion'
import PeopleAccordion from '@/components/PeopleAccordion'
import FlightsAccordion from '@/components/FlightsAccordion'
import UserAccordion from '@/components/UserAccordion'
import AdditionalsAccordion from '@/components/AdditionalsAccordion'
import { useSharedForm } from './useSharedForm'
import ReviewDialog from '../ReviewDialog'

type Props = {
  hotels: Hotel[]
  rates: Rate[]
}

function SharedForm({ hotels, rates }: Props) {
  const { form, onSubmit } = useSharedForm()
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Accordion
          type="multiple"
          value={openAccordions}
          onValueChange={setOpenAccordions}
        >
          <UserAccordion form={form} />

          <DestinationAccordion form={form} hotels={hotels} />

          <PeopleAccordion form={form} />

          <FlightsAccordion form={form} />

          <AdditionalsAccordion form={form} type="shared" />
        </Accordion>

        <ReviewDialog
          form={form}
          setOpenAccordions={setOpenAccordions}
          hotels={hotels}
          isShared
          rates={rates}
        />
      </form>
    </Form>
  )
}

export default SharedForm
