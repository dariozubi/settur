'use client'

import { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Session } from 'next-auth'
import axios from 'axios'

import Button from '@/components/Button'
import { toast } from '@/components/Toast'
import { useErrorHandler } from '@/lib/hooks/useErrorHandler'

type Props = {
  session: Session | null
}
function LoginSection({ session }: Props) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const errorHandler = useErrorHandler()

  useEffect(() => {
    if (session?.user) {
      router.replace('/profile')
    }
  }, [router, session?.user])

  return (
    <section className="flex flex-col gap-1 rounded border border-stone-400 bg-white p-4">
      <form
        onSubmit={async event => {
          event.preventDefault()
          try {
            const res = await axios.get('/api/admin')
            const isAdmin = res.data.admins.find((a: any) => a.email === email)
            if (isAdmin) {
              signIn('email', { callbackUrl: '/profile', email })
            } else {
              toast({
                title: 'Error',
                description: (
                  <p className="mt-2 w-[340px] whitespace-pre-line rounded-md bg-slate-950 p-4 text-red-500">
                    PROHIBIDO EL PASO
                  </p>
                ),
              })
            }
          } catch (e) {
            errorHandler(e)
          }
        }}
        className="flex flex-col gap-2"
      >
        <label htmlFor="email">Correo:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={event => {
            setEmail(event.target.value)
          }}
          className="rounded border border-stone-400 px-2 py-1"
        />
        <Button type="submit">
          <span className="ml-2">Enviar link</span>
        </Button>
      </form>
    </section>
  )
}

export default LoginSection
