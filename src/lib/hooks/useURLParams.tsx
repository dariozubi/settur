import { UseFormReturn } from 'react-hook-form'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import { vehicles } from '@/lib/consts'

export function useURLParams(form: UseFormReturn<any>) {
  const searchParams = useSearchParams()
  useEffect(() => {
    const hotel = searchParams.get('hotel')
    const adults = searchParams.get('adults')
    form.setValue('hotel', Number(hotel))
    form.setValue(
      'adults',
      Number(adults) < vehicles.sprinter.seats ? Number(adults) : 1
    )
  }, [form, searchParams])
}
