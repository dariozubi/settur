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
import { ChevronsUpDown, Hotel } from 'lucide-react'
import { useState } from 'react'

type Props = {
  selectHotel: string
  searchHotel: string
  noResults: string
}

type Hotel = {
  label: string
  zone: number
}

export function HotelSelect({ selectHotel, searchHotel, noResults }: Props) {
  const [open, setOpen] = useState(false)
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null)

  return (
    <div className="mx-auto flex max-w-[300px] items-center gap-2 py-10">
      <p className="text-muted-foreground text-lg font-bold">Hotel:</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="w-full justify-start">
            {selectedHotel ? (
              <>
                <Hotel className="mr-1 size-4" />

                <span className="max-w-[250px] truncate">
                  {selectedHotel.label}
                </span>
              </>
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
                    value={hotel.label}
                    onSelect={() => {
                      setSelectedHotel(hotel)
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
