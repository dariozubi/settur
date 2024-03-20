import { UseFormReturn } from 'react-hook-form'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/Accordion'
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/Form'
import ItemCheckbox from '@/components/ItemCheckbox'
import { vehicleTypes } from '@/lib/consts'

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
  kayak: string
  bicycle: string
  surfTable: string
  petBox: string
}

function AdditionalsAccordion({ form, labels, type }: Props) {
  const items =
    type === 'private'
      ? [
          {
            id: 'weelchair',
            label: labels.additionalItems.wheelchair,
          },
          {
            id: 'carSeat',
            label: `${labels.additionalItems.carSeat} (+5 USD)`,
          },
          {
            id: 'boosterSeat',
            label: `${labels.additionalItems.boosterSeat} (+3 USD)`,
          },
          { id: 'petBox', label: `${labels.additionalItems.petBox} (+5 USD)` },
          { id: 'kayak', label: `${labels.additionalItems.kayak} (+5 USD)` },
          {
            id: 'bicycle',
            label: `${labels.additionalItems.bicycle} (+5 USD)`,
          },
          {
            id: 'surfTable',
            label: `${labels.additionalItems.surfTable} (+5 USD)`,
          },

          {
            id: 'shopping',
            label: `${labels.additionalItems.shopping} (+25 USD)`,
          },
        ]
      : [
          {
            id: 'carSeat',
            label: `${labels.additionalItems.carSeat} (+5 USD)`,
          },
          {
            id: 'boosterSeat',
            label: `${labels.additionalItems.boosterSeat} (+3 USD)`,
          },
        ]
  return (
    <AccordionItem value="additionals">
      <AccordionTrigger>{labels.additionals}</AccordionTrigger>

      <AccordionContent className="flex flex-col items-center justify-center gap-6 border-t py-10">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem className="space-y-6">
              <div className="mb-4">
                <FormLabel className="text-base">{labels.extras}</FormLabel>
              </div>
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
                    />
                  )}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
      </AccordionContent>
    </AccordionItem>
  )
}

export default AdditionalsAccordion
