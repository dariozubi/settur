import AdminLayout from '@/components/AdminLayout'
import OperatorsTable from '@/components/OperatorsTable'
import UnitsTable from '@/components/UnitsTable'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { getIsActive, updateIsActive } from '@/app/actions/flag'
import Button from '@/components/Button'
import { Suspense } from 'react'
import IsActiveButton from '@/components/IsActiveButton'

export default async function Page() {
  const session = await getServerSession()
  const isAdmin = session?.user?.image === 'ADMIN'

  if (!isAdmin) redirect('/admin/traslados')

  const isActive = await getIsActive()

  return (
    <AdminLayout>
      <div className="flex flex-wrap gap-4">
        <UnitsTable />

        <OperatorsTable />
      </div>

      <div className="flex">
        <Suspense
          fallback={
            <Button isLoading variant={isActive ? 'destructive' : 'default'} />
          }
        >
          <IsActiveButton isActive={isActive} updateIsActive={updateIsActive} />
        </Suspense>
      </div>
    </AdminLayout>
  )
}
