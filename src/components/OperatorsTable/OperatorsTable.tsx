import { MainTable } from './MainTable'
import { getOperators } from '@/app/actions/operator'

async function OperatorsTable() {
  const operators = await getOperators()

  return <MainTable data={operators} />
}

export default OperatorsTable
