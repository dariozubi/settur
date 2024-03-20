import RadioGroup, { RadioGroupItem } from '@/components/RadioGroup'
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form'

export type Props = {
  labels: {
    petBox: string
    kayak: string
    bicycle: string
    surfTable: string
    nothing: string
  }
  value: string
  onChange: () => void
}

const PrivateAdditionalsRadio = ({ labels, value, onChange }: Props) => {
  const additionals: { id: string; label: string }[] = [
    { id: 'petBox', label: `${labels.petBox} (+5 USD)` },
    { id: 'kayak', label: `${labels.kayak} (+5 USD)` },
    {
      id: 'bicycle',
      label: `${labels.bicycle} (+5 USD)`,
    },
    {
      id: 'surfTable',
      label: `${labels.surfTable} (+5 USD)`,
    },
    {
      id: 'nothing',
      label: labels.nothing,
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
