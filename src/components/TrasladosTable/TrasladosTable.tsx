import prisma from '@/db'
import MainTable from './MainTable'

async function TrasladosTable() {
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
  const units = await prisma.unit.findMany({ orderBy: { id: 'asc' } })
  const operators = await prisma.operator.findMany({ orderBy: { id: 'asc' } })

  return <MainTable units={units} data={data} operators={operators} />
}

export default TrasladosTable
