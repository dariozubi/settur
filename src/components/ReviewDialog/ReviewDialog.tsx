import Image from 'next/image'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { format } from 'date-fns'
import { enUS, es } from 'date-fns/locale'
import { Additional, Hotel, Rate } from '@prisma/client'

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
  rates: Rate[]
  onFullPay: (_data: { [x: string]: any; type?: any }) => Promise<void>
  onReserve: (_data: { [x: string]: any; type?: any }) => Promise<void>
  isShared?: boolean
}

function ReviewDialog({
  form,
  setOpenAccordions,
  hotels,
  isShared,
  rates,
  onFullPay,
  onReserve,
}: Props) {
  const [openDialog, setOpenDialog] = useState(false)
  const isEnglish = useIsEnglish()
  const t = useTranslations('form')
  const zone = hotels.find(h => h.id === form.getValues('hotel'))?.zone
  const vehicle = isShared ? 'SPRINTER' : form.getValues('vehicle')
  const hasItems = form.getValues('items').length > 0
  const hasPrivateItem =
    !isShared && form.getValues('privateItems') !== 'NOTHING'

  const vehiclePrice =
    Number(
      rates.find(
        r =>
          r.zone === zone &&
          r.trip ===
            (form.getValues('type') === 'round-trip' ? 'ROUND' : 'ONEWAY') &&
          r.vehicle === (isShared ? 'SHARED' : form.getValues('vehicle'))
      )?.value
    ) *
    (isShared
      ? Number(form.getValues('adults')) + Number(form.getValues('children'))
      : 1)
  const itemsPrice = hasItems
    ? form.getValues('items').reduce((prev: number, curr: Additional) => {
        const value =
          curr !== 'WHEELCHAIR'
            ? Number(rates.find(r => r.additionalId === curr)?.value)
            : 0
        return prev + value
      }, 0)
    : 0
  const privateItemPrice = hasPrivateItem
    ? Number(rates.find(r => r.additionalId === 'PETBOX')?.value)
    : 0
  const total = vehiclePrice + itemsPrice + privateItemPrice

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
              {`\n${t(`TripTypeRadio.${form.getValues('type')}`)}`}
              {`\n${hotels.find(h => h.id === Number(form.getValues('hotel')))?.name}\n\n`}
              <b className="text-xs uppercase">{t('people')}</b>
              {`\n${t('PeopleInput.grown-ups')}: ${form.getValues('adults')}. `}
              {form.getValues('children') > 0
                ? `${t('PeopleInput.children')}: ${form.getValues('children')}. `
                : ''}
              {form.getValues('infants') > 0
                ? `${t('PeopleInput.infants')}: ${form.getValues('infants')}`
                : ''}
              {'\n\n'}
            </p>
            <div className="w-1/2">
              <p className="whitespace-pre-line">
                <b className="text-xs uppercase">{t('vehicle')}</b>
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
              {(hasItems || hasPrivateItem) && (
                <b className="text-xs uppercase">{t('additionals')}</b>
              )}
              {hasItems &&
                `${form
                  .getValues('items')
                  .reduce(
                    (prev: any, curr: any) =>
                      `${prev}\n${t(`Items.${curr.toLowerCase()}`)}`,
                    ''
                  )}`}
              {hasPrivateItem &&
                `\n${t(`Items.${form.getValues('privateItems').toLowerCase()}`)}`}
            </p>
            <p className="w-full pb-4 pt-10 text-center text-lg text-black">
              <b className="uppercase">{`Total: ${total} USD`}</b>
            </p>
          </div>
          <div className=" flex w-full justify-center gap-4">
            <Button
              className="mt-5"
              type="submit"
              form="trip-form"
              onClick={form.handleSubmit(onReserve)}
            >
              {t('reserve')}
            </Button>

            <Button
              className="mt-5"
              type="submit"
              form="trip-form"
              onClick={form.handleSubmit(onFullPay)}
            >
              {t('pay-in-full')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ReviewDialog
