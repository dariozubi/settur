import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '../ui/input'

export type Props = {
  labels: {
    label: string
  }
  onChange: () => void
  value: number
}

function PeopleInput({ labels, onChange, value }: Props) {
  const { label } = labels
  return (
    <FormItem className="mx-auto max-w-[300px]">
      <div className="flex gap-2">
        <FormLabel className="flex w-[180px] items-center justify-end text-lg font-bold">
          {label}:
        </FormLabel>
        <FormControl>
          <Input
            className="max-w-[70px]"
            type="number"
            value={value}
            onChange={onChange}
          />
        </FormControl>
      </div>
      <FormMessage />
    </FormItem>
  )
}

export default PeopleInput
