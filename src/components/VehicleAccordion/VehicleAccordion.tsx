import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/Accordion'
import { FormField } from '@/components/Form'
import { UseFormReturn } from 'react-hook-form'
import VehiclesRadio from '@/components/VehiclesRadio'
import { useVehicleIndividualsValidation } from './hooks'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Hotel } from '@prisma/client'
import { useTranslations } from 'next-intl'

export type Props = {
  form: UseFormReturn<any>
}

function VehicleAccordion({ form }: Props) {
  const t = useTranslations('form')
  const { isLoading, error, data } = useQuery<{ hotels: Hotel[] }>({
    queryKey: ['hotels'],
    queryFn: async () => axios.get('/api/hotels').then(r => r.data),
  })
  const zone = data?.hotels.find(h => h.id === form.watch('hotel'))?.zone

  const individuals =
    Number(form.watch('adults')) +
    Number(form.watch('children')) +
    Number(form.watch('infants'))

  useVehicleIndividualsValidation({
    individuals,
    form,
    tooManyPeopleError: t('errors.too-many-people'),
  })

  if (!zone || isLoading || error) return null
  return (
    <AccordionItem value="vehicle">
      <AccordionTrigger>{t('vehicle')}</AccordionTrigger>

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
