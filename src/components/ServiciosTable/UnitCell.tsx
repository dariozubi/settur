import { Unit, Vehicle } from '@prisma/client'
import { CirclePlus } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useErrorHandler } from '@/lib/hooks/useErrorHandler'
import Select, { SelectContent, SelectItem, SelectTrigger } from '../Select'
import axios from 'axios'
import { toast } from '../Toast'

type Props = {
  transferId: number
  initialUnit: Unit | null
  units: Unit[]
  vehicle: Vehicle
}

export const UnitCell = ({
  transferId,
  initialUnit,
  units,
  vehicle,
}: Props) => {
  const errorHandler = useErrorHandler()
  const [unit, setUnit] = useState<Unit | null>(initialUnit)
  const handleClick = useCallback(
    async (v: string) => {
      try {
        const response = await axios.post<{ unit: Unit }>('/api/admin', {
          transferId,
          unitId: Number(v),
        })
        setUnit(response.data.unit)
        toast({
          title: 'Unidad agregada',
        })
      } catch (e) {
        errorHandler(e)
      }
    },
    [errorHandler, transferId]
  )
  return unit ? (
    <div className="flex justify-center">{unit.label}</div>
  ) : (
    <div className="flex justify-center">
      <Select onValueChange={handleClick} defaultValue="all">
        <SelectTrigger noIcon className="w-fit">
          <CirclePlus size={18} className="text-stone-500" />
        </SelectTrigger>

        <SelectContent>
          {units
            .filter(u => {
              if (vehicle === 'SHARED') return true
              else return u.vehicle === vehicle
            })
            .map(v => (
              <SelectItem key={v.id} value={String(v.id)}>
                {v.label}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  )
}
