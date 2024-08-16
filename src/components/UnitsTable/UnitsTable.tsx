import prisma from '@/db'
import { MainTable } from './MainTable'

async function UnitsTable() {
  const data = await prisma.unit.findMany({ orderBy: { id: 'asc' } })

  return (
    <div className="w-fit rounded border">
      <MainTable initialData={data} />
    </div>
  )
}

export default UnitsTable
