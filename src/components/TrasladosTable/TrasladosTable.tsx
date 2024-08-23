import MainTable from './MainTable'
import { getTraslados } from '@/app/actions/transfer'
import { getRates } from '@/app/actions/rate'
import { getOperators } from '@/app/actions/operator'
import { getUnits } from '@/app/actions/unit'

async function TrasladosTable() {
  const traslados = await getTraslados()
  const units = await getUnits()
  const operators = await getOperators()
  const rates = await getRates()

  return (
    <MainTable
      units={units}
      data={traslados}
      operators={operators}
      rates={rates}
    />
  )
}

export default TrasladosTable
