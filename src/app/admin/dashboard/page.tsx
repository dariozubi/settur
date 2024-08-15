import AdminLayout from '@/components/AdminLayout'
import OperatorsTable from '@/components/OperatorsTable'
import UnitsTable from '@/components/UnitsTable'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await getServerSession()
  const isAdmin = session?.user?.image === 'ADMIN'

  if (!isAdmin) redirect('/admin/servicios')

  return (
    <AdminLayout>
      <div className="flex flex-wrap gap-4">
        <UnitsTable />

        <OperatorsTable />
      </div>
    </AdminLayout>
  )
}
