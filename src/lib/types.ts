import type { Props as AdditionalsProps } from '@/components/AdditionalsAccordion'
import type { Props as FlightsProps } from '@/components/FlightsAccordion'
import type { Props as UserProps } from '@/components/UserAccordion'
import type { Props as PeopleProps } from '@/components/PeopleAccordion'
import type { Props as DestinationProps } from '@/components/DestinationAccordion'

export type PageProps = {
  params: { slug: string; locale: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export type Zone =
  | 'zone1'
  | 'zone2'
  | 'zone3'
  | 'zone4'
  | 'zone5'
  | 'zone6'
  | 'zone7'
  | 'zone8'
  | 'zone9'

export type FormErrors = {
  required: string
  minimumOne: string
  minimum: string
  email: string
  phone: string
  tooManyPeople: string
  departureAfterArrival: string
  maximum: string
  invalidFlight: string
}

export type FormLabels = UserProps['labels'] &
  DestinationProps['labels'] &
  PeopleProps['labels'] &
  FlightsProps['labels'] &
  AdditionalsProps['labels'] & {
    submit: string
    error: FormErrors
  }

export type Hotel = {
  id: number
  name: string
  zone: string
}
