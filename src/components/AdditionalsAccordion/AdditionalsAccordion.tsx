import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { UseFormReturn } from 'react-hook-form'
import ItemCheckbox from '../ItemCheckbox'

export type Props = {
  form: UseFormReturn<any>
  labels: {
    additionals: string
    extras: string
    additionalItems: Items
  }
}

type Items = {
  shopping: string
  carSeat: string
  boosterSeat: string
  wheelchair: string
  kayak: string
  bicycle: string
  surfTable: string
}

function AdditionalsAccordion({ form, labels }: Props) {
  const items = [
    { id: 'shopping', label: labels.additionalItems.shopping },
    { id: 'carSeat', label: labels.additionalItems.carSeat },
    { id: 'boosterSeat', label: labels.additionalItems.boosterSeat },
    { id: 'weelchair', label: labels.additionalItems.wheelchair },
    { id: 'kayak', label: labels.additionalItems.kayak },
    { id: 'bicycle', label: labels.additionalItems.bicycle },
    { id: 'surfTable', label: labels.additionalItems.surfTable },
  ]
  return (
    <AccordionItem value="user">
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
                      label={item.label}
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
