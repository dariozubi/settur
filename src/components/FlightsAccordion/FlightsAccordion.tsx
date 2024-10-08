import { UseFormReturn } from 'react-hook-form'

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/Accordion'
import { FormField } from '@/components/Form'
import DatePicker from '@/components/DatePicker'
import FlightInput from '@/components/FlightInput'
import { addDays } from 'date-fns'
import { useTranslations } from 'next-intl'
import { useIsEnglish } from '@/lib/hooks/useIsEnglish'
import { useMemo } from 'react'

export type Props = {
  form: UseFormReturn<any>
}

function FlightsAccordion({ form }: Props) {
  const type = form.watch('type')
  const arrivalDate = form.watch('arrivalDate')
  const t = useTranslations('form')
  const isEnglish = useIsEnglish()
  const labelsArrival = useMemo(
    () => ({
      main: t('DatePicker.arrival-date'),
      pick: t('DatePicker.pick-date'),
      hours: t('DatePicker.hours'),
      minutes: t('DatePicker.minutes'),
    }),
    [t]
  )

  const labelsDeparture = useMemo(
    () => ({
      main: t('DatePicker.departure-date'),
      pick: t('DatePicker.pick-date'),
      hours: t('DatePicker.hours'),
      minutes: t('DatePicker.minutes'),
    }),
    [t]
  )

  return (
    <AccordionItem value="flights">
      <AccordionTrigger>{t('flights')}</AccordionTrigger>

      <AccordionContent className="flex flex-wrap items-center justify-center gap-10 border-t py-10 sm:gap-40">
        {type !== 'airport' && (
          <div className="flex flex-col items-center gap-6">
            <div className="w-[300px]">
              <FormField
                control={form.control}
                name="arrivalDate"
                render={({ field }) => (
                  <DatePicker
                    labels={labelsArrival}
                    isEnglish={isEnglish}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="w-[300px]">
              <FormField
                control={form.control}
                name="arrivalFlight"
                render={({ field }) => (
                  <FlightInput
                    label={t('FlightInput.arrival-flight')}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                )}
              />
            </div>
          </div>
        )}

        {type !== 'hotel' && (
          <div className="flex flex-col items-center gap-6">
            <div className="w-[300px]">
              <FormField
                control={form.control}
                name="departureDate"
                render={({ field }) => (
                  <DatePicker
                    labels={labelsDeparture}
                    isEnglish={isEnglish}
                    value={field.value}
                    onChange={field.onChange}
                    limitDate={
                      arrivalDate && type === 'round-trip'
                        ? addDays(arrivalDate, 1)
                        : undefined
                    }
                  />
                )}
              />
            </div>

            <div className="w-[300px]">
              <FormField
                control={form.control}
                name="departureFlight"
                render={({ field }) => (
                  <FlightInput
                    label={t('FlightInput.departure-flight')}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                )}
              />
            </div>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  )
}

export default FlightsAccordion
