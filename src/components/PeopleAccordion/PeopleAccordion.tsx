import { UseFormReturn } from 'react-hook-form'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/Accordion'
import { FormField } from '@/components/Form'
import PeopleInput, {
  type Props as PeopleInputProps,
} from '@/components/PeopleInput'

export type Props = {
  form: UseFormReturn<any>
  labels: {
    people: string
    adults: PeopleInputProps['labels']
    children: PeopleInputProps['labels']
    infants: PeopleInputProps['labels']
  }
}
function PeopleAccordion({ labels, form }: Props) {
  return (
    <AccordionItem value="people">
      <AccordionTrigger>{labels.people}</AccordionTrigger>

      <AccordionContent className="flex justify-center border-t py-10">
        <div className="w-[120px] ">
          <FormField
            control={form.control}
            name="adults"
            render={({ field }) => (
              <PeopleInput
                labels={labels.adults}
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />
        </div>

        <div className="w-[120px]">
          <FormField
            control={form.control}
            name="children"
            render={({ field }) => (
              <PeopleInput
                labels={labels.children}
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />
        </div>

        <div className="w-[120px]">
          <FormField
            control={form.control}
            name="infants"
            render={({ field }) => (
              <PeopleInput
                labels={labels.infants}
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

export default PeopleAccordion
