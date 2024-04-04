import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form'
import Input, { InputProps } from '@/components/Input'

export type Props = {
  label: string
} & InputProps

function FlightInput({ label, value, onChange, onBlur }: Props) {
  return (
    <FormItem>
      <FormLabel className="font-bold">{label}</FormLabel>
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
