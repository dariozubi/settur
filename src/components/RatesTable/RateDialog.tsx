import Dialog, {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/Dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { Rate } from '@prisma/client'
import { Dispatch, SetStateAction, useState } from 'react'
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
import axios from 'axios'
import { useErrorHandler } from '@/lib/hooks/useErrorHandler'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from '../Toast'

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  rate: Rate
  setData: Dispatch<SetStateAction<Rate[]>>
}

export const RateDialog = ({ open, setOpen, rate, setData }: Props) => {
  const [loading, setLoading] = useState(false)
  const errorHandler = useErrorHandler()
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      value: rate.value,
      priceId: rate.priceId,
    },
  })

  async function onSave(data: z.infer<typeof schema>) {
    setLoading(true)
    try {
      const res = await queryClient.fetchQuery({
        queryKey: ['updateRate'],
        queryFn: async () =>
          axios
            .post('/api/admin/rate', {
              ...data,
              id: rate?.id,
              fn: 'updateRate',
            })
            .then(r => r.data),
      })
      if (rate?.id) {
        setData(prev =>
          prev.map(u => {
            if (rate.id === u.id) {
              return res.rate
            } else {
              return u
            }
          })
        )
      } else {
        setData(prev => [...prev, res.rate])
      }
      toast({
        description: (
          <p className="p-4 mt-2 whitespace-pre-line">
            Los cambios al precio fueron realizados.
          </p>
        ),
      })
      setOpen(false)
    } catch (e) {
      errorHandler(e)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
