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

export const VehicleTypeRadio = ({ value, onChange }: Props) => {
  const t = useTranslations('form.VehicleTypeRadio')
  const type1 = t('private')
  const type2 = t('shared')
  return (
    <FormItem className="mx-auto flex max-w-[300px] flex-col">
      <FormControl>
        <RadioGroup defaultValue={value} onValueChange={onChange}>
          <FormItem className="flex items-center space-x-2">
            <FormControl className="mt-2">
              <RadioGroupItem value="private" id="private" />
            </FormControl>

            <FormLabel htmlFor="private">{type1}</FormLabel>
          </FormItem>

          <FormItem className="flex items-center space-x-2">
            <FormControl className="mt-2">
              <RadioGroupItem value="shared" id="shared" />
            </FormControl>

            <FormLabel htmlFor="shared">{type2}</FormLabel>
          </FormItem>
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}
