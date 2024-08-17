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
import { Unit, Vehicle } from '@prisma/client'
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
import { createUnit, updateUnit } from '@/app/actions/unit'

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  unit: Unit | null
}

export const UnitDialog = ({ open, setOpen, unit }: Props) => {
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  })

  useEffect(() => {
    form.setValue('label', unit?.label || '')
    form.setValue('vehicle', unit?.vehicle || '')
  }, [form, unit])

  async function onSave(data: z.infer<typeof schema>) {
    setLoading(true)

    let res
    if (unit?.id) {
      res = await updateUnit({
        label: data.label,
        vehicle: data.vehicle as Vehicle,
        id: unit?.id,
      })
    } else {
      res = await createUnit({
        label: data.label,
        vehicle: data.vehicle as Vehicle,
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
