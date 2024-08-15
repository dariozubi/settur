import AdminLayout from '@/components/AdminLayout'
import ServiciosTable from '@/components/ServiciosTable'

export default async function Page() {
  return (
    <AdminLayout>
      <ServiciosTable />
    </AdminLayout>
  )
}
