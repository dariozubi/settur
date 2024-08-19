import DropdownMenu, {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../DropdownMenu'
import Button from '../Button'
import { MoreHorizontal } from 'lucide-react'
import { EnhancedTransfer } from './utils'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  transfer: EnhancedTransfer
  setCurrentTransfer: Dispatch<SetStateAction<EnhancedTransfer | null>>
  setOpenDialog: Dispatch<SetStateAction<boolean>>
  setOpenEditDialog: Dispatch<SetStateAction<boolean>>
}

export const MoreDropdown = ({
  transfer,
  setCurrentTransfer,
  setOpenDialog,
  setOpenEditDialog,
}: Props) => {
  return (
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
              setOpenDialog(true)
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
              setOpenEditDialog(true)
            }}
            type="button"
            className="flex gap-1"
          >
            Agregar Extras
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
