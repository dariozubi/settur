'use client'

import { useForm } from 'react-hook-form'
import Form, { FormField } from '../Form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import NameInput from '../NameInput'
import Button from '../Button'
import { toast } from '../Toast'
import { useErrorHandler } from '@/lib/hooks/useErrorHandler'
import Card, { CardContent, CardHeader, CardTitle } from '../Card'
import { getNewAdminSchema } from '@/lib/schemas'
import axios from 'axios'

function AdminNewUserForm() {
  const errorHandler = useErrorHandler()
  const schema = getNewAdminSchema()
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(data: z.infer<typeof schema>) {
    try {
      const res = await axios.post('/api/admin', {
        ...data,
      })
      toast({
        title: 'Agregaste un nuevo administrador:',
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(res.data)}</code>
          </pre>
        ),
      })
    } catch (e) {
      errorHandler(e)
    }
  }

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>Agregar a un mero mero</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <NameInput
                  labels={{ label: 'Correo' }}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              )}
            />

            <div className=" flex w-full justify-center">
              <Button className="mt-5" type="submit">
                Agregar
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default AdminNewUserForm
