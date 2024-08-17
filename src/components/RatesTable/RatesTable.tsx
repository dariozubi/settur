import { MainTable } from './MainTable'
import { getRates } from '@/app/actions/rate'

async function RatesTable() {
  const res = await getRates()

  return <MainTable data={res.data || []} />
}

export default RatesTable
