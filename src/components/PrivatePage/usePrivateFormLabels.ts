import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { PrivateFormLabels } from '../PrivateForm/types'

export function usePrivateFormLabels() {
  const t = useTranslations('form')
  const labels: PrivateFormLabels = useMemo(
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
      vehicle: t('vehicle'),
      arrival: t('arrival'),
      departure: t('departure'),
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
      flight: {
        flight: t('FlightInput.flight'),
      },
      additionals: t('additionals'),
      extras: t('extras'),
      additionalItems: {
        shopping: t('Items.shopping'),
        carSeat: t('Items.carSeat'),
        boosterSeat: t('Items.boosterSeat'),
        wheelchair: t('Items.wheelchair'),
        kayak: t('Items.kayak'),
        bicycle: t('Items.bicycle'),
        surfTable: t('Items.surfTable'),
      },
      submit: t('continue'),
      error: {
        required: t('errors.required'),
        minimumOne: t('errors.minimum', { value: 1 }),
        minimum: t('errors.minimum', { value: 0 }),
        email: t('errors.email'),
        phone: t('errors.phone'),
        tooManyPeople: t('errors.too-many-people'),
      },
    }),
    [t]
  )

  return labels
}
