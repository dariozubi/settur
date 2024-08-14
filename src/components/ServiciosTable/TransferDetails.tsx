'use client'

import Dialog, {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/Dialog'
import Button from '../Button'
import { adicionales, direccion, EnhancedTransfer, vehiculo } from './utils'
import { useState } from 'react'
import { Eye } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

type Props = {
  transfer: EnhancedTransfer
}

export const TransferDetails = ({ transfer }: Props) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button
        variant="secondary"
        onClick={() => setOpen(true)}
        type="button"
        className="flex gap-1"
      >
        <Eye size={18} />
        <span className="hidden lg:block">Ver</span>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-screen overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>{`Servicio #${transfer.id}`}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col">
            <p>{`Usuario: ${transfer.order.name} ${transfer.order.surname} ( ${transfer.order.phone} )`}</p>
            <p>{`Dirección: ${direccion[transfer.direction]}`}</p>
            <p>{`Vuelo: ${transfer.flight} - ${format(transfer.date, 'PPP p', { locale: es })}`}</p>
            <p>{`Vehículo: ${vehiculo[transfer.order.vehicle]}`}</p>
            <p>{`Hotel: ${transfer.order.hotel.name} (Zona ${transfer.order.hotel.zone.substring(4)})`}</p>
            <p>{`Personas: ${transfer.order.adults} adultos, ${transfer.order.children} niños y ${transfer.order.infants} infantes`}</p>
            {transfer.order.items.length > 0 && (
              <p>{`Adicionales: ${transfer.order.items.reduce((prev, curr) => `${prev}, ${adicionales[curr]}`, ',').substring(2)}`}</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
