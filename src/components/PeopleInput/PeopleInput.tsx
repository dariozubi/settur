import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form'
import Input from '@/components/Input'

export type Props = {
  labels: {
    label: string
    description?: string
  }
  onChange: () => void
  value: number
}

function PeopleInput({ labels, onChange, value }: Props) {
  const { label, description } = labels
  return (
    <FormItem className="mx-auto max-w-[300px]">
      <div className="flex flex-col gap-2">
        <FormLabel className="flex w-[180px] items-center justify-start font-bold">
          {label}
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
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  )
}

export default PeopleInput
