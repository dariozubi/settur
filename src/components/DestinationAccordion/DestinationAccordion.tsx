import HotelSelect from '@/components/HotelSelect'
import TripTypeRadio from '@/components/TripTypeRadio'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FormField } from '../ui/form'
import { UseFormReturn } from 'react-hook-form'
import { PrivateFormLabels } from '../PrivateForm/types'

type Props = {
  form: UseFormReturn<any>
  labels: Pick<PrivateFormLabels, 'destination' | 'tripType' | 'hotel'>
}

function DestinationAccordion({ form, labels }: Props) {
  return (
    <AccordionItem value="destination">
      <AccordionTrigger>{labels.destination}</AccordionTrigger>

      <AccordionContent className="flex items-center justify-center gap-6 border-t py-10">
        <div className="w-[300px]">
          <FormField
            control={form.control}
            name="hotel"
            render={({ field }) => (
              <HotelSelect
                labels={labels.hotel}
                value={field.value}
                onSelect={v => {
                  form.setValue('hotel', v)
                }}
              />
            )}
          />
        </div>

        <div className="m-w-[300px]">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <TripTypeRadio
                labels={labels.tripType}
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

export default DestinationAccordion
