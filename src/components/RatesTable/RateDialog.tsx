import Dialog, {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/Dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { Rate } from '@prisma/client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Form, {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../Form'
import Input from '../Input'
import Button from '../Button'
import { toast } from '../Toast'
import { updateRate } from '@/app/actions/rate'

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  rate: Rate | null
}

export const RateDialog = ({ open, setOpen, rate }: Props) => {
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })

  useEffect(() => {
    form.setValue('value', rate?.value || 0)
    form.setValue('priceId', rate?.priceId || '')
  }, [form, rate])

  async function onSave(data: z.infer<typeof schema>) {
    setLoading(true)

    if (rate) {
      const res = await updateRate({
        value: data.value,
        priceId: data.priceId,
        id: rate.id,
      })
      if (res.error) {
        toast({
          description: (
            <p className="mt-2 whitespace-pre-line p-4 text-red-500">
              {res.error}
            </p>
          ),
        })
      }
    }
    setLoading(false)
    setOpen(false)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {rate && (
        <DialogContent className="max-h-screen overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>{`Precio #${rate.id}`}</DialogTitle>
          </DialogHeader>
          <div>
            <Form {...form}>
              <form id="Rate-form" className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Valor</FormLabel>
                      <FormControl>
                        <Input
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priceId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Stripe ID</FormLabel>
                      <FormControl>
                        <Input
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  className="mt-5"
                  type="submit"
                  form="Rate-form"
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
  value: z.coerce
    .number({ required_error: 'Requerido' })
    .int({ message: 'Sólo números enteros' })
    .min(1, { message: 'El valor debe ser al menos 1' }),
  priceId: z.string().trim().min(1, { message: 'Requerido' }),
})
