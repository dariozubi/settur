import type { Props as HotelSelectProps } from '@/components/HotelSelect'
import type { Props as TripTypeProps } from '@/components/TripTypeRadio'
import type { Props as PeopleInputProps } from '@/components/PeopleInput'
import type { Props as DatePickerProps } from '@/components/DatePicker'
import type { Props as FlightInputProps } from '@/components/FlightInput'

export type PrivateFormLabels = {
  error: {
    required: string
    minimumOne: string
    minimum: string
    tooManyPeople: string
  }
  hotel: HotelSelectProps['labels']
  tripType: TripTypeProps['labels']
  adults: PeopleInputProps['labels']
  children: PeopleInputProps['labels']
  infants: PeopleInputProps['labels']
  arrivalDate: DatePickerProps['labels']
  arrivalFlight: FlightInputProps['labels']
  destination: string
  people: string
  vehicle: string
  arrival: string
  submit: string
}
