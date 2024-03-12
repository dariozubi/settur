import { useTranslations } from 'next-intl'
import PrivateForm from '../PrivateForm'
import { useMemo } from 'react'

function PrivatePage() {
  const t = useTranslations('Home')
  const labels = useMemo(
    () => ({
      requiredHotelError: t('required-hotel-error'),
      requiredTypeError: t('required-type-error'),
      submit: t('continue'),
      destination: t('destination'),
      hotelLabels: {
        selectHotel: t('select-hotel'),
        searchHotel: t('search-hotel'),
        noResults: t('no-results'),
      },
      typeLabels: {
        type1: t('round-trip'),
        type2: t('one-way'),
      },
    }),
    [t]
  )
  return (
    <section className="w-full bg-neutral-50">
      <div className="mx-auto w-full max-w-screen-xl py-20">
        <PrivateForm labels={labels} />
      </div>
    </section>
  )
}

export default PrivatePage
