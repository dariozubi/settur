import { MainTable } from './MainTable'
import { getRates } from '@/app/actions/rate'

async function RatesTable() {
  const rates = await getRates()

  return <MainTable data={rates} />
}

export default RatesTable
