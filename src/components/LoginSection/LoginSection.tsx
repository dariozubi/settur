'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Button from '@/components/Button'

function LoginSection() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <section className="flex flex-col gap-1 rounded border border-stone-400 bg-white p-4">
      <form
        onSubmit={async event => {
          setLoading(true)
          event.preventDefault()
          signIn('email', { callbackUrl: '/servicios', email })
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
        <Button type="submit" disabled={loading}>
          {loading && (
            <div
              className="text-surface inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
              role="status"
            />
          )}
          <span className="ml-2">Enviar link</span>
        </Button>
      </form>
    </section>
  )
}

export default LoginSection
