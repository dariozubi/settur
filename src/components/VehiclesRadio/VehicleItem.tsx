import Image from 'next/image'
import { User } from 'lucide-react'

import Label from '@/components/Label'
import { RadioGroupItem } from '@/components/RadioGroup'
import { Vehicle } from '@prisma/client'

type Props = {
  value: Vehicle
  price?: number
  seats: string
  className?: string
}

export const VehicleItem = ({ value, className, price, seats }: Props) => {
  return (
    <div className="w-1/2 p-2 sm:w-1/4">
      <RadioGroupItem value={value} id={value} className="peer sr-only" />
      <Label
        htmlFor={value}
        className="flex cursor-pointer flex-col overflow-hidden rounded-md border-2 border-stone-200 bg-neutral-50 p-4 opacity-40 hover:bg-white hover:text-slate-800 peer-data-[state=checked]:border-slate-800 peer-data-[state=checked]:bg-white peer-data-[state=checked]:opacity-100 [&:has([data-state=checked])]:border-slate-800"
      >
        <span className="text-center text-lg font-bold">
          {value.charAt(0) + value.slice(1).toLowerCase()}
        </span>
        <div className={`relative h-[75px] sm:h-[125px] ${className}`}>
          <Image
            src={`/img/${value}.png`}
            alt={value}
            fill
            className="pointer-events-none object-contain"
            sizes="(max-width: 1280px) 100vw, 50vw"
          />
        </div>
        <div className="flex items-baseline justify-between">
          <div className="flex items-center gap-1">
            <span className="text-xl font-bold">{price}</span>

            <span className="mt-1 text-sm font-medium">USD</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-lg">{seats}</span>

            <User className="size-4" />
          </div>
        </div>
      </Label>
    </div>
  )
}
