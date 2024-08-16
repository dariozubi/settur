import prisma from '@/db'
import { MainTable } from './MainTable'

async function OperatorsTable() {
  const data = await prisma.operator.findMany({ orderBy: { id: 'asc' } })

  return (
    <div className="w-fit rounded border">
      <MainTable initialData={data} />
    </div>
  )
}

export default OperatorsTable
