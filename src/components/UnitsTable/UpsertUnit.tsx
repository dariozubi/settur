import { Unit } from '@prisma/client'
import { Dispatch, SetStateAction, useState } from 'react'
import Button from '../Button'
import { Pencil, Plus } from 'lucide-react'
import { UnitDialog } from './UnitDialog'

type Props = {
  unit?: Unit
  setData: Dispatch<SetStateAction<Unit[]>>
}

export const UpsertUnit = ({ unit, setData }: Props) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        {!!unit ? <Pencil size={18} /> : <Plus size={18} />}
      </Button>
      <UnitDialog open={open} setOpen={setOpen} unit={unit} setData={setData} />
    </>
  )
}
