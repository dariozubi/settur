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
import Link from 'next/link'
import DropdownMenu, {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../DropdownMenu'
import Button from '../Button'
import { MessageCirclePlus } from 'lucide-react'
import { es } from 'date-fns/locale'

type EnhancedTransfer = Transfer & { order: Order & { hotel: Hotel } }

export const columns: ColumnDef<EnhancedTransfer>[] = [
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
    id: 'actions',
    cell: ({ row }) => {
      const transfer = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              Enviar <MessageCirclePlus size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {operadores.map((o, i) => (
              <DropdownMenuItem key={`${o.label}-${i}`}>
                <Link
                  href={getOperatorMessage(transfer, o.number)}
                  target="_blank"
                  className="w-full"
                >
                  {`A ${o.label}`}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

function getOperatorMessage(transfer: EnhancedTransfer, telephone: string) {
  const message = `Orden de Servicio #${transfer.order.id} (${estado[transfer.order.status]})

  Dirección: ${direccion[transfer.direction]}
  Vuelo: ${transfer.flight} - ${format(transfer.date, 'PPP p', {
    locale: es,
  })}
  Vehículo: ${vehiculo[transfer.order.vehicle]}
  Hotel: ${transfer.order.hotel.name} (Zona ${transfer.order.hotel.zone.substring(4)})
  Usuario: ${transfer.order.name} ${transfer.order.surname} ( ${transfer.order.phone} )
  Personas: ${transfer.order.adults} adultos, ${transfer.order.children} niños y ${transfer.order.infants} infantes
  ${transfer.order.items.length > 0 ? `Adicionales ${transfer.order.items.reduce((prev, curr) => `${prev}, ${adicionales[curr]}`, ',').substring(1)}` : ''}`
  return `https://wa.me/${telephone}?text=${encodeURIComponent(message)}`
}

const operadores = [
  {
    label: 'Dario',
    number: '525514510958',
  },
]

const adicionales: Record<Additional, string> = {
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
