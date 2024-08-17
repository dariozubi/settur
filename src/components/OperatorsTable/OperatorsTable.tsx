import { MainTable } from './MainTable'
import { getOperators } from '@/app/actions/operator'

async function OperatorsTable() {
  const res = await getOperators()

  return <MainTable data={res.data || []} />
}

export default OperatorsTable
