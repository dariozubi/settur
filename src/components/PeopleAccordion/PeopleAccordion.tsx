import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FormField } from '@/components/ui/form'
import PeopleInput from '@/components/PeopleInput'
import { UseFormReturn } from 'react-hook-form'
import { PrivateFormLabels } from '@/components/PrivateForm/types'

type Props = {
  form: UseFormReturn<any>
  labels: Pick<PrivateFormLabels, 'people' | 'adults' | 'children' | 'infants'>
}
function PeopleAccordion({ labels, form }: Props) {
  return (
    <AccordionItem value="people">
      <AccordionTrigger>{labels.people}</AccordionTrigger>

      <AccordionContent className="flex justify-center border-t py-10">
        <div className="w-[260px]">
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

        <div className="w-[260px]">
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

        <div className="w-[260px]">
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
