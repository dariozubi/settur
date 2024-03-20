import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { FormLabels } from '../types'

export function useFormLabels() {
  const t = useTranslations('form')
  const labels: FormLabels = useMemo(
    () => ({
      user: t('user'),
      name: {
        label: t('NameInput.name'),
      },
      surname: {
        label: t('NameInput.surname'),
      },
      email: {
        label: t('NameInput.email'),
      },
      phone: {
        label: t('NameInput.phone'),
      },
      destination: t('destination'),
      hotel: {
        selectHotel: t('HotelSelect.select-hotel'),
        searchHotel: t('HotelSelect.search-hotel'),
        noResults: t('HotelSelect.no-results'),
      },
      tripType: {
        round: t('TripTypeRadio.round-trip'),
        airport: t('TripTypeRadio.airport'),
        hotel: t('TripTypeRadio.hotel'),
      },
      people: t('people'),
      adults: {
        label: t('PeopleInput.grown-ups'),
        description: t('PeopleInput.grown-ups-description'),
      },
      children: {
        label: t('PeopleInput.children'),
        description: t('PeopleInput.children-description'),
      },
      infants: {
        label: t('PeopleInput.infants'),
        description: t('PeopleInput.infants-description'),
      },
      flights: t('flights'),
      arrivalDate: {
        date: t('DatePicker.arrival-date'),
        pickDate: t('DatePicker.pick-date'),
        hours: t('DatePicker.hours'),
        minutes: t('DatePicker.minutes'),
      },
      departureDate: {
        date: t('DatePicker.departure-date'),
        pickDate: t('DatePicker.pick-date'),
        hours: t('DatePicker.hours'),
        minutes: t('DatePicker.minutes'),
      },
      arrivalFlight: {
        flight: t('FlightInput.arrival-flight'),
      },
      departureFlight: {
        flight: t('FlightInput.departure-flight'),
      },
      additionals: t('additionals'),
      extras: t('extras'),
      additionalItems: {
        shopping: t('Items.shopping'),
        carSeat: t('Items.car-seat'),
        boosterSeat: t('Items.booster-seat'),
        wheelchair: t('Items.wheelchair'),
        kayak: t('Items.kayak'),
        bicycle: t('Items.bicycle'),
        surfTable: t('Items.surf-table'),
        petBox: t('Items.pet-box'),
      },
      submit: t('continue'),
      error: {
        required: t('errors.required'),
        minimumOne: t('errors.minimum', { value: 1 }),
        minimum: t('errors.minimum', { value: 0 }),
        maximum: t('errors.maximum', { value: 50 }),
        email: t('errors.email'),
        phone: t('errors.phone'),
        tooManyPeople: t('errors.too-many-people'),
        departureAfterArrival: t('errors.departure-after-arrival'),
      },
    }),
    [t]
  )

  return labels
}
