import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FormField } from '../ui/form'
import { UseFormReturn } from 'react-hook-form'
import VehiclesRadio from '../VehiclesRadio'
import { hotels } from '@/lib/consts'
import { FormErrors, Zone } from '@/lib/types'
import { useVehicleIndividualsValidation } from './hooks'

export type Props = {
  form: UseFormReturn<any>
  labels: {
    vehicle: string
    error: Pick<FormErrors, 'tooManyPeople'>
  }
}

function VehicleAccordion({ form, labels }: Props) {
  const zone = hotels.find(h => h.label === form.watch('hotel'))?.zone
  const individuals =
    Number(form.watch('adults')) +
    Number(form.watch('children')) +
    Number(form.watch('infants'))

  useVehicleIndividualsValidation({ individuals, form, labels })

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
