import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { FormControl, FormItem, FormLabel, FormMessage } from '../ui/form'

export type Props = {
  labels: {
    type1: string
    type2: string
  }
  value: string
  onChange: () => void
}

export const VehicleTypeRadio = ({ labels, value, onChange }: Props) => {
  const { type1, type2 } = labels
  return (
    <FormItem className="mx-auto flex max-w-[300px] flex-col">
      <FormControl>
        <RadioGroup defaultValue={value} onValueChange={onChange}>
          <FormItem className="flex items-center space-x-2">
            <FormControl className="mt-2">
              <RadioGroupItem value="private" id="private" />
            </FormControl>

            <FormLabel htmlFor="private">{type1}</FormLabel>
          </FormItem>

          <FormItem className="flex items-center space-x-2">
            <FormControl className="mt-2">
              <RadioGroupItem value="shared" id="shared" />
            </FormControl>

            <FormLabel htmlFor="shared">{type2}</FormLabel>
          </FormItem>
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}
