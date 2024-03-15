import type { Props as HotelSelectProps } from '@/components/HotelSelect'
import type { Props as TripTypeProps } from '@/components/TripTypeRadio'
import type { Props as PeopleInputProps } from '@/components/PeopleInput'
import type { Props as DatePickerProps } from '@/components/DatePicker'
import type { Props as FlightInputProps } from '@/components/FlightInput'
import type { Props as NameInputProps } from '@/components/NameInput'

export type PrivateFormLabels = {
  user: string
  name: NameInputProps['labels']
  surname: NameInputProps['labels']
  email: NameInputProps['labels']
  phone: NameInputProps['labels']
  destination: string
  hotel: HotelSelectProps['labels']
  tripType: TripTypeProps['labels']
  people: string
  adults: PeopleInputProps['labels']
  children: PeopleInputProps['labels']
  infants: PeopleInputProps['labels']
  vehicle: string
  arrival: string
  departure: string
  arrivalDate: DatePickerProps['labels']
  departureDate: DatePickerProps['labels']
  flight: FlightInputProps['labels']
  submit: string
  error: {
    required: string
    minimumOne: string
    minimum: string
    email: string
    phone: string
    tooManyPeople: string
  }
}
