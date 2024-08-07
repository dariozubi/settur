import prisma from '@/db'
import ServicesTable from '../ServicesTable'
import { columns } from './utils'

async function AdminServices() {
  const data = await prisma.transfer.findMany({
    where: {
      OR: [
        { order: { status: { equals: 'RESERVED' } } },
        { order: { status: { equals: 'PAID' } } },
      ],
    },
    include: { order: { include: { hotel: true } } },
    orderBy: { date: 'desc' },
  })
  return (
    <div>
      <h1 className="text-lg font-bold">Servicios</h1>
      <ServicesTable columns={columns} data={data} />
    </div>
  )
}

export default AdminServices
