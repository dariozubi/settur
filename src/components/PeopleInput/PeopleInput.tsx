import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form'
import Input, { InputProps } from '@/components/Input'

export type Props = {
  labels: {
    label: string
    description?: string
  }
} & InputProps

function PeopleInput({
  labels,
  onChange,
  value,
  onBlur,
  min = 0,
  max = 50,
}: Props) {
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
            onBlur={onBlur}
            min={min}
            max={max}
          />
        </FormControl>
      </div>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  )
}

export default PeopleInput
