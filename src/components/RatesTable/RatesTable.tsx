import prisma from '@/db'
import { MainTable } from './MainTable'

async function RatesTable() {
  const data = await prisma.rate.findMany({ orderBy: { id: 'asc' } })

  return <MainTable initialData={data} />
}

export default RatesTable
