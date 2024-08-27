import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { Hotel, Rate } from '@prisma/client'

import Button from '@/components/Button'
import Dialog, { DialogContent } from '@/components/Dialog'
import { DialogHeader, DialogTitle } from '../Dialog'
import { toast } from '../Toast'
import { useIsEnglish } from '@/lib/hooks/useIsEnglish'
import { UseFormReturn } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import Checkbox from '../Checkbox'
import { Link } from '@/navigation'
import { getPrices } from '@/lib/utils'
import { Status } from '@/lib/types'
import OrderSummary from '../OrderSummary'

type Props = {
  form: UseFormReturn<any>
  setOpenAccordions: Dispatch<SetStateAction<string[]>>
  hotels: Hotel[]
  rates: Rate[]
  onFullPay: (_data: { [x: string]: any; type?: any }) => Promise<void>
  onReserve: (_data: { [x: string]: any; type?: any }) => Promise<void>
  isShared?: boolean
  status: Status
}

function ReviewDialog({
  form,
  setOpenAccordions,
  hotels,
  isShared,
  rates,
  onFullPay,
  onReserve,
  status,
}: Props) {
  const [openDialog, setOpenDialog] = useState(false)
  const [accept, setAccept] = useState(false)
  const isEnglish = useIsEnglish()
  const t = useTranslations('form')

  const zone = hotels.find(h => h.id === form.getValues('hotel'))?.zone
  const vehicle = isShared ? 'SPRINTER' : form.getValues('vehicle')
  const hasPrivateItem =
    !isShared && form.getValues('privateItems') !== 'NOTHING'
  const items = hasPrivateItem
    ? [...form.getValues('items'), form.getValues('privateItems')]
    : form.getValues('items')

  const { vehiclePrice, itemsPrice, reservationPrice } = getPrices({
    rates,
    zone,
    trip: form.getValues('type') === 'round-trip' ? 'ROUND' : 'ONEWAY',
    vehicle: isShared ? 'SHARED' : form.getValues('vehicle'),
    payingIndividuals:
      Number(form.getValues('adults')) + Number(form.getValues('children')),
    items,
  })
  const showReserve =
    isShared ||
    (!isShared && (zone === 'ZONE1' || zone === 'ZONE2' || zone === 'ZONE4'))

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
        <DialogContent className="max-h-screen overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>{t('review-order')}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-wrap text-xs">
            <OrderSummary
              name={form.getValues('name')}
              surname={form.getValues('surname')}
              email={form.getValues('email')}
              phone={form.getValues('phone')}
              type={form.getValues('type')}
              hotel={
                hotels.find(h => h.id === Number(form.getValues('hotel')))
                  ?.name || ''
              }
              adults={form.getValues('adults')}
              childs={form.getValues('children')}
              infants={form.getValues('infants')}
              vehicle={vehicle}
              arrivalDate={form.getValues('arrivalDate')}
              arrivalFlight={form.getValues('arrivalFlight')}
              departureDate={form.getValues('departureDate')}
              departureFlight={form.getValues('departureFlight')}
              items={items}
              isEnglish={isEnglish}
            />
            {showReserve && (
              <>
                <p className="mt-4 text-justify text-xs">
                  {t('reservations-text', {
                    price: rates.filter(
                      r => r.additionalId === 'RESERVATION'
                    )[0].value,
                  })}
                </p>
                <p className="w-full pt-4 text-center text-base text-black">
                  <b className="uppercase">{`${t('reserve-for')} ${reservationPrice} USD`}</b>
                </p>
              </>
            )}
            <p className="w-full pb-4 text-center text-base text-black">
              <b className="uppercase">{`Total: ${vehiclePrice + itemsPrice} USD`}</b>
            </p>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Checkbox
              id="terms"
              checked={accept}
              onCheckedChange={() => setAccept(p => !p)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t('accept')}{' '}
              <Link
                href="/terms-and-conditions"
                className="underline"
                target="_blank"
              >
                {t('terms-and-conditions')}
              </Link>
            </label>
          </div>
          <div className="flex w-full justify-center gap-4">
            {showReserve && (
              <Button
                className="mt-5"
                type="submit"
                form="trip-form"
                disabled={!accept}
                onClick={form.handleSubmit(onReserve)}
                isLoading={status === 'reserving'}
              >
                {t('reserve')}
              </Button>
            )}

            <Button
              className="mt-5"
              type="submit"
              form="trip-form"
              disabled={!accept}
              onClick={form.handleSubmit(onFullPay)}
              isLoading={status === 'paying'}
            >
              {showReserve ? t('pay-in-full') : t('pay')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ReviewDialog
