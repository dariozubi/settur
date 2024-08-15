import { Rate } from '@prisma/client'
import { Dispatch, SetStateAction, useState } from 'react'
import Button from '../Button'
import { Pencil, Plus } from 'lucide-react'
import { RateDialog } from './RateDialog'

type Props = {
  rate: Rate
  setData: Dispatch<SetStateAction<Rate[]>>
}

export const UpdateRate = ({ rate, setData }: Props) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        {!!rate ? <Pencil size={18} /> : <Plus size={18} />}
      </Button>
      <RateDialog open={open} setOpen={setOpen} rate={rate} setData={setData} />
    </>
  )
}
