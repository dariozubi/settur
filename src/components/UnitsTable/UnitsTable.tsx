import { MainTable } from './MainTable'
import { getUnits } from '@/app/actions/unit'

async function UnitsTable() {
  const units = await getUnits()

  return <MainTable data={units} />
}

export default UnitsTable
