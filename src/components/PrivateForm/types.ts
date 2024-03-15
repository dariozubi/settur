import type { Props as AdditionalsProps } from '@/components/AdditionalsAccordion'
import type { Props as ArrivalProps } from '@/components/ArrivalAccordion'
import type { Props as DepartureProps } from '@/components/DepartureAccordion'
import type { Props as UserProps } from '@/components/UserAccordion'
import type { Props as PeopleProps } from '@/components/PeopleAccordion'
import type { Props as DestinationProps } from '@/components/DestinationAccordion'
import type { Props as VehicleProps } from '@/components/VehicleAccordion'
import { FormErrors } from '@/lib/types'

export type PrivateFormLabels = UserProps['labels'] &
  DestinationProps['labels'] &
  PeopleProps['labels'] &
  ArrivalProps['labels'] &
  DepartureProps['labels'] &
  VehicleProps['labels'] &
  AdditionalsProps['labels'] & {
    submit: string
    error: FormErrors
  }
