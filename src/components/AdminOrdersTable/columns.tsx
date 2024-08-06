'use client'

import { Hotel, Order, OrderStatus, Transfer } from '@prisma/client'
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
    cell: ({ row }) =>
      row.original.direction === 'AIRPORT' ? 'Aeropuerto' : 'Hotel',
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
    cell: ({ row }) =>
      row.original.order.vehicle === 'SHARED'
        ? 'Compartido'
        : `${row.original.order.vehicle.substring(0, 1)}${row.original.order.vehicle.substring(1).toLowerCase()}`,
  },
  {
    accessorKey: 'order.status',
    header: 'Estado',
    cell: ({ row }) => estado[row.original.order.status],
  },
]

const estado: Record<OrderStatus, string> = {
  CREATED: 'En espera',
  RESERVED: 'Reserva',
  PAID: 'Pagado',
  CANCELLED: 'Cancelado',
  FULFILLED: 'Realizado',
}
