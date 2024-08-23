import { getIsActive } from '@/app/actions/flag'
import MainLayout from '@/components/MainLayout'
import PrivatePage from '@/components/PrivatePage'
import { redirect } from '@/navigation'

async function Private() {
  const isActive = await getIsActive()
  if (!isActive) redirect('/')

  return (
    <MainLayout>
      <PrivatePage />
    </MainLayout>
  )
}

export default Private
