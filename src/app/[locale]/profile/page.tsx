import { getServerSession } from 'next-auth'

import { authOptions } from '@/auth'
import LogoutButton from '@/components/LogoutButton'
import AdminLayout from '@/components/AdminLayout'
import AdminNewUserForm from '@/components/AdminNewUserForm'
import AdminUsers from '@/components/AdminUsers'

export default async function Page() {
  const session = await getServerSession(authOptions)
  return (
    <AdminLayout>
      <div className="flex w-full items-center justify-between">
        <p>
          {`Buenas mi `}
          <span className="font-extrabold">
            {session?.user?.email?.split('@')[0]}
          </span>
        </p>
        <LogoutButton />
      </div>
      <AdminUsers />
      <AdminNewUserForm />
    </AdminLayout>
  )
}
