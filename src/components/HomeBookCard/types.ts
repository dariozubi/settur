import type { Props as HotelSelectProps } from '@/components/HotelSelect'
import type { Props as VehicleTypeRadioProps } from './VehicleTypeRadio'
import type { Props as PeopleInputProps } from '@/components/PeopleInput'

export type BookFormLabels = {
  error: { required: string; minimum: string; notAvailable: string }
  submit: string
  hotel: HotelSelectProps['labels']
  vehicleType: VehicleTypeRadioProps['labels']
  people: PeopleInputProps['labels']
}
