import Dialog, {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/Dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { Operator } from '@prisma/client'
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
  operator?: Operator
  setData: Dispatch<SetStateAction<Operator[]>>
}

export const OperatorDialog = ({ open, setOpen, operator, setData }: Props) => {
  const [loading, setLoading] = useState(false)
  const errorHandler = useErrorHandler()
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      name: operator?.name || '',
      phone: operator?.phone || '',
    },
  })

  async function onSave(data: z.infer<typeof schema>) {
    setLoading(true)
    try {
      const res = await queryClient.fetchQuery({
        queryKey: ['updateOperator'],
        queryFn: async () =>
          axios
            .post('/api/operator', { ...data, id: operator?.id })
            .then(r => r.data),
      })
      if (operator?.id) {
        setData(prev =>
          prev.map(u => {
            if (operator.id === u.id) {
              return res.operator
            } else {
              return u
            }
          })
        )
      } else {
        setData(prev => [...prev, res.operator])
      }
      toast({
        description: (
          <p className="mt-2 whitespace-pre-line p-4">
            Los cambios de operadores fueron realizados.
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
          <DialogTitle>
            {operator?.id ? `Operador ${operator.id}` : 'Nuevo operador'}
          </DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form id="Operator-form" className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Nombre</FormLabel>
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Teléfono</FormLabel>
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
                form="Operator-form"
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
  name: z.string().trim().min(1, { message: 'Requerido' }),
  phone: z.string().regex(new RegExp(/^\d+$/), {
    message: 'Usar únicamente números con el código del país (52 para México)',
  }),
})
