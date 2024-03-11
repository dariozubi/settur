import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '../ui/input'

export type Props = {
  labels: {
    adultsNumber: string
  }
  onChange: () => void
  value: number
}

export const PeopleInput = ({ labels, onChange, value }: Props) => {
  const { adultsNumber } = labels
  return (
    <FormItem className="mx-auto max-w-[300px]">
      <div className="flex gap-2">
        <FormLabel className="flex items-center text-lg font-bold">
          {adultsNumber}:
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
