import AdminLayout from '@/components/AdminLayout'
import LoginSection from '@/components/LoginSection'
import { getServerSession } from 'next-auth'

async function Page() {
  const session = await getServerSession()
  return (
    <AdminLayout>
      <LoginSection session={session} />
    </AdminLayout>
  )
}

export default Page
