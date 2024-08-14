import prisma from '@/db'
import MainTable from './MainTable'

async function ServiciosTable() {
  const data = await prisma.transfer.findMany({
    where: {
      OR: [
        { order: { status: { equals: 'RESERVED' } } },
        { order: { status: { equals: 'PAID' } } },
      ],
      AND: {
        date: { gte: new Date(new Date().setDate(new Date().getDate() - 1)) },
      },
    },
    include: { order: { include: { hotel: true } }, unit: true },
    orderBy: { date: 'asc' },
  })
  const units = await prisma.unit.findMany()

  return <MainTable units={units} data={data} />
}

export default ServiciosTable
