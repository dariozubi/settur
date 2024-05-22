import { UseFormReturn } from 'react-hook-form'

import HotelSelect, {
  Props as HotelSelectProps,
} from '@/components/HotelSelect'
import TripTypeRadio from '@/components/TripTypeRadio'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/Accordion'
import { FormField } from '@/components/Form'
import { useTranslations } from 'next-intl'

export type Props = {
  form: UseFormReturn<any>
} & Pick<HotelSelectProps, 'hotels'>

function DestinationAccordion({ form, hotels }: Props) {
  const t = useTranslations('form')

  return (
    <AccordionItem value="destination">
      <AccordionTrigger>{t('destination')}</AccordionTrigger>

      <AccordionContent className="flex flex-wrap items-center justify-center gap-6 border-t py-10">
        <div className="w-[300px]">
          <FormField
            control={form.control}
            name="hotel"
            render={({ field }) => (
              <HotelSelect
                value={field.value}
                onSelect={v => {
                  form.setValue('hotel', v)
                }}
                hotels={hotels}
              />
            )}
          />
        </div>

        <div className="m-w-[300px]">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <TripTypeRadio value={field.value} onChange={field.onChange} />
            )}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

export default DestinationAccordion
