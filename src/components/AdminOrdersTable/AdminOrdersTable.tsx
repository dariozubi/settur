import prisma from '@/db'
import AdminDataTable from '../AdminDataTable'
import { columns } from './columns'
import Card, { CardContent, CardHeader, CardTitle } from '../Card'

async function AdminOrdersTable() {
  const data = await prisma.transfer.findMany({
    include: { order: { include: { hotel: true } } },
    orderBy: { date: 'desc' },
  })
  return (
    <Card className="w-full p-8">
      <CardHeader>
        <CardTitle>Servicios</CardTitle>
      </CardHeader>
      <CardContent>
        <AdminDataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  )
}

export default AdminOrdersTable
