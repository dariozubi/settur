'use client'

import { useState } from 'react'
import { ChevronsUpDown, Hotel as HotelIcon } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import Button from '@/components/Button'
import Command, {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/Command'
import Popover, { PopoverContent, PopoverTrigger } from '@/components/Popover'
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form'
import { Hotel } from '@/lib/types'

export type Props = {
  labels: {
    selectHotel: string
    searchHotel: string
    noResults: string
  }
  onSelect: (_v: number) => void
  value: number
}

function HotelSelect({ value, labels, onSelect }: Props) {
  const { selectHotel, searchHotel, noResults } = labels
  const [open, setOpen] = useState(false)
  const { isLoading, error, data } = useQuery<{ hotels: Hotel[] }>({
    queryKey: ['hotels'],
    queryFn: async () => axios.get('/api/hotels').then(r => r.data),
    staleTime: Infinity,
  })

  if (error) throw Error('Hotels endpoint is not working')

  return (
    <FormItem className="mx-auto max-w-[300px]">
      <div className="flex flex-col gap-2">
        <FormLabel className="flex items-center font-bold">Hotel</FormLabel>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild disabled={isLoading}>
            <FormControl>
              <Button variant="outline" size="sm" className="w-full">
                {value && data?.hotels ? (
                  <div className="flex w-full items-center justify-start">
                    <HotelIcon className="mr-1 size-4" />

                    <span className="max-w-[250px] truncate">
                      {data?.hotels?.find(h => h.id === Number(value))?.name}
                    </span>
                  </div>
                ) : (
                  <div className="flex w-full items-center justify-between">
                    {selectHotel} <ChevronsUpDown className="size-4" />
                  </div>
                )}
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="p-0" side="bottom" align="start">
            <Command>
              <CommandInput placeholder={searchHotel} />
              <CommandList>
                <CommandEmpty>{noResults}</CommandEmpty>
                <CommandGroup>
                  {data?.hotels &&
                    data?.hotels.map(hotel => (
                      <CommandItem
                        key={hotel.id}
                        value={String(hotel.id)}
                        onSelect={() => {
                          onSelect(hotel.id)
                          setOpen(false)
                        }}
                      >
                        <span>{hotel.name}</span>
                      </CommandItem>
                    ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <FormMessage />
    </FormItem>
  )
}

export default HotelSelect
