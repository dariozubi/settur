import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/Accordion'
import { FormField } from '../ui/form'
import { UseFormReturn } from 'react-hook-form'
import NameInput, { type Props as NameInputProps } from '../NameInput'

export type Props = {
  form: UseFormReturn<any>
  labels: {
    user: string
    name: NameInputProps['labels']
    surname: NameInputProps['labels']
    email: NameInputProps['labels']
    phone: NameInputProps['labels']
  }
}

function UserAccordion({ form, labels }: Props) {
  return (
    <AccordionItem value="user">
      <AccordionTrigger>{labels.user}</AccordionTrigger>

      <AccordionContent className="flex flex-col items-center justify-center gap-6 border-t py-10">
        <div className="flex items-center justify-center gap-6">
          <div className="w-[300px]">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <NameInput
                  labels={labels.name}
                  value={field.value}
                  onChange={field.onChange}
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
                  labels={labels.surname}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-6">
          <div className="w-[300px]">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <NameInput
                  labels={labels.email}
                  value={field.value}
                  onChange={field.onChange}
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
                  labels={labels.phone}
                  value={field.value}
                  onChange={field.onChange}
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
