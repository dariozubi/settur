import { Operator } from '@prisma/client'
import { Dispatch, SetStateAction, useState } from 'react'
import Button from '../Button'
import { Pencil, Plus } from 'lucide-react'
import { OperatorDialog } from './OperatorDialog'

type Props = {
  operator?: Operator
  setData: Dispatch<SetStateAction<Operator[]>>
}

export const UpsertOperator = ({ operator, setData }: Props) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        {!!operator ? <Pencil size={18} /> : <Plus size={18} />}
      </Button>
      <OperatorDialog
        open={open}
        setOpen={setOpen}
        operator={operator}
        setData={setData}
      />
    </>
  )
}
