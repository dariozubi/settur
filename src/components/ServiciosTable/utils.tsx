import {
  Additional,
  Direction,
  Hotel,
  Operator,
  Order,
  OrderStatus,
  Transfer,
  Unit,
  Vehicle,
} from '@prisma/client'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { EnviarServicioButton } from './EnviarServicioButton'
import { TransferDetails } from './TransferDetails'
import {
  CarFront,
  HandCoins,
  MapPinned,
  SignpostBig,
  SquareUserRound,
} from 'lucide-react'
import { UnitCell } from './UnitCell'
import { ColumnDef } from '@tanstack/react-table'

export type EnhancedTransfer = Transfer & {
  order: Order & { hotel: Hotel }
  unit: Unit | null
}

type GetColumnsProps = {
  units: Unit[]
  operators: Operator[]
}

export function getColumns({
  units,
  operators,
}: GetColumnsProps): ColumnDef<any, any>[] {
  return [
    {
      accessorKey: 'id',
      header: '#',
      cell: ({ row }) => row.original.id,
    },
    {
      accessorKey: 'date',
      header: 'Fecha',
      cell: ({ row }) => {
        const date = new Date(row.original.date)
        return format(date, 'd MMM, p', { locale: es })
      },
    },
    {
      accessorKey: 'direction',
      header: () => (
        <div className="flex items-center justify-center gap-1">
          <SignpostBig size={14} />{' '}
          <span className="hidden lg:block">Ruta</span>
        </div>
      ),
      cell: ({ row }) => direccion[row.original.direction as Direction],
    },
    {
      accessorKey: 'order.hotel.zone',
      header: () => (
        <div className="flex items-center justify-center gap-1">
          <MapPinned size={14} />
          <span className="hidden lg:block">Zona</span>
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-center">
          {row.original.order.hotel.zone.substring(4)}
        </div>
      ),
    },
    {
      accessorKey: 'order.vehicle',
      header: () => (
        <div className="flex items-center justify-center gap-1">
          <CarFront size={14} />
          <span className="hidden lg:block">Auto</span>
        </div>
      ),
      cell: ({ row }) => vehiculo[row.original.order.vehicle as Vehicle],
    },
    {
      id: 'unidad',
      accessorFn: originalRow => {
        if (originalRow.unitId) return String(originalRow.unitId)
        else return 'no'
      },
      header: () => (
        <div className="flex items-center justify-center gap-1">
          <SquareUserRound size={14} />
          <span className="hidden lg:block">Unidad</span>
        </div>
      ),
      cell: ({ row }) => (
        <UnitCell
          vehicle={row.original.order.vehicle}
          initialUnit={row.original.unit}
          units={units}
          transferId={row.original.id}
        />
      ),
    },
    {
      accessorKey: 'order.status',
      header: () => (
        <div className="flex items-center justify-center gap-1">
          <HandCoins size={14} />
          <span className="hidden lg:block">Pago</span>
        </div>
      ),
      cell: ({ row }) => estado[row.original.order.status as OrderStatus],
    },
    {
      id: 'verOrden',
      cell: ({ row }) => {
        const transfer = row.original
        return <TransferDetails transfer={transfer} />
      },
    },
    {
      id: 'enviarServicio',
      cell: ({ row }) => {
        const transfer = row.original
        return (
          <EnviarServicioButton transfer={transfer} operators={operators} />
        )
      },
    },
  ]
}

export const adicionales: Record<Additional, string> = {
  WHEELCHAIR: 'Silla de ruedas',
  CARSEAT: 'Asiento de bebé',
  BOOSTERSEAT: 'Asiento de niño',
  SHOPPING: 'Compras',
  PETBOX: 'Caja de mascota',
  KAYAK: 'Kayak',
  BICYCLE: 'Bicicleta',
  SURFTABLE: 'Tabla de surf',
  RESERVATION: 'Reserva',
}

export const estado: Record<OrderStatus, string> = {
  CREATED: 'En espera',
  RESERVED: 'Reserva',
  PAID: 'Pagado',
  CANCELLED: 'Cancelado',
  FULFILLED: 'Realizado',
}

export const direccion: Record<Direction, string> = {
  AIRPORT: 'Aeropuerto',
  HOTEL: 'Hotel',
}

export const vehiculo: Record<Vehicle, string> = {
  SPRINTER: 'Sprinter',
  HIACE: 'Hiace',
  SUBURBAN: 'Suburban',
  ESCALADE: 'Escalade',
  COACH: 'Autobus',
  SHARED: 'Común',
}
