import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { UseFormReturn } from 'react-hook-form'
import DatePicker, {
  type Props as DatePickerProps,
} from '@/components/DatePicker'
import FlightInput, {
  type Props as FlightInputProps,
} from '@/components/FlightInput'
import { FormField } from '../ui/form'

export type Props = {
  form: UseFormReturn<any>
  labels: {
    arrival: string
    flight: FlightInputProps['labels']
    arrivalDate: DatePickerProps['labels']
  }
}

function ArrivalAccordion({ form, labels }: Props) {
  return (
    <AccordionItem value="arrival">
      <AccordionTrigger>{labels.arrival}</AccordionTrigger>

      <AccordionContent className="flex items-center justify-center gap-6 border-t py-10">
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
                labels={labels.flight}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

export default ArrivalAccordion
