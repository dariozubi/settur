import AdminLayout from '@/components/AdminLayout'
import RatesTable from '@/components/RatesTable'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await getServerSession()
  const isAdmin = session?.user?.image === 'ADMIN'

  if (!isAdmin) redirect('/admin/traslados')

  return (
    <AdminLayout>
      <RatesTable />
    </AdminLayout>
  )
}
