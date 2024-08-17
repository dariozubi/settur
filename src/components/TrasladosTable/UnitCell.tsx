import { Unit, Vehicle } from '@prisma/client'
import { Plus } from 'lucide-react'
import { useCallback, useState } from 'react'
import Select, {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../Select'
import { toast } from '../Toast'
import { addTransferUnit } from '@/app/actions/transfer'

type Props = {
  transferId: number
  unit: Unit | null
  units: Unit[]
  vehicle: Vehicle
}

export const UnitCell = ({ transferId, unit, units, vehicle }: Props) => {
  const [loading, setLoading] = useState(false)

  const handleClick = useCallback(
    async (v: string) => {
      setLoading(true)

      const res = await addTransferUnit({ transferId, unitId: Number(v) })
      if (res.error) {
        toast({
          description: (
            <p className="mt-2 whitespace-pre-line p-4 text-red-500">
              {res.error}
            </p>
          ),
        })
      } else {
        toast({
          description: (
            <p className="mt-2 whitespace-pre-line p-4">{res.message}</p>
          ),
        })
      }
      setLoading(false)
    },
    [transferId]
  )

  return (
    <div className="flex justify-center">
      <Select
        onValueChange={handleClick}
        value={unit ? String(unit.id) : undefined}
        disabled={loading}
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
