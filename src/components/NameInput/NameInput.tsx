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

function NameInput({ label, value, onChange, onBlur, className }: Props) {
  return (
    <FormItem>
      <FormLabel className="font-bold">{label}</FormLabel>
      <FormControl>
        <Input
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={className}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

export default NameInput
