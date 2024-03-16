import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form'
import Input from '@/components/Input'

export type Props = {
  labels: {
    flight: string
  }
  onChange: () => void
  value: string
}

function FlightInput({ labels, value, onChange }: Props) {
  return (
    <FormItem>
      <FormLabel className="font-bold">{labels.flight}</FormLabel>
      <FormControl>
        <Input value={value} onChange={onChange} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

export default FlightInput
