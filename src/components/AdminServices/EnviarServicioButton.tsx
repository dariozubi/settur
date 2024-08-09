import Link from 'next/link'
import DropdownMenu, {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../DropdownMenu'
import Button from '../Button'
import { MessageCirclePlus } from 'lucide-react'
import {
  adicionales,
  direccion,
  EnhancedTransfer,
  estado,
  vehiculo,
} from './utils'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

type Props = {
  transfer: EnhancedTransfer
}

export const EnviarServicioButton = ({ transfer }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-1">
          <MessageCirclePlus size={18} /> Enviar
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
}

function getOperatorMessage(transfer: EnhancedTransfer, telephone: string) {
  const message = `*Servicio #${transfer.id}* (${estado[transfer.order.status]})
  
  _Dirección_: ${direccion[transfer.direction]}
  _Vuelo_: ${transfer.flight} - ${format(transfer.date, 'PPP p', { locale: es })}
  _Vehículo_: ${vehiculo[transfer.order.vehicle]}
  _Hotel_: ${transfer.order.hotel.name} (Zona ${transfer.order.hotel.zone.substring(4)})
  _Usuario_: ${transfer.order.name} ${transfer.order.surname} ( ${transfer.order.phone} )
  _Personas_: ${transfer.order.adults} adultos, ${transfer.order.children} niños y ${transfer.order.infants} infantes
  ${transfer.order.items.length > 0 ? `_Adicionales_: ${transfer.order.items.reduce((prev, curr) => `${prev}, ${adicionales[curr]}`, ',').substring(2)}` : ''}`
  return `https://wa.me/${telephone}?text=${encodeURIComponent(message)}`
}

const operadores = [
  {
    label: 'Dario',
    number: '525514510958',
  },
  {
    label: 'Ernesto',
    number: '525527272149',
  },
]
