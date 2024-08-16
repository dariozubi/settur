'use client'

import { useQueryClient } from '@tanstack/react-query'
import Button from '../Button'
import { useCallback, useState } from 'react'
import axios from 'axios'
import { useErrorHandler } from '@/lib/hooks/useErrorHandler'

type Props = {
  isActive: boolean
}

function IsActiveButton({ isActive }: Props) {
  const [value, setValue] = useState(isActive)
  const [loading, setLoading] = useState(false)
  const errorHandler = useErrorHandler()
  const queryClient = useQueryClient()

  const handleClick = useCallback(async () => {
    setLoading(true)
    try {
      await queryClient.fetchQuery({
        queryKey: ['updateIsActive'],
        queryFn: async () =>
          axios.post('/api/admin/flags', {
            id: 'IS_ACTIVE',
            value: !isActive,
          }),
      })
      setValue(!isActive)
    } catch (e) {
      errorHandler(e)
    } finally {
      setLoading(false)
    }
  }, [errorHandler, isActive, queryClient])

  return (
    <Button
      variant={value ? 'destructive' : 'default'}
      onClick={handleClick}
      disabled={loading}
    >
      {value ? 'Detener nuevas operaciones' : 'Activar operaciones'}
    </Button>
  )
}

export default IsActiveButton
