import { useTranslations } from 'next-intl'
import PrivateForm from '@/components/PrivateForm'
import { useMemo } from 'react'
import { PrivateFormLabels } from '../PrivateForm/types'

function PrivatePage() {
  const t = useTranslations('form')
  const labels: PrivateFormLabels = useMemo(
    () => ({
      error: {
        required: t('errors.required'),
        minimumOne: t('errors.minimum', { value: 1 }),
        minimum: t('errors.minimum', { value: 0 }),
        tooManyPeople: t('errors.too-many-people'),
      },
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
      arrivalDate: {
        date: t('DatePicker.arrival-date'),
        pickDate: t('DatePicker.pick-date'),
        hours: t('hours'),
        minutes: t('minutes'),
      },
      arrivalFlight: {
        flight: t('FlightInput.flight'),
      },
      submit: t('continue'),
      destination: t('destination'),
      people: t('people'),
      vehicle: t('vehicle'),
      arrival: t('arrival'),
    }),
    [t]
  )
  return (
    <section className="w-full bg-neutral-50">
      <div className="mx-auto w-full max-w-screen-xl pb-20 pt-10">
        <PrivateForm labels={labels} />
      </div>
    </section>
  )
}

export default PrivatePage
