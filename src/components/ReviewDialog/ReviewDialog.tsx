import Image from 'next/image'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { format } from 'date-fns'
import { enUS, es } from 'date-fns/locale'
import { Hotel } from '@prisma/client'

import Button from '@/components/Button'
import Dialog, { DialogContent } from '@/components/Dialog'
import { DialogHeader, DialogTitle } from '../Dialog'
import { toast } from '../Toast'
import { useIsEnglish } from '@/lib/hooks/useIsEnglish'
import { UseFormReturn } from 'react-hook-form'
import { useTranslations } from 'next-intl'

type Props = {
  form: UseFormReturn<any>
  setOpenAccordions: Dispatch<SetStateAction<string[]>>
  hotels: Hotel[]
  isShared?: boolean
}

function ReviewDialog({ form, setOpenAccordions, hotels, isShared }: Props) {
  const [openDialog, setOpenDialog] = useState(false)
  const isEnglish = useIsEnglish()
  const t = useTranslations('form')

  const handleReviewClick = useCallback(async () => {
    await form.trigger()
    if (form.formState.isValid) {
      setOpenDialog(true)
    } else {
      toast({
        title: 'Error',
        description: (
          <p className="mt-2 w-[340px] whitespace-pre-line rounded-md bg-slate-950 p-4 text-red-500">
            {t('errors.form')}
          </p>
        ),
      })
      const errors = Object.keys(form.formState.errors)
      const userError = ['name', 'surname', 'email', 'phone'].reduce(
        (prev, curr) => prev || errors.includes(curr),
        false
      )
      const peopleError = ['adults', 'children', 'infants'].reduce(
        (prev, curr) => prev || errors.includes(curr),
        false
      )
      const flightsError = [
        'arrivalFlight',
        'arrivalDate',
        'departureFlight',
        'departureDate',
      ].reduce((prev, curr) => prev || errors.includes(curr), false)
      const errorAccordions = []
      if (userError) errorAccordions.push('user')
      if (peopleError) errorAccordions.push('people')
      if (flightsError) errorAccordions.push('flights')
      setOpenAccordions(errorAccordions)
    }
  }, [form, setOpenAccordions, t])

  return (
    <div className="mt-10 flex justify-center">
      <Button onClick={handleReviewClick} type="button">
        {t('review')}
      </Button>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('review-order')}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-wrap text-sm text-slate-500">
            <p className="w-1/2 whitespace-pre-line">
              <b className="text-xs uppercase">{t('user')}</b>
              {`\n${form.getValues('name')} ${form.getValues('surname')}\n${form.getValues('email')}\n${form.getValues('phone')}\n\n`}
              <b className="text-xs uppercase">{t('destination')}</b>
              {`\n${form.getValues('type') === 'round-trip' ? t('TripTypeRadio.round-trip') : t(`TripTypeRadio.${form.getValues('type')}`)}`}
              {`\n${hotels.find(h => h.id === Number(form.getValues('hotel')))?.name}\n\n`}
              <b className="text-xs uppercase">{t('people')}</b>
              {`\n${t('PeopleInput.grown-ups')}: ${form.getValues('adults')}.`}
              {form.getValues('children') > 0
                ? `${t('PeopleInput.children')}: ${form.getValues('children')}.`
                : ''}
              {form.getValues('infants') > 0
                ? `${t('PeopleInput.infants')}: ${form.getValues('infants')}`
                : ''}
              {'\n\n'}
            </p>
            <div className="w-1/2">
              <p className="whitespace-pre-line">
                <b className="text-xs uppercase">{t('vehicle')}</b>
                {`\n${isShared ? 'SPRINTER' : form.getValues('vehicle')}`}
              </p>
              <div className="relative mt-10 h-[125px]">
                <Image
                  src={`/img/${isShared ? 'sprinter' : form.getValues('vehicle').toLowerCase()}.png`}
                  alt={isShared ? 'sprinter' : form.getValues('vehicle')}
                  fill
                  className="pointer-events-none object-contain"
                  sizes="(max-width: 1280px) 100vw, 25vw"
                />
              </div>
            </div>
            <p className="w-full whitespace-pre-line">
              <b className="text-xs uppercase">{t('flights')}</b>
              {'\n'}
              {`${
                !!form.getValues('arrivalDate')
                  ? `${t('FlightInput.arrival-flight')}: ${form.getValues('arrivalFlight').toUpperCase()} - ${format(
                      form.getValues('arrivalDate'),
                      'PPP p',
                      {
                        locale: isEnglish ? enUS : es,
                      }
                    )}.\n`
                  : ''
              }`}
              {`${
                !!form.getValues('departureDate')
                  ? `${t('FlightInput.departure-flight')}: ${form.getValues('departureFlight').toUpperCase()} - ${format(
                      form.getValues('departureDate'),
                      'PPP p',
                      {
                        locale: isEnglish ? enUS : es,
                      }
                    )}.\n`
                  : ''
              }`}
              {'\n'}
              {(form.getValues('items').length > 0 ||
                (!isShared &&
                  form.getValues('privateItems') !== 'NOTHING')) && (
                <b className="text-xs uppercase">{t('additionals')}</b>
              )}
              {form.getValues('items').length > 0 &&
                `${form
                  .getValues('items')
                  .reduce(
                    (prev: any, curr: any) =>
                      `${prev}\n${t(`Items.${curr.toLowerCase()}`)}`,
                    ''
                  )}`}
              {!isShared &&
                form.getValues('privateItems') !== 'NOTHING' &&
                `\n${t(`Items.${form.getValues('privateItems').toLowerCase()}`)}`}
            </p>

            <div className=" flex w-full justify-center">
              <Button
                className="mt-5"
                type="submit"
                form="private-form"
                disabled
              >
                {t('continue')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ReviewDialog
