import { UseFormReturn } from 'react-hook-form'
import { useTranslations } from 'next-intl'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/Accordion'
import { FormField } from '@/components/Form'
import PeopleInput from '@/components/PeopleInput'

export type Props = {
  form: UseFormReturn<any>
}
function PeopleAccordion({ form }: Props) {
  const t = useTranslations('form')
  return (
    <AccordionItem value="people">
      <AccordionTrigger>{t('people')}</AccordionTrigger>

      <AccordionContent className="flex flex-wrap justify-center border-t py-10">
        <div className="w-[120px]">
          <FormField
            control={form.control}
            name="adults"
            render={({ field }) => (
              <PeopleInput
                label={t('PeopleInput.grown-ups')}
                description={t('PeopleInput.grown-ups-description')}
                onChange={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
                min={1}
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
                label={t('PeopleInput.children')}
                description={t('PeopleInput.children-description')}
                onChange={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
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
                label={t('PeopleInput.infants')}
                description={t('PeopleInput.infants-description')}
                onChange={field.onChange}
                value={field.value}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

export default PeopleAccordion
