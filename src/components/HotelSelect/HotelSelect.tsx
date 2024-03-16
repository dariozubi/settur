'use client'

import Button from '@/components/Button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { hotels } from '@/lib/consts'
import { ChevronsUpDown, Hotel } from 'lucide-react'
import { FormControl, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useState } from 'react'

export type Props = {
  labels: {
    selectHotel: string
    searchHotel: string
    noResults: string
  }
  onSelect: (_v: string) => void
  value: string
}

type Hotel = {
  label: string
  zone: number
}

function HotelSelect({ value, labels, onSelect }: Props) {
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
                {value ? (
                  <div className="flex w-full items-center justify-start">
                    <Hotel className="mr-1 size-4" />

                    <span className="max-w-[250px] truncate">{value}</span>
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
                      key={`${hotel.label}-${hotel.zone}`}
                      value={hotel.label}
                      onSelect={() => {
                        onSelect(hotel.label)
                        setOpen(false)
                      }}
                    >
                      <span>{hotel.label}</span>
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
