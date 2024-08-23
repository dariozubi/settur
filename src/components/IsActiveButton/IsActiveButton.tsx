'use client'

import Button from '../Button'
type Props = {
  isActive: boolean
  // eslint-disable-next-line no-unused-vars
  updateIsActive: ({ value }: { value: boolean }) => void
}

function IsActiveButton({ isActive, updateIsActive }: Props) {
  return (
    <Button
      variant={isActive ? 'destructive' : 'default'}
      onClick={() => updateIsActive({ value: !isActive })}
    >
      {isActive ? 'Detener nuevas operaciones' : 'Activar operaciones'}
    </Button>
  )
}

export default IsActiveButton
