import { getOrderChartsData } from '@/app/actions/order'
import AdminLayout from '@/components/AdminLayout'
import OrderEarningsChart from '@/components/OrderEarningsChart'
import OrdersChart from '@/components/OrdersChart'
import OrderVehiclesChart from '@/components/OrderVehiclesChart'
import OrderZonesChart from '@/components/OrderZonesChart'

import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await getServerSession()
  const isAdmin = session?.user?.image === 'ADMIN'

  if (!isAdmin) redirect('/admin/traslados')

  const { zone, vehicle, orders, earnings } = await getOrderChartsData()

  return (
    <AdminLayout>
      <div className="flex flex-wrap">
        <OrdersChart data={orders.data} created={orders.created} />
        <OrderEarningsChart data={earnings.data} />
        <OrderZonesChart data={zone.data} />
        <OrderVehiclesChart data={vehicle.data} />
      </div>
    </AdminLayout>
  )
}
