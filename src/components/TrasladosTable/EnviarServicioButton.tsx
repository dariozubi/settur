import Link from 'next/link'
import DropdownMenu, {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../DropdownMenu'
import Button from '../Button'
import { MessageSquareText } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { adicionales, EnhancedTransfer, estado, vehiculo } from './utils'
import { Operator } from '@prisma/client'

type Props = {
  transfer: EnhancedTransfer
  operators: Operator[]
}

export const EnviarServicioButton = ({ transfer, operators }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="flex gap-1">
          <MessageSquareText size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {operators.map(o => (
          <DropdownMenuItem key={o.id}>
            <Link
              href={getOperatorMessage(transfer, o.phone)}
              target="_blank"
              className="w-full"
            >
              {`A ${o.name}`}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function getOperatorMessage(transfer: EnhancedTransfer, telephone: string) {
  const message = `*Traslado #${transfer.id}*
${
  transfer.order.status !== 'PAID'
    ? `
  *${estado[transfer.order.status]} ${transfer.order.owed} USD*
  `
    : ''
}
_Transfer_: ${transfer.direction === 'AIRPORT' ? 'OUT' : 'IN'}
_Vuelo_: ${transfer.flight} - ${format(transfer.date, 'PPP p', { locale: es })}
_Vehículo_: ${vehiculo[transfer.order.vehicle]}
_Hotel_: ${transfer.order.hotel.name} (Zona ${transfer.order.hotel.zone.substring(4)})
_Usuario_: ${transfer.order.name} ${transfer.order.surname} ( ${transfer.order.phone} )
_Personas_: ${transfer.order.adults} adultos, ${transfer.order.children} niños y ${transfer.order.infants} infantes
${transfer.order.items.length > 0 ? `_Adicionales_: ${transfer.order.items.reduce((prev, curr) => `${prev}, ${adicionales[curr]}`, ',').substring(2)}` : ''}`
  return `https://wa.me/${telephone}?text=${encodeURIComponent(message)}`
}
