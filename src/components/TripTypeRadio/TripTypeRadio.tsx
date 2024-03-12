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

const TripTypeRadio = ({ labels, value, onChange }: Props) => {
  const { type1, type2 } = labels
  return (
    <FormItem className="mx-auto flex max-w-[300px] flex-col items-center justify-center">
      <FormControl>
        <RadioGroup defaultValue={value} onValueChange={onChange}>
          <FormItem className="flex items-center space-x-2">
            <FormControl className="mt-2">
              <RadioGroupItem value="round-trip" id="round-trip" />
            </FormControl>

            <FormLabel htmlFor="round-trip">{type1}</FormLabel>
          </FormItem>

          <FormItem className="flex items-center space-x-2">
            <FormControl className="mt-2">
              <RadioGroupItem value="one-way" id="one-way" />
            </FormControl>

            <FormLabel htmlFor="one-way">{type2}</FormLabel>
          </FormItem>
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

export default TripTypeRadio
