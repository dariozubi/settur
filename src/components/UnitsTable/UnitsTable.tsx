import prisma from '@/db'
import { MainTable } from './MainTable'

async function UnitsTable() {
  const data = await prisma.unit.findMany({ orderBy: { id: 'asc' } })

  return (
    <div className="flex w-fit flex-col gap-2">
      <h2 className="font-2xl text-center font-extrabold">
        Unidades disponibles
      </h2>
      <div className="w-fit rounded border">
        <MainTable initialData={data} />
      </div>
    </div>
  )
}

export default UnitsTable
