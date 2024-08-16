import AdminLayout from '@/components/AdminLayout'
import TrasladosTable from '@/components/TrasladosTable'

export default async function Page() {
  return (
    <AdminLayout>
      <TrasladosTable />
    </AdminLayout>
  )
}
