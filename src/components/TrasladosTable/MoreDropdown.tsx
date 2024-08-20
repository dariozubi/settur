import DropdownMenu, {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../DropdownMenu'
import Button from '../Button'
import { MoreHorizontal } from 'lucide-react'
import { EnhancedTransfer } from './utils'
import { Dispatch, SetStateAction } from 'react'
import { TransferDialog } from './MainTable'

type Props = {
  transfer: EnhancedTransfer
  setCurrentTransfer: Dispatch<SetStateAction<EnhancedTransfer | null>>
  setOpenDialog: Dispatch<SetStateAction<TransferDialog>>
}

export const MoreDropdown = ({
  transfer,
  setCurrentTransfer,
  setOpenDialog,
}: Props) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="secondary" className="flex gap-1">
        <MoreHorizontal size={18} />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem>
        <Button
          variant="ghost"
          onClick={() => {
            setCurrentTransfer(transfer)
            setOpenDialog('view')
          }}
          type="button"
          className="flex gap-1"
        >
          Ver Detalles
        </Button>
      </DropdownMenuItem>

      <DropdownMenuItem>
        <Button
          variant="ghost"
          onClick={() => {
            setCurrentTransfer(transfer)
            setOpenDialog('edit')
          }}
          type="button"
          className="flex gap-1"
        >
          Agregar Extras
        </Button>
      </DropdownMenuItem>

      {transfer.order.trip === 'ONEWAY' && transfer.direction === 'HOTEL' && (
        <DropdownMenuItem>
          <Button
            variant="ghost"
            onClick={() => {
              setCurrentTransfer(transfer)
              setOpenDialog('new')
            }}
            type="button"
            className="flex gap-1"
          >
            Agregar Regreso
          </Button>
        </DropdownMenuItem>
      )}

      {!transfer.isNoShow && (
        <DropdownMenuItem>
          <Button
            variant="ghost"
            onClick={() => {
              setCurrentTransfer(transfer)
              setOpenDialog('noshow')
            }}
            type="button"
            className="flex gap-1"
          >
            No Show
          </Button>
        </DropdownMenuItem>
      )}
    </DropdownMenuContent>
  </DropdownMenu>
)
