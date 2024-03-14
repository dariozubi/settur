import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { FormControl, FormItem, FormMessage } from '@/components/ui/form'
import { User } from 'lucide-react'
import { privateRates, trips, vehicles } from '@/lib/consts'
import { Zone } from '@/lib/types'

export type Props = {
  value: string
  onChange: () => void
  tripType: (typeof trips)[number]
  zone: Zone
  individuals: number
}

function VehiclesRadio({
  value,
  onChange,
  tripType,
  zone,
  individuals,
}: Props) {
  return (
    <FormItem>
      <FormControl>
        <RadioGroup
          value={value}
          onValueChange={onChange}
          className="flex w-full justify-center"
        >
          {Object.keys(vehicles).map(
            v =>
              individuals <= vehicles[v as Vehicle].seats && (
                <VehicleItem
                  key={v as Vehicle}
                  price={
                    privateRates[
                      tripType === 'round-trip' ? 'round-trip' : 'one-way'
                    ][zone][v as Vehicle]
                  }
                  seats={String(vehicles[v as Vehicle].seats)}
                  value={v as Vehicle}
                  className={`my-6 ${vehicles[v as Vehicle].imgAspect}`}
                />
              )
          )}
        </RadioGroup>
      </FormControl>
      <div className="w-full text-center">
        <FormMessage />
      </div>
    </FormItem>
  )
}

export type Vehicle = keyof typeof vehicles

type VehicleItemProps = {
  value: Vehicle
  price: number
  seats: string
  className?: string
}

const VehicleItem = ({ value, className, price, seats }: VehicleItemProps) => {
  return (
    <div className="w-1/4">
      <RadioGroupItem value={value} id={value} className="peer sr-only" />
      <Label
        htmlFor={value}
        className="flex cursor-pointer flex-col overflow-hidden rounded-md border-2 border-stone-200 bg-neutral-50 p-4 opacity-40 hover:bg-white hover:text-slate-800 peer-data-[state=checked]:border-slate-800 peer-data-[state=checked]:bg-white peer-data-[state=checked]:opacity-100 [&:has([data-state=checked])]:border-slate-800"
      >
        <span className="text-center text-lg font-bold">
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
        <div className={`relative h-[125px] ${className}`}>
          <Image
            src={`/img/${value}.png`}
            alt={value}
            fill
            className="object-contain"
            sizes="(max-width: 1280px) 100vw, 25vw"
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

export default VehiclesRadio
