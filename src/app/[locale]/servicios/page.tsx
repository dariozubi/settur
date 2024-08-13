import AdminLayout from '@/components/AdminLayout'
import AdminServices from '@/components/AdminServices'

export default async function Page() {
  return (
    <AdminLayout>
      <AdminServices />
    </AdminLayout>
  )
}
