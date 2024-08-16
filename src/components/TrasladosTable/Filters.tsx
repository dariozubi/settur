import { Table } from '@tanstack/react-table'
import Select, { SelectContent, SelectItem, SelectTrigger } from '../Select'
import { Direction, OrderStatus, Unit, Vehicle, Zone } from '@prisma/client'
import { direccion, estado, vehiculo } from './utils'
import {
  CarFront,
  HandCoins,
  MapPinned,
  SignpostBig,
  SquareUserRound,
} from 'lucide-react'

type Props = {
  table: Table<any>
  units: Unit[]
}

export const Filters = ({ table, units }: Props) => {
  return (
    <div className="flex flex-row flex-wrap order-1 gap-2 py-2 w-fit md:order-last md:flex-col md:px-2 md:py-0">
      <Select
        onValueChange={v =>
          table
            .getColumn('direction')
            ?.setFilterValue(v !== 'all' ? v : undefined)
        }
        defaultValue="all"
      >
        <SelectTrigger noIcon className="size-12">
          <SignpostBig size={18} className="text-stone-500" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>

          {Object.values(Direction).map(v => (
            <SelectItem key={v} value={v}>
              {direccion[v]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={v =>
          table
            .getColumn('order_hotel_zone')
            ?.setFilterValue(v !== 'all' ? v : undefined)
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
              {v.substring(4)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={v =>
          table
            .getColumn('order_vehicle')
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
                {vehiculo[v]}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={v =>
          table
            .getColumn('order_status')
            ?.setFilterValue(v !== 'all' ? v : undefined)
        }
        defaultValue="all"
      >
        <SelectTrigger noIcon className="size-12">
          <HandCoins size={18} className="text-stone-500" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>

          {Object.values(OrderStatus)
            .filter(s => s === 'RESERVED' || s === 'PAID')
            .map(v => (
              <SelectItem key={v} value={v}>
                {estado[v]}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      <Select
        onValueChange={v =>
          table.getColumn('unidad')?.setFilterValue(v !== 'all' ? v : undefined)
        }
        defaultValue="all"
      >
        <SelectTrigger noIcon className="size-12">
          <SquareUserRound size={18} className="text-stone-500" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>

          {units.map(unit => (
            <SelectItem key={unit.id} value={String(unit.id)}>
              {unit.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
