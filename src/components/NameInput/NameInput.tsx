import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form'
import Input from '@/components/Input'

export type Props = {
  labels: {
    label: string
  }
  onChange: () => void
  value: string
}

function NameInput({ labels, value, onChange }: Props) {
  return (
    <FormItem>
      <FormLabel className="font-bold">{labels.label}</FormLabel>
      <FormControl>
        <Input value={value} onChange={onChange} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

export default NameInput
