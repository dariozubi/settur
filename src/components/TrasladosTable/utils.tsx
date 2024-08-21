import {
  Additional,
  Direction,
  Operator,
  Hotel as HotelType,
  Order,
  OrderStatus,
  Transfer,
  Unit,
  Vehicle,
} from '@prisma/client'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { MensajeDropdown } from './MensajeDropdown'
import {
  CarFront,
  HandCoins,
  Hotel,
  MapPinned,
  PlaneTakeoff,
  SignpostBig,
  SquareUserRound,
} from 'lucide-react'
import { UnitCell } from './UnitCell'
import { ColumnDef } from '@tanstack/react-table'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import { MoreDropdown } from './MoreDropdown'
import { TransferDialog } from './MainTable'

export type EnhancedTransfer = Transfer & {
  order: Order & { hotel: HotelType }
  unit: Unit | null
}

type GetColumnsProps = {
  units: Unit[]
  operators: Operator[]
  setOpenDialog: Dispatch<SetStateAction<TransferDialog>>
  setCurrentTransfer: Dispatch<SetStateAction<EnhancedTransfer | null>>
}

export function getColumns({
  units,
  operators,
  setOpenDialog,
  setCurrentTransfer,
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
      cell: ({ row }) => format(row.original.date, 'd MMM, p', { locale: es }),
    },
    {
      accessorKey: 'direction',
      header: () => (
        <div className="flex items-center justify-center gap-1">
          <SignpostBig size={14} />
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
          unit={row.original.unit}
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
        </div>
      ),
      cell: ({ row }) => {
        const order = row.original.order
        const total = order.owed + order.extras
        const show =
          (order.status === 'RESERVED' || order.extras !== 0) &&
          (order.trip === 'ONEWAY' ||
            (order.trip === 'ROUND' && row.original.direction === 'HOTEL'))
        return (
          <span className="flex w-full justify-center">{`${show ? '$' + total : '-'}`}</span>
        )
      },
    },
    {
      id: 'enviarServicio',
      cell: ({ row }) => {
        const transfer = row.original
        return <MensajeDropdown transfer={transfer} operators={operators} />
      },
    },
    {
      id: 'verOrden',
      cell: ({ row }) => {
        const transfer = row.original
        return (
          <MoreDropdown
            transfer={transfer}
            setCurrentTransfer={setCurrentTransfer}
            setOpenDialog={setOpenDialog}
          />
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
  RESERVED: 'Debe',
  PAID: 'Pagado',
  CANCELLED: 'Cancelado',
  FULFILLED: 'Realizado',
}

export const direccion: Record<Direction, ReactNode> = {
  AIRPORT: <PlaneTakeoff size={18} />,
  HOTEL: <Hotel size={18} />,
}

export const vehiculo: Record<Vehicle, string> = {
  SPRINTER: 'Sprinter',
  HIACE: 'Hiace',
  SUBURBAN: 'Suburban',
  ESCALADE: 'Escalade',
  COACH: 'Autobus',
  SHARED: '-',
}
