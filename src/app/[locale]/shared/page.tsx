import { getIsActive } from '@/app/actions/flag'
import MainLayout from '@/components/MainLayout'
import SharedPage from '@/components/SharedPage'
import { redirect } from '@/navigation'

async function Shared() {
  const isActive = await getIsActive()
  if (!isActive) redirect('/')

  return (
    <MainLayout>
      <SharedPage />
    </MainLayout>
  )
}

export default Shared
