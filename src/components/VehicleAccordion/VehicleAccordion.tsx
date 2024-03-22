import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/Accordion'
import { FormField } from '@/components/Form'
import { UseFormReturn } from 'react-hook-form'
import VehiclesRadio from '@/components/VehiclesRadio'
import { FormErrors } from '@/lib/types'
import { useVehicleIndividualsValidation } from './hooks'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Hotel } from '@prisma/client'

export type Props = {
  form: UseFormReturn<any>
  labels: {
    vehicle: string
    error: Pick<FormErrors, 'tooManyPeople'>
  }
}

function VehicleAccordion({ form, labels }: Props) {
  const { isLoading, error, data } = useQuery<{ hotels: Hotel[] }>({
    queryKey: ['hotels'],
    queryFn: async () => axios.get('/api/hotels').then(r => r.data),
  })
  const zone = data?.hotels.find(h => h.id === form.watch('hotel'))?.zone

  const individuals =
    Number(form.watch('adults')) +
    Number(form.watch('children')) +
    Number(form.watch('infants'))

  useVehicleIndividualsValidation({ individuals, form, labels })

  if (!zone || isLoading || error) return null
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
              zone={zone}
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
