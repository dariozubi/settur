import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FormField } from '../ui/form'
import { UseFormReturn } from 'react-hook-form'
import { PrivateFormLabels } from '../PrivateForm/types'
import DatePicker from '../DatePicker'
import FlightInput from '../FlightInput'

type Props = {
  form: UseFormReturn<any>
  labels: Pick<PrivateFormLabels, 'arrival' | 'arrivalDate' | 'arrivalFlight'>
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
                labels={labels.arrivalFlight}
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
