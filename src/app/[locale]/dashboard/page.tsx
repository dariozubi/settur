import { getServerSession } from 'next-auth'

import { authOptions } from '@/auth'
import LogoutButton from '@/components/LogoutButton'
import AdminLayout from '@/components/AdminLayout'
import AdminOrdersTable from '@/components/AdminOrdersTable'

export default async function Page() {
  const session = await getServerSession(authOptions)
  return (
    <AdminLayout>
      <div className="flex w-full items-center justify-between">
        <p>
          {`Hola `}
          <span className="font-extrabold">
            {session?.user?.email?.split('@')[0]}
          </span>
        </p>
        <LogoutButton />
      </div>
      <div className="flex w-full gap-2">
        <AdminOrdersTable />
      </div>
    </AdminLayout>
  )
}