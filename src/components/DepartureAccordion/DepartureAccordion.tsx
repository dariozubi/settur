import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FormField } from '../ui/form'
import { UseFormReturn } from 'react-hook-form'
import DatePicker, {
  type Props as DatePickerProps,
} from '@/components/DatePicker'
import FlightInput, {
  type Props as FlightInputProps,
} from '@/components/FlightInput'

export type Props = {
  form: UseFormReturn<any>
  labels: {
    departure: string
    flight: FlightInputProps['labels']
    departureDate: DatePickerProps['labels']
  }
}

function DepartureAccordion({ form, labels }: Props) {
  return (
    <AccordionItem value="departure">
      <AccordionTrigger>{labels.departure}</AccordionTrigger>

      <AccordionContent className="flex items-center justify-center gap-6 border-t py-10">
        <div className="w-[300px]">
          <FormField
            control={form.control}
            name="departureDate"
            render={({ field }) => (
              <DatePicker
                labels={labels.departureDate}
                value={field.value}
                onChange={field.onChange}
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

export default DepartureAccordion
