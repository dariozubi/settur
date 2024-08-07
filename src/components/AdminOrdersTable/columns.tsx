'use client'

import {
  Direction,
  Hotel,
  Order,
  OrderStatus,
  Transfer,
  Vehicle,
} from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'

export const columns: ColumnDef<
  Transfer & { order: Order & { hotel: Hotel } }
>[] = [
  {
    accessorKey: 'order.id',
    header: 'Orden',
    cell: ({ row }) => row.original.order.id,
  },
  {
    accessorKey: 'date',
    header: 'Fecha',
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'))
      return format(date, 'dd/MM/yyyy hh:mm aaaa')
    },
  },
  {
    accessorKey: 'direction',
    header: 'Dirección',
    cell: ({ row }) => direccion[row.original.direction],
  },
  {
    accessorKey: 'order.hotel.zone',
    header: 'Zona',
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.order.hotel.zone.substring(4)}
      </div>
    ),
  },
  {
    accessorKey: 'order.vehicle',
    header: 'Vehículo',
    cell: ({ row }) => vehiculo[row.original.order.vehicle],
  },
  {
    accessorKey: 'order.status',
    header: 'Estado',
    cell: ({ row }) => estado[row.original.order.status],
  },
]

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
  SHARED: 'Compartido',
}
