import { UseFormReturn } from 'react-hook-form'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/Accordion'
import { FormField } from '@/components/Form'
import NameInput from '@/components/NameInput'
import { useTranslations } from 'next-intl'

export type Props = {
  form: UseFormReturn<any>
}

function UserAccordion({ form }: Props) {
  const t = useTranslations('form')
  return (
    <AccordionItem value="user">
      <AccordionTrigger>{t('user')}</AccordionTrigger>

      <AccordionContent className="flex flex-col items-center justify-center gap-6 border-t py-10">
        <div className="flex flex-wrap items-center justify-center gap-6">
          <div className="w-[300px]">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <NameInput
                  label={t('NameInput.name')}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              )}
            />
          </div>

          <div className="w-[300px]">
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <NameInput
                  label={t('NameInput.surname')}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              )}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          <div className="w-[300px]">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <NameInput
                  label={t('NameInput.email')}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              )}
            />
          </div>

          <div className="w-[300px]">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <NameInput
                  label={t('NameInput.phone')}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              )}
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

export default UserAccordion
