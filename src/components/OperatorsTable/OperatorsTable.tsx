import prisma from '@/db'
import { MainTable } from './MainTable'

async function OperatorsTable() {
  const data = await prisma.operator.findMany({ orderBy: { id: 'asc' } })

  return (
    <div className="flex w-fit flex-col gap-2">
      <h2 className="font-2xl text-center font-extrabold">Operadores</h2>
      <div className="w-fit rounded border">
        <MainTable initialData={data} />
      </div>
    </div>
  )
}

export default OperatorsTable
