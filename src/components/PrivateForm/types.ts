import type { Props as HotelSelectProps } from '@/components/HotelSelect'
import type { Props as TripTypeProps } from '@/components/TripTypeRadio'
import type { Props as PeopleInputProps } from '@/components/PeopleInput'

export type PrivateFormLabels = {
  error: {
    required: string
    minimumOne: string
    minimum: string
  }
  hotel: HotelSelectProps['labels']
  tripType: TripTypeProps['labels']
  adults: PeopleInputProps['labels']
  children: PeopleInputProps['labels']
  infants: PeopleInputProps['labels']
  destination: string
  people: string
  vehicle: string
  submit: string
}
