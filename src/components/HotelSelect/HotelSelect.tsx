'use client'

import { useState } from 'react'
import { ChevronsUpDown, Hotel as HotelIcon } from 'lucide-react'

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
import { Hotel } from '@prisma/client'

export type Props = {
  labels: {
    selectHotel: string
    searchHotel: string
    noResults: string
  }
  onSelect: (_v: number) => void
  value: number
  hotels: Hotel[]
}

function HotelSelect({ value, labels, onSelect, hotels }: Props) {
  const { selectHotel, searchHotel, noResults } = labels
  const [open, setOpen] = useState(false)

  return (
    <FormItem className="mx-auto max-w-[300px]">
      <div className="flex flex-col gap-2">
        <FormLabel className="flex items-center font-bold">Hotel</FormLabel>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <FormControl>
              <Button variant="outline" size="sm" className="w-full">
                {value !== undefined ? (
                  <div className="flex w-full items-center justify-start">
                    <HotelIcon className="mr-1 size-4" />

                    <span className="max-w-[250px] truncate">
                      {hotels.find(h => h.id === Number(value))?.name ??
                        selectHotel}
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
                  {hotels.map(hotel => (
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
