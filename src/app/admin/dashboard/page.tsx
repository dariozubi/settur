import IsActiveButton from '@/components/IsActiveButton'
import AdminLayout from '@/components/AdminLayout'
import OperatorsTable from '@/components/OperatorsTable'
import UnitsTable from '@/components/UnitsTable'
import prisma from '@/db'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await getServerSession()
  const isAdmin = session?.user?.image === 'ADMIN'

  if (!isAdmin) redirect('/admin/traslados')

  const flag = await prisma.flag.findUnique({ where: { id: 'IS_ACTIVE' } })

  return (
    <AdminLayout>
      <div className="flex flex-wrap gap-4">
        <UnitsTable />

        <OperatorsTable />
      </div>

      <div className="flex">
        <IsActiveButton isActive={!!flag?.value} />
      </div>
    </AdminLayout>
  )
}
