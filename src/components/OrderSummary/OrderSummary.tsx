import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { format } from 'date-fns'
import { enUS, es } from 'date-fns/locale'

type Props = {
  name: string
  surname: string
  email: string
  phone: string
  type: string
  hotel: string
  adults: number
  childs: number
  infants: number
  vehicle: string
  arrivalDate?: Date
  arrivalFlight?: string
  departureDate?: Date
  departureFlight?: string
  items: string[]
  isEnglish: boolean
}

function OrderSummary({
  name,
  surname,
  email,
  phone,
  type,
  hotel,
  adults,
  childs,
  infants,
  vehicle,
  arrivalDate,
  arrivalFlight,
  departureDate,
  departureFlight,
  items,
  isEnglish,
}: Props) {
  const t = useTranslations('form')
  return (
    <div className="flex flex-wrap text-xs">
      <p className="w-1/2 whitespace-pre-line">
        <b className="uppercase">{t('user')}</b>
        {`\n${name} ${surname}\n${email}\n${phone}\n\n`}
        <b className="uppercase">{t('destination')}</b>
        {`\n${t(`TripTypeRadio.${type}`)}`}
        {`\n${hotel}\n\n`}
        <b className="uppercase">{t('people')}</b>
        {`\n${adults} ${t(`PeopleInput.grown-up${adults > 1 ? 's' : ''}`).toLowerCase()}`}
        {childs > 0
          ? `${infants > 0 ? ',' : ` ${t('and')}`} ${childs} ${t(`PeopleInput.child${childs > 1 ? 'ren' : ''}`).toLowerCase()}`
          : ''}
        {infants > 0
          ? ` ${isEnglish ? 'and' : 'y'} ${infants} ${t(`PeopleInput.infant${infants > 1 ? 's' : ''}`).toLowerCase()}`
          : ''}
        {'\n\n'}
      </p>
      <div className="w-1/2">
        <p className="whitespace-pre-line">
          <b className="uppercase">{t('vehicle')}</b>
          {`\n${vehicle}`}
        </p>
        <div className="relative mt-10 h-[125px]">
          <Image
            src={`/img/${vehicle.toLowerCase()}.png`}
            alt={vehicle}
            fill
            className="pointer-events-none object-contain"
            sizes="(max-width: 1280px) 33vw, 50vw"
          />
        </div>
      </div>
      <p className="w-full whitespace-pre-line">
        <b className="uppercase">{t('flights')}</b>
        {'\n'}
        {`${
          !!arrivalDate &&
          !!arrivalFlight &&
          (type === 'round-trip' || type === 'hotel')
            ? `${t('FlightInput.arrival-flight')}: ${arrivalFlight.toUpperCase()} - ${format(
                arrivalDate,
                'PPP p',
                {
                  locale: isEnglish ? enUS : es,
                }
              )}.\n`
            : ''
        }`}
        {`${
          !!departureDate &&
          !!departureFlight &&
          (type === 'round-trip' || type === 'airport')
            ? `${t('FlightInput.departure-flight')}: ${departureFlight.toUpperCase()} - ${format(
                departureDate,
                'PPP p',
                {
                  locale: isEnglish ? enUS : es,
                }
              )}.\n`
            : ''
        }`}
        {'\n'}
        {items.length > 0 && <b className="uppercase">{t('additionals')}</b>}
        {items.length > 0 &&
          `${items.reduce(
            (prev: any, curr: any) =>
              `${prev}\n${t(`Items.${curr.toLowerCase()}`)}`,
            ''
          )}`}
      </p>
    </div>
  )
}

export default OrderSummary
