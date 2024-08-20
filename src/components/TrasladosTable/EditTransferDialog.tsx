import Dialog, {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/Dialog'
import { EnhancedTransfer } from './utils'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Form, { FormField, FormItem, FormMessage } from '../Form'
import PeopleInput from '../PeopleInput'
import { toast } from '../Toast'
import Button from '../Button'
import { items } from '@/lib/consts'
import ItemCheckbox from '../ItemCheckbox'
import { updateOrder } from '@/app/actions/order'
import { Additional } from '@prisma/client'
import { TransferDialog } from './MainTable'

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<TransferDialog>>
  transfer: EnhancedTransfer | null
}

export const EditTransferDialog = ({ open, setOpen, transfer }: Props) => {
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })

  useEffect(() => {
    form.setValue('adults', transfer?.order.adults || 1)
    form.setValue('children', transfer?.order.children || 0)
    form.setValue('infants', transfer?.order.infants || 0)
    form.setValue(
      'items',
      transfer?.order.items.filter(i => i !== 'RESERVATION') || []
    )
  }, [form, transfer])

  async function onSave(data: z.infer<typeof schema>) {
    setLoading(true)

    if (transfer?.order.id) {
      let res
      res = await updateOrder({
        ...data,
        items: data.items as Additional[],
        id: transfer.order.id,
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
    <Dialog open={open} onOpenChange={open => setOpen(open ? 'edit' : null)}>
      {transfer && (
        <DialogContent className="max-h-screen overflow-y-scroll">
          <DialogHeader>
            <DialogTitle className="text-center text-3xl">{`#${transfer.id}`}</DialogTitle>
          </DialogHeader>

          <div>
            <Form {...form}>
              <form id="unit-form" className="flex flex-col gap-4">
                <div className="flex">
                  <FormField
                    control={form.control}
                    name="adults"
                    render={({ field }) => (
                      <PeopleInput
                        label="Adultos"
                        onChange={field.onChange}
                        value={field.value}
                        onBlur={field.onBlur}
                        min={transfer?.order.adults || 1}
                      />
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="children"
                    render={({ field }) => (
                      <PeopleInput
                        label="Niños"
                        onChange={field.onChange}
                        value={field.value}
                        onBlur={field.onBlur}
                        min={transfer?.order.children || 0}
                      />
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="infants"
                    render={({ field }) => (
                      <PeopleInput
                        label="Infantes"
                        onChange={field.onChange}
                        value={field.value}
                        onBlur={field.onBlur}
                        min={transfer?.order.infants || 0}
                      />
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="items"
                  render={() => (
                    <FormItem className="w-full sm:space-y-6">
                      <div className="flex flex-wrap px-4">
                        {items
                          .filter(i => i !== 'NOTHING' && i !== 'WHEELCHAIR')
                          .map(item => (
                            <FormField
                              key={item}
                              control={form.control}
                              name="items"
                              render={({ field }) => (
                                <ItemCheckbox
                                  value={field.value}
                                  onChange={field.onChange}
                                  id={item}
                                  label={`${item}`}
                                  className="w-full py-4 sm:w-1/2"
                                  disabled={transfer.order.items.includes(item)}
                                />
                              )}
                            />
                          ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className="mt-5"
                  type="submit"
                  form="unit-form"
                  disabled={loading}
                  onClick={form.handleSubmit(onSave)}
                >
                  Guardar cambios
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      )}
    </Dialog>
  )
}

const schema = z.object({
  adults: z.coerce.number().int(),
  children: z.coerce.number().int(),
  infants: z.coerce.number().int(),
  items: z.array(z.enum(items)),
})
