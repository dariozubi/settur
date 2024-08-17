import Dialog, {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/Dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { Operator } from '@prisma/client'
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
import { createOperator, updateOperator } from '@/app/actions/operator'

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  operator: Operator | null
}

export const OperatorDialog = ({ open, setOpen, operator }: Props) => {
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })

  useEffect(() => {
    form.setValue('name', operator?.name || '')
    form.setValue('phone', operator?.phone || '')
  }, [form, operator])

  async function onSave(data: z.infer<typeof schema>) {
    setLoading(true)

    let res
    if (operator?.id) {
      res = await updateOperator({
        name: data.name,
        phone: data.phone,
        id: operator?.id,
      })
    } else {
      res = await createOperator({
        name: data.name,
        phone: data.phone,
      })
    }
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
    setLoading(false)
    setOpen(false)
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
