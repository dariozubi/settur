import { UseFormReturn } from 'react-hook-form'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import { hotels, vehicles } from '@/lib/consts'

export function usePrivateURLParams(form: UseFormReturn<any>) {
  const searchParams = useSearchParams()
  useEffect(() => {
    const hotel = searchParams.get('hotel')
    const adults = searchParams.get('adults')
    if (hotel && !!hotels.find(h => h.label === hotel)) {
      form.setValue('hotel', hotel)
    }
    form.setValue(
      'adults',
      Number(adults) < vehicles.sprinter.seats ? Number(adults) : 1
    )
  }, [form, searchParams])
}
