import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form'
import Input, { InputProps } from '@/components/Input'

export type Props = {
  labels: {
    label: string
  }
} & InputProps

function NameInput({ labels, value, onChange, onBlur }: Props) {
  return (
    <FormItem>
      <FormLabel className="font-bold">{labels.label}</FormLabel>
      <FormControl>
        <Input value={value} onChange={onChange} onBlur={onBlur} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

export default NameInput
