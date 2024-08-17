import prisma from '@/db'
import MainTable from './MainTable'
import { getTraslados } from '@/app/actions/transfer'

async function TrasladosTable() {
  const res = await getTraslados()
  const units = await prisma.unit.findMany({ orderBy: { id: 'asc' } })
  const operators = await prisma.operator.findMany({ orderBy: { id: 'asc' } })

  return <MainTable units={units} data={res.data || []} operators={operators} />
}

export default TrasladosTable
