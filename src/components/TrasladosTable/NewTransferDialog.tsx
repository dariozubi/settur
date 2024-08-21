import Dialog, {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/Dialog'
import { EnhancedTransfer } from './utils'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import Button from '../Button'
import { TransferDialog } from './MainTable'
import { addReturnTransfer } from '@/app/actions/transfer'
import { z } from 'zod'
import { Rate } from '@prisma/client'
import Form, { FormField } from '../Form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import DatePicker from '../DatePicker'
import FlightInput from '../FlightInput'
import { toast } from '../Toast'
import { addDays } from 'date-fns'

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<TransferDialog>>
  transfer: EnhancedTransfer | null
  rates: Rate[]
}

export const NewTransferDialog = ({
  open,
  setOpen,
  transfer,
  rates,
}: Props) => {
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })
  const rate = transfer
    ? rates.find(
        r =>
          r.trip === 'ONEWAY' &&
          r.vehicle === transfer.order.vehicle &&
          r.zone === transfer.order.hotel.zone
      )
    : null

  const labels = useMemo(
    () => ({
      main: 'Fecha',
      pick: 'Elige fecha',
      hours: 'Horas',
      minutes: 'Minutos',
    }),
    []
  )

  useEffect(() => {
    form.setValue(
      'departureDate',
      addDays(transfer?.date || new Date(Date.now()), 1)
    )
    form.setValue('departureFlight', '')
  }, [form, transfer])

  async function onSave(data: z.infer<typeof schema>) {
    setLoading(true)

    if (transfer?.order.id && rate) {
      let res
      res = await addReturnTransfer({
        date: data.departureDate,
        flight: data.departureFlight,
        orderId: transfer.order.id,
        rateId: rate.id,
      })
      if (res.error) {
        toast({
          description: (
            <p className="mt-2 whitespace-pre-line p-4 text-red-500">
              {res.error}
            </p>
          ),
        })
      } else {
        toast({
          description: (
            <p className="mt-2 whitespace-pre-line p-4">{res.message}</p>
          ),
        })
      }
    }
    setLoading(false)
    setOpen(null)
  }

  return (
    <Dialog open={open} onOpenChange={open => setOpen(open ? 'new' : null)}>
      {transfer && (
        <DialogContent className="max-h-screen overflow-y-scroll">
          <DialogHeader>
            <DialogTitle className="text-center text-3xl">{`Orden #${transfer.id}`}</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form id="unit-form" className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="departureDate"
                render={({ field }) => (
                  <DatePicker
                    isEnglish={false}
                    labels={labels}
                    value={field.value}
                    onChange={field.onChange}
                    limitDate={addDays(transfer.date, 1)}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="departureFlight"
                render={({ field }) => (
                  <FlightInput
                    label="Vuelo"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                )}
              />

              <Button
                className="mt-5"
                type="submit"
                form="unit-form"
                disabled={loading}
                onClick={form.handleSubmit(onSave)}
              >
                {`Agregar regreso por ${'$' + rate?.value}`}
              </Button>
            </form>
          </Form>
        </DialogContent>
      )}
    </Dialog>
  )
}

const schema = z.object({
  departureDate: z.date(),
  departureFlight: z.string().trim(),
})
