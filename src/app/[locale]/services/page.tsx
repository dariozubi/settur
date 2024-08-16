import MainLayout from '@/components/MainLayout'
import ServicesPage from '@/components/ServicesPage'
import prisma from '@/db'

async function Services() {
  const flag = await prisma.flag.findUnique({ where: { id: 'IS_ACTIVE' } })

  return (
    <MainLayout>
      <ServicesPage isActive={!!flag?.value} />
    </MainLayout>
  )
}

export default Services
