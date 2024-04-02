import { UseFormReturn } from 'react-hook-form'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/Accordion'
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/Form'
import ItemCheckbox from '@/components/ItemCheckbox'
import { vehicleTypes } from '@/lib/consts'
import PrivateAdditionalsRadio, {
  Props as PrivateAdditonalsRadioProps,
} from '../PrivateAdditionalsRadio'

export type Props = {
  form: UseFormReturn<any>
  labels: {
    additionals: string
    extras: string
    additionalItems: Items
  }
  type: (typeof vehicleTypes)[number]
}

type Items = {
  shopping: string
  carSeat: string
  boosterSeat: string
  wheelchair: string
} & PrivateAdditonalsRadioProps['labels']

function AdditionalsAccordion({ form, labels, type }: Props) {
  const items =
    type === 'private'
      ? [
          {
            id: 'WHEELCHAIR',
            label: labels.additionalItems.wheelchair,
          },
          {
            id: 'CARSEAT',
            label: `${labels.additionalItems.carSeat} (+5 USD)`,
          },
          {
            id: 'BOOSTERSEAT',
            label: `${labels.additionalItems.boosterSeat} (+3 USD)`,
          },
          {
            id: 'SHOPPING',
            label: `${labels.additionalItems.shopping} (+25 USD)`,
          },
        ]
      : [
          {
            id: 'CARSEAT',
            label: `${labels.additionalItems.carSeat} (+5 USD)`,
          },
          {
            id: 'BOOSTERSEAT',
            label: `${labels.additionalItems.boosterSeat} (+3 USD)`,
          },
        ]
  return (
    <AccordionItem value="additionals">
      <AccordionTrigger>{labels.additionals}</AccordionTrigger>

      <AccordionContent className="flex flex-col items-center justify-center border-t py-10">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem className="w-full space-y-6">
              <div className="mb-4">
                <FormLabel className="text-base">{labels.extras}</FormLabel>
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
                labels={labels.additionalItems}
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
