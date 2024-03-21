import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form'
import Input, { InputProps } from '@/components/Input'

export type Props = {
  labels: {
    flight: string
  }
} & InputProps

function FlightInput({ labels, value, onChange, onBlur }: Props) {
  return (
    <FormItem>
      <FormLabel className="font-bold">{labels.flight}</FormLabel>
      <FormControl>
        <Input
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="uppercase"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

export default FlightInput
