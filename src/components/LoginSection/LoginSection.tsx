'use client'

import { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button'
import { Session } from 'next-auth'

type Props = {
  session: Session | null
}
function LoginSection({ session }: Props) {
  const router = useRouter()
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (session?.user) {
      router.replace('/profile')
    }
  }, [router, session?.user])

  return (
    <section className="flex flex-col gap-1 rounded border border-stone-400 bg-white p-4">
      <form
        onSubmit={event => {
          event.preventDefault()
          signIn('email', { callbackUrl: '/profile', email })
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
