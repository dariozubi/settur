import { Table } from '@tanstack/react-table'
import Select, { SelectContent, SelectItem, SelectTrigger } from '../Select'
import { Direction, OrderStatus, Vehicle, Zone } from '@prisma/client'
import { direccion, estado, vehiculo } from '../AdminServices/utils'
import { CarFront, HandCoins, MapPinned, SignpostBig } from 'lucide-react'

type Props = {
  table: Table<any>
}

export const Filters = ({ table }: Props) => {
  return (
    <div className="flex w-fit gap-4 py-2">
      <Select
        onValueChange={v =>
          table
            .getColumn('direction')
            ?.setFilterValue(v !== 'all' ? v : undefined)
        }
        defaultValue="all"
      >
        <SelectTrigger noIcon>
          <SignpostBig size={18} />
          <span className="ml-2 font-normal">Dirección</span>
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
        <SelectTrigger noIcon>
          <MapPinned size={18} />
          <span className="ml-2 font-normal">Zona</span>
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
        <SelectTrigger noIcon>
          <CarFront size={18} />
          <span className="ml-2 font-normal">Vehículo</span>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>

          {Object.values(Vehicle)
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
        <SelectTrigger noIcon>
          <HandCoins size={18} />
          <span className="ml-2 font-normal">Estado</span>
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">Todos</SelectItem>

          {Object.values(OrderStatus).map(v => (
            <SelectItem key={v} value={v}>
              {estado[v]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
