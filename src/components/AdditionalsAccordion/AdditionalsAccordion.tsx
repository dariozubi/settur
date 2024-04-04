import { UseFormReturn } from 'react-hook-form'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/Accordion'
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/Form'
import ItemCheckbox from '@/components/ItemCheckbox'
import { vehicleTypes } from '@/lib/consts'
import PrivateAdditionalsRadio from '../PrivateAdditionalsRadio'
import { useTranslations } from 'next-intl'

export type Props = {
  form: UseFormReturn<any>
  type: (typeof vehicleTypes)[number]
}

function AdditionalsAccordion({ form, type }: Props) {
  const t = useTranslations('form')
  const items =
    type === 'private'
      ? [
          {
            id: 'WHEELCHAIR',
            label: t('Items.wheelchair'),
          },
          {
            id: 'CARSEAT',
            label: `${t('Items.carseat')} (+5 USD)`,
          },
          {
            id: 'BOOSTERSEAT',
            label: `${t('Items.boosterseat')} (+3 USD)`,
          },
          {
            id: 'SHOPPING',
            label: `${t('Items.shopping')} (+25 USD)`,
          },
        ]
      : [
          {
            id: 'CARSEAT',
            label: `${t('Items.carSeat')} (+5 USD)`,
          },
          {
            id: 'BOOSTERSEAT',
            label: `${t('Items.boosterSeat')} (+3 USD)`,
          },
        ]
  return (
    <AccordionItem value="additionals">
      <AccordionTrigger>{t('additionals')}</AccordionTrigger>

      <AccordionContent className="flex flex-col items-center justify-center border-t py-10">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem className="w-full space-y-6">
              <div className="mb-4">
                <FormLabel className="text-base">{t('extras')}</FormLabel>
              </div>
              <div className="flex flex-wrap">
                {items.map(item => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="items"
                    render={({ field }) => (
                      <ItemCheckbox
                        value={field.value}
                        onChange={field.onChange}
                        id={item.id}
                        label={`${item.label}`}
                        className="w-1/2 py-4"
                      />
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {type === 'private' && (
          <FormField
            control={form.control}
            name="privateItems"
            render={({ field }) => (
              <PrivateAdditionalsRadio
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        )}
      </AccordionContent>
    </AccordionItem>
  )
}

export default AdditionalsAccordion
