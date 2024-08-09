'use client'

import {
  Additional,
  Direction,
  Hotel,
  Order,
  OrderStatus,
  Transfer,
  Vehicle,
} from '@prisma/client'
import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { EnviarServicioButton } from './EnviarServicioButton'
import { TransferDetails } from './TransferDetails'

export type EnhancedTransfer = Transfer & { order: Order & { hotel: Hotel } }

export const columns: ColumnDef<EnhancedTransfer>[] = [
  {
    accessorKey: 'id',
    header: 'Servicio',
    cell: ({ row }) => row.original.id,
  },
  {
    accessorKey: 'date',
    header: 'Fecha',
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'))
      return format(date, 'd MMM, p', { locale: es })
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
      return <EnviarServicioButton transfer={transfer} />
    },
  },
]

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
  SHARED: 'Compartido',
}
