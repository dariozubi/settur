import { UseFormReturn } from 'react-hook-form'

import HotelSelect, {
  type Props as HotelSelectProps,
} from '@/components/HotelSelect'
import TripTypeRadio, {
  type Props as TripTypeRadioProps,
} from '@/components/TripTypeRadio'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/Accordion'
import { FormField } from '@/components/Form'
import { useQuery } from '@tanstack/react-query'
import { Hotel } from '@prisma/client'
import axios from 'axios'
import { showHotel } from '@/lib/utils'

export type Props = {
  form: UseFormReturn<any>
  isPrivate?: boolean
  labels: {
    destination: string
    hotel: HotelSelectProps['labels']
    tripType: TripTypeRadioProps['labels']
  }
}

function DestinationAccordion({ form, labels, isPrivate }: Props) {
  const { isLoading, error, data } = useQuery<{ hotels: Hotel[] }>({
    queryKey: ['hotels'],
    queryFn: async () => axios.get('/api/hotels').then(r => r.data),
    staleTime: Infinity,
  })

  if (error) throw Error('Hotels endpoint is not working')
  const hotels = data?.hotels
    ? !!isPrivate
      ? data.hotels
      : data.hotels.filter(h => showHotel(h.zone))
    : []
  return (
    <AccordionItem value="destination">
      <AccordionTrigger>{labels.destination}</AccordionTrigger>

      <AccordionContent className="flex items-center justify-center gap-6 border-t py-10">
        <div className="w-[300px]">
          <FormField
            disabled={isLoading}
            control={form.control}
            name="hotel"
            render={({ field }) => (
              <HotelSelect
                labels={labels.hotel}
                value={field.value}
                onSelect={v => {
                  form.setValue('hotel', v)
                }}
                hotels={hotels}
              />
            )}
          />
        </div>

        <div className="m-w-[300px]">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <TripTypeRadio
                labels={labels.tripType}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

export default DestinationAccordion
