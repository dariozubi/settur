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
import ReviewDialog from '../ReviewDialog'
import { Hotel, Rate } from '@prisma/client'

type Props = {
  hotels: Hotel[]
  rates: Rate[]
}

function PrivateForm({ hotels, rates }: Props) {
  const { form, onFullPay, onReserve } = usePrivateForm()
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
      <form id="trip-form">
        <Accordion
          type="multiple"
          value={openAccordions}
          onValueChange={setOpenAccordions}
        >
          <UserAccordion form={form} />

          <DestinationAccordion form={form} hotels={hotels} />

          <PeopleAccordion form={form} />

          <FlightsAccordion form={form} />

          <VehicleAccordion form={form} hotels={hotels} rates={rates} />

          <AdditionalsAccordion form={form} type="private" />
        </Accordion>

        <ReviewDialog
          onFullPay={onFullPay}
          onReserve={onReserve}
          form={form}
          setOpenAccordions={setOpenAccordions}
          hotels={hotels}
          rates={rates}
        />
      </form>
    </Form>
  )
}

export default PrivateForm
