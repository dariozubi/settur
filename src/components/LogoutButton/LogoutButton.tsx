'use client'

import Button from '@/components/Button'
import { signOut } from 'next-auth/react'

function LogoutButton() {
  return <Button onClick={() => signOut({ callbackUrl: '/' })}>Salir</Button>
}

export default LogoutButton
