import Dialog, {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/Dialog'
import { EnhancedTransfer } from './utils'
import { Dispatch, SetStateAction, useState } from 'react'
import Button from '../Button'
import { TransferDialog } from './MainTable'
import { setAsNoShow } from '@/app/actions/transfer'

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<TransferDialog>>
  transfer: EnhancedTransfer | null
}

export const NoShowTransferDialog = ({ open, setOpen, transfer }: Props) => {
  const [loading, setLoading] = useState(false)
  return (
    <Dialog open={open} onOpenChange={open => setOpen(open ? 'noshow' : null)}>
      {transfer && (
        <DialogContent className="max-h-screen overflow-y-scroll">
          <DialogHeader>
            <DialogTitle className="text-center text-3xl">{`Orden #${transfer.id}`}</DialogTitle>
          </DialogHeader>

          <span className="text-center text-xl">
            ¿Seguro que es un No Show?
          </span>

          <div className="flex justify-center gap-2">
            <Button
              variant="destructive"
              onClick={() => {
                setLoading(true)
                setAsNoShow({ transferId: transfer.id })
                setOpen(null)
              }}
              type="button"
              disabled={loading}
              className="flex gap-1"
            >
              No show
            </Button>

            <Button
              variant="secondary"
              onClick={() => {
                setOpen(null)
              }}
              type="button"
              className="flex gap-1"
            >
              Cancelar
            </Button>
          </div>
        </DialogContent>
      )}
    </Dialog>
  )
}
