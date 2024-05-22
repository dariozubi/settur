import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form'
import Input, { InputProps } from '@/components/Input'

export type Props = {
  label: string
  description?: string
} & InputProps

function PeopleInput({
  label,
  description,
  onChange,
  value,
  onBlur,
  min = 0,
  max = 50,
}: Props) {
  return (
    <FormItem className="mx-auto max-w-[300px]">
      <div className="flex flex-col items-center gap-2">
        <FormLabel className="flex items-center justify-start font-bold">
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
        {description && <FormDescription>{description}</FormDescription>}
      </div>
      <FormMessage />
    </FormItem>
  )
}

export default PeopleInput
