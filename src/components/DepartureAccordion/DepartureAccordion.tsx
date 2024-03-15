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
  labels: Pick<PrivateFormLabels, 'departure' | 'departureDate' | 'flight'>
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
