import RadioGroup, { RadioGroupItem } from '@/components/RadioGroup'
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form'
import { useTranslations } from 'next-intl'

export type Props = {
  value: string
  onChange: () => void
}

const TripTypeRadio = ({ value, onChange }: Props) => {
  const t = useTranslations('form.TripTypeRadio')
  return (
    <FormItem className="mx-auto flex max-w-[300px] flex-col items-center justify-center">
      <FormControl>
        <RadioGroup defaultValue={value} onValueChange={onChange}>
          <FormItem className="flex items-center space-x-2">
            <FormControl className="mt-2">
              <RadioGroupItem value="round-trip" id="round-trip" />
            </FormControl>

            <FormLabel htmlFor="round-trip">{t('round-trip')}</FormLabel>
          </FormItem>

          <FormItem className="flex items-center space-x-2">
            <FormControl className="mt-2">
              <RadioGroupItem value="hotel" id="hotel" />
            </FormControl>

            <FormLabel htmlFor="hotel">{t('hotel')}</FormLabel>
          </FormItem>

          <FormItem className="flex items-center space-x-2">
            <FormControl className="mt-2">
              <RadioGroupItem value="airport" id="airport" />
            </FormControl>

            <FormLabel htmlFor="airport">{t('airport')}</FormLabel>
          </FormItem>
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

export default TripTypeRadio
