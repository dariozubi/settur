import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FormField } from '../ui/form'
import { UseFormReturn } from 'react-hook-form'
import { PrivateFormLabels } from '../PrivateForm/types'
import { PrivateFormType } from '../PrivateForm/hooks'
import VehiclesRadio from '../VehiclesRadio'

type Props = {
  form: UseFormReturn<PrivateFormType>
  labels: Pick<PrivateFormLabels, 'vehicle'>
}

function VehicleAccordion({ form, labels }: Props) {
  return (
    <AccordionItem value="vehicle">
      <AccordionTrigger>{labels.vehicle}</AccordionTrigger>

      <AccordionContent className="space-y-6 border-t py-10">
        <FormField
          control={form.control}
          name="vehicle"
          render={({ field }) => (
            <VehiclesRadio value={field.value} onChange={field.onChange} />
          )}
        />
      </AccordionContent>
    </AccordionItem>
  )
}

export default VehicleAccordion
