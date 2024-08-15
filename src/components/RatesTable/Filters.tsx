import { Table } from '@tanstack/react-table'
import Select, { SelectContent, SelectItem, SelectTrigger } from '../Select'
import { Additional, Trip, Vehicle, Zone } from '@prisma/client'
import { CarFront, CirclePlus, MapPinned, SignpostBig } from 'lucide-react'

type Props = {
  table: Table<any>
}

export const Filters = ({ table }: Props) => {
  return (
    <div className="flex flex-row flex-wrap order-1 gap-2 py-2 w-fit md:order-last md:flex-col md:px-2 md:py-0">
      <Select
        onValueChange={v =>
          table.getColumn('trip')?.setFilterValue(v !== 'all' ? v : undefined)
        }
        defaultValue="all"
      >
        <SelectTrigger noIcon className="size-12">
          <SignpostBig size={18} className="text-stone-500" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>

          {Object.values(Trip).map(v => (
            <SelectItem key={v} value={v}>
              {v}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={v =>
          table.getColumn('zone')?.setFilterValue(v !== 'all' ? v : undefined)
        }
        defaultValue="all"
      >
        <SelectTrigger noIcon className="size-12">
          <MapPinned size={18} className="text-stone-500" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>

          {Object.values(Zone).map(v => (
            <SelectItem key={v} value={v}>
              {v}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={v =>
          table
            .getColumn('vehicle')
            ?.setFilterValue(v !== 'all' ? v : undefined)
        }
        defaultValue="all"
      >
        <SelectTrigger noIcon className="size-12">
          <CarFront size={18} className="text-stone-500" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>

          {Object.values(Vehicle)
            .filter(v => v !== 'COACH')
            .reverse()
            .map(v => (
              <SelectItem key={v} value={v}>
                {v}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={v =>
          table
            .getColumn('additionalId')
            ?.setFilterValue(v !== 'all' ? v : undefined)
        }
        defaultValue="all"
      >
        <SelectTrigger noIcon className="size-12">
          <CirclePlus size={18} className="text-stone-500" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>

          {Object.values(Additional)
            .filter(a => a !== 'WHEELCHAIR')
            .map(v => (
              <SelectItem key={v} value={v}>
                {v}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  )
}
