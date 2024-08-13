import AdminLayout from '@/components/AdminLayout'
import UnitsTable from '@/components/UnitsTable'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await getServerSession()
  const isAdmin = session?.user?.image === 'ADMIN'

  if (!isAdmin) redirect('/servicios')

  return (
    <AdminLayout>
      <UnitsTable />
    </AdminLayout>
  )
}
