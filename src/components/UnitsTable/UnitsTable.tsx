import { MainTable } from './MainTable'
import { getUnits } from '@/app/actions/unit'

async function UnitsTable() {
  const res = await getUnits()

  return <MainTable data={res.data || []} />
}

export default UnitsTable
