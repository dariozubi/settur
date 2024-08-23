import { getIsActive } from '@/app/actions/flag'
import MainLayout from '@/components/MainLayout'
import ServicesPage from '@/components/ServicesPage'

async function Services() {
  const isActive = await getIsActive()

  return (
    <MainLayout>
      <ServicesPage isActive={isActive} />
    </MainLayout>
  )
}

export default Services
