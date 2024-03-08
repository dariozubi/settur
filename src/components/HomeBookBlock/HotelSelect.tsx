'use client'

import { Button } from '@/components/ui/button'
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
import { ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'

type Props = {
  selectHotel: string
  searchHotel: string
  noResults: string
}

export function HotelSelect({ selectHotel, searchHotel, noResults }: Props) {
  const [open, setOpen] = useState(false)
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null)

  return (
    <div className="flex items-center space-x-4">
      <p className="text-muted-foreground text-base font-medium">Hotel</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className=" justify-start">
            {selectedHotel ? (
              selectedHotel
            ) : (
              <>
                {selectHotel}{' '}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </>
            )}
          </Button>
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
                    onSelect={value => {
                      setSelectedHotel(value)
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
  )
}
