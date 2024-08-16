import MainLayout from '@/components/MainLayout'
import PrivatePage from '@/components/PrivatePage'
import prisma from '@/db'
import { redirect } from '@/navigation'

async function Private() {
  const flag = await prisma.flag.findUnique({ where: { id: 'IS_ACTIVE' } })
  if (!flag?.value) {
    redirect('/')
  }

  return (
    <MainLayout>
      <PrivatePage />
    </MainLayout>
  )
}

export default Private
