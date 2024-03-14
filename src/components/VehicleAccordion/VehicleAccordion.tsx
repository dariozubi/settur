import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FormField } from '../ui/form'
import { UseFormReturn } from 'react-hook-form'
import { PrivateFormLabels } from '../PrivateForm/types'
import { PrivateForm } from '../PrivateForm/hooks'
import VehiclesRadio from '../VehiclesRadio'
import { hotels } from '@/lib/consts'
import { Zone } from '@/lib/types'

type Props = {
  form: UseFormReturn<PrivateForm>
  labels: Pick<PrivateFormLabels, 'vehicle'>
}

function VehicleAccordion({ form, labels }: Props) {
  const zone = hotels.find(h => h.label === form.watch('hotel'))?.zone
  const individuals =
    Number(form.watch('adults')) +
    Number(form.watch('children')) +
    Number(form.watch('infants'))
  if (!zone) return null
  return (
    <AccordionItem value="vehicle">
      <AccordionTrigger>{labels.vehicle}</AccordionTrigger>

      <AccordionContent className="space-y-6 border-t py-10">
        <FormField
          control={form.control}
          name="vehicle"
          render={({ field }) => (
            <VehiclesRadio
              value={field.value}
              onChange={field.onChange}
              zone={`zone${zone}` as Zone}
              tripType={form.watch('type')}
              individuals={individuals}
            />
          )}
        />
      </AccordionContent>
    </AccordionItem>
  )
}

export default VehicleAccordion
