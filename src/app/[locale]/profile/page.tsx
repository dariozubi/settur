import { getServerSession } from 'next-auth'

import { authOptions } from '@/auth'
import LogoutButton from '@/components/LogoutButton'
import AdminLayout from '@/components/AdminLayout'

export default async function Page() {
  const session = await getServerSession(authOptions)
  return (
    <AdminLayout>
      <p className="max-w-screen-sm">{JSON.stringify(session)}</p>
      <LogoutButton />
    </AdminLayout>
  )
}
