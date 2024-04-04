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

const PrivateAdditionalsRadio = ({ value, onChange }: Props) => {
  const t = useTranslations('form.Items')
  const additionals: { id: string; label: string }[] = [
    { id: 'PETBOX', label: `${t('petbox')} (+5 USD)` },
    { id: 'KAYAK', label: `${t('kayak')} (+5 USD)` },
    {
      id: 'BICYCLE',
      label: `${t('bicycle')} (+5 USD)`,
    },
    {
      id: 'SURFTABLE',
      label: `${t('surftable')} (+5 USD)`,
    },
    {
      id: 'NOTHING',
      label: t('nothing'),
    },
  ]
  return (
    <FormItem className="w-full">
      <FormControl>
        <RadioGroup
          unselectable="on"
          value={value}
          onValueChange={onChange}
          className="flex w-full flex-wrap gap-0"
        >
          {additionals.map(({ id, label }) => (
            <FormItem key={id} className="flex w-1/2 items-center py-2">
              <FormControl className="mt-2">
                <RadioGroupItem value={id} id={id} />
              </FormControl>

              <FormLabel htmlFor={id} className="ml-2">
                {label}
              </FormLabel>
            </FormItem>
          ))}
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

export default PrivateAdditionalsRadio
