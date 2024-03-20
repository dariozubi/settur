import { UseFormReturn } from 'react-hook-form'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/Accordion'
import { FormField } from '@/components/Form'
import DatePicker, {
  type Props as DatePickerProps,
} from '@/components/DatePicker'
import FlightInput, {
  type Props as FlightInputProps,
} from '@/components/FlightInput'
import { addDays } from 'date-fns'

export type Props = {
  form: UseFormReturn<any>
  labels: {
    flights: string
    departureFlight: FlightInputProps['labels']
    departureDate: DatePickerProps['labels']
    arrivalFlight: FlightInputProps['labels']
    arrivalDate: DatePickerProps['labels']
  }
}

function FlightsAccordion({ form, labels }: Props) {
  const type = form.watch('type')
  const arrivalDate = form.watch('arrivalDate')
  return (
    <AccordionItem value="flights">
      <AccordionTrigger>{labels.flights}</AccordionTrigger>

      <AccordionContent className="flex items-center justify-center gap-40 border-t py-10">
        {type !== 'airport' && (
          <div className="flex flex-col items-center gap-6">
            <div className="w-[300px]">
              <FormField
                control={form.control}
                name="arrivalDate"
                render={({ field }) => (
                  <DatePicker
                    labels={labels.arrivalDate}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="w-[300px]">
              <FormField
                control={form.control}
                name="arrivalFlight"
                render={({ field }) => (
                  <FlightInput
                    labels={labels.arrivalFlight}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                )}
              />
            </div>
          </div>
        )}

        {type !== 'hotel' && (
          <div className="flex flex-col items-center gap-6">
            <div className="w-[300px]">
              <FormField
                control={form.control}
                name="departureDate"
                render={({ field }) => (
                  <DatePicker
                    labels={labels.departureDate}
                    value={field.value}
                    onChange={field.onChange}
                    limitDate={addDays(arrivalDate, 1)}
                  />
                )}
              />
            </div>

            <div className="w-[300px]">
              <FormField
                control={form.control}
                name="departureFlight"
                render={({ field }) => (
                  <FlightInput
                    labels={labels.departureFlight}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                )}
              />
            </div>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  )
}

export default FlightsAccordion
