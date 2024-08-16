import Dialog, {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/Dialog'
import { adicionales, EnhancedTransfer, vehiculo } from './utils'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Dispatch, SetStateAction } from 'react'
import Table, { TableCell, TableRow } from '../Table'

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  transfer: EnhancedTransfer | null
}

export const TransferDialog = ({ open, setOpen, transfer }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {transfer && (
        <DialogContent className="max-h-screen overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>{`Servicio #${transfer.id}`}</DialogTitle>
          </DialogHeader>
          <Table>
            <TableRow>
              <TableCell className="font-bold">Usuario</TableCell>
              <TableCell>{`${transfer.order.name} ${transfer.order.surname} ( ${transfer.order.phone} )`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Transfer</TableCell>
              <TableCell>
                {transfer.direction === 'AIRPORT' ? 'OUT' : 'IN'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Vuelo</TableCell>
              <TableCell>{`${transfer.flight} - ${format(transfer.date, 'PPP p', { locale: es })}`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Vehículo</TableCell>
              <TableCell>{`${vehiculo[transfer.order.vehicle]}`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Hotel</TableCell>
              <TableCell>{`${transfer.order.hotel.name} (Zona ${transfer.order.hotel.zone.substring(4)})`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Personas</TableCell>
              <TableCell>{`${transfer.order.adults} adultos, ${transfer.order.children} niños y ${transfer.order.infants} infantes`}</TableCell>
            </TableRow>
            {transfer.order.items.length > 0 && (
              <TableRow>
                <TableCell className="font-bold">Adicionales</TableCell>
                <TableCell>{`${transfer.order.items.reduce((prev, curr) => `${prev}, ${adicionales[curr]}`, ',').substring(2)}`}</TableCell>
              </TableRow>
            )}
          </Table>
        </DialogContent>
      )}
    </Dialog>
  )
}
