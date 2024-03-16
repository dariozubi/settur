import RadioGroup, { RadioGroupItem } from '@/components/RadioGroup'
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form'

export type Props = {
  labels: {
    round: string
    airport: string
    hotel: string
  }
  value: string
  onChange: () => void
}

const TripTypeRadio = ({ labels, value, onChange }: Props) => {
  return (
    <FormItem className="mx-auto flex max-w-[300px] flex-col items-center justify-center">
      <FormControl>
        <RadioGroup defaultValue={value} onValueChange={onChange}>
          <FormItem className="flex items-center space-x-2">
            <FormControl className="mt-2">
              <RadioGroupItem value="round-trip" id="round-trip" />
            </FormControl>

            <FormLabel htmlFor="round-trip">{labels.round}</FormLabel>
          </FormItem>

          <FormItem className="flex items-center space-x-2">
            <FormControl className="mt-2">
              <RadioGroupItem value="hotel" id="hotel" />
            </FormControl>

            <FormLabel htmlFor="hotel">{labels.hotel}</FormLabel>
          </FormItem>

          <FormItem className="flex items-center space-x-2">
            <FormControl className="mt-2">
              <RadioGroupItem value="airport" id="airport" />
            </FormControl>

            <FormLabel htmlFor="airport">{labels.airport}</FormLabel>
          </FormItem>
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}

export default TripTypeRadio
