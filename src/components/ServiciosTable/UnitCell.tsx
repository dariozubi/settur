import { Unit, Vehicle } from '@prisma/client'
import { Plus } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useErrorHandler } from '@/lib/hooks/useErrorHandler'
import Select, {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../Select'
import axios from 'axios'
import { toast } from '../Toast'
import { useQueryClient } from '@tanstack/react-query'

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
  const queryClient = useQueryClient()

  const handleClick = useCallback(
    async (v: string) => {
      try {
        const res = await queryClient.fetchQuery({
          queryKey: ['addTransferUnit'],
          queryFn: async () =>
            axios
              .post('/api/admin/unit', {
                transferId,
                unitId: Number(v),
                fn: 'addTransferUnit',
              })
              .then(r => r.data),
        })

        setUnit(res.unit)
        toast({
          title: 'Unidad agregada',
        })
      } catch (e) {
        errorHandler(e)
      }
    },
    [errorHandler, queryClient, transferId]
  )

  return (
    <div className="flex justify-center">
      <Select
        onValueChange={handleClick}
        value={unit ? String(unit.id) : undefined}
      >
        <SelectTrigger noIcon className="w-fit">
          <SelectValue
            placeholder={<Plus size={18} className="text-stone-500" />}
          />
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
