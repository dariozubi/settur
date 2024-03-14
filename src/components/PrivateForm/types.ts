import type { Props as HotelSelectProps } from '@/components/HotelSelect'
import type { Props as TripTypeProps } from '@/components/TripTypeRadio'
import type { Props as PeopleInputProps } from '@/components/PeopleInput'
import { Vehicle } from '../VehiclesRadio'

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
  destination: string
  people: string
  vehicle: string
  submit: string
}

export type ErrorLabels = {
  required: string
  minimum: string
  minimumOne: string
}

export type PrivateForm = {
  hotel: string
  type: 'round-trip' | 'one-way'
  adults: number
  children: number
  infants: number
  vehicle: Vehicle
}
