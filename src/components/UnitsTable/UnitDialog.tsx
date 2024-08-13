import Dialog, {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/Dialog'
import Select, {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Select'
import { vehicleBrands, vehicles } from '@/lib/consts'
import { zodResolver } from '@hookform/resolvers/zod'
import { Unit } from '@prisma/client'
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
  unit?: Unit
  setData: Dispatch<SetStateAction<Unit[]>>
}

export const UnitDialog = ({ open, setOpen, unit, setData }: Props) => {
  const [loading, setLoading] = useState(false)
  const errorHandler = useErrorHandler()
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      label: unit?.label || '',
      vehicle: unit?.vehicle || 'SUBURBAN',
    },
  })

  async function onSave(data: z.infer<typeof schema>) {
    setLoading(true)
    try {
      const res = await queryClient.fetchQuery({
        queryKey: ['updateUnit'],
        queryFn: async () =>
          axios.post('/api/unit', { ...data, id: unit?.id }).then(r => r.data),
      })
      if (unit?.id) {
        setData(prev =>
          prev.map(u => {
            if (unit.id === u.id) {
              return res.unit
            } else {
              return u
            }
          })
        )
      } else {
        setData(prev => [...prev, res.unit])
      }
      toast({
        description: (
          <p className="mt-2 whitespace-pre-line p-4">
            Los cambios a la unidad fueron realizados.
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
            {unit?.id ? `Unidad ${unit.id}` : 'Nueva unidad'}
          </DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form id="unit-form" className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="label"
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
                name="vehicle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Vehículo</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                          {Object.keys(vehicles).map(v => (
                            <SelectItem key={v} value={v}>
                              {v}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
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
    </Dialog>
  )
}

const [first, ...others] = vehicleBrands
const schema = z.object({
  label: z.string().trim().min(1, { message: 'Requerido' }),
  vehicle: z.enum([first, ...others]),
})
