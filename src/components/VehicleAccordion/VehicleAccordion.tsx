import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/Accordion'
import { FormField } from '@/components/Form'
import { UseFormReturn } from 'react-hook-form'
import VehiclesRadio from '@/components/VehiclesRadio'
import { useVehicleIndividualsValidation } from './hooks'
import { Hotel, Rate } from '@prisma/client'
import { useTranslations } from 'next-intl'

export type Props = {
  form: UseFormReturn<any>
  hotels: Hotel[]
  rates: Rate[]
}

function VehicleAccordion({ form, hotels, rates }: Props) {
  const t = useTranslations('form')
  const zone = hotels.find(h => h.id === form.watch('hotel'))?.zone

  const individuals =
    Number(form.watch('adults')) +
    Number(form.watch('children')) +
    Number(form.watch('infants'))

  useVehicleIndividualsValidation({
    individuals,
    form,
    tooManyPeopleError: t('errors.too-many-people'),
  })

  if (!zone) return null
  return (
    <AccordionItem value="vehicle">
      <AccordionTrigger>{t('vehicle')}</AccordionTrigger>

      <AccordionContent className="space-y-6 border-t py-2 sm:py-10">
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
              rates={rates}
            />
          )}
        />
      </AccordionContent>
    </AccordionItem>
  )
}

export default VehicleAccordion
