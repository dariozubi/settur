import MainLayout from '@/components/MainLayout'
import SharedPage from '@/components/SharedPage'
import prisma from '@/db'
import { redirect } from '@/navigation'

async function Shared() {
  const flag = await prisma.flag.findUnique({ where: { id: 'IS_ACTIVE' } })
  if (!flag?.value) {
    redirect('/')
  }

  return (
    <MainLayout>
      <SharedPage />
    </MainLayout>
  )
}

export default Shared
