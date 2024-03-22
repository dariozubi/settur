import Image from 'next/image'
import { User } from 'lucide-react'

import Label from '@/components/Label'
import RadioGroup, { RadioGroupItem } from '@/components/RadioGroup'
import { FormControl, FormItem, FormMessage } from '@/components/Form'
import { trips, vehicles } from '@/lib/consts'
import { Rate, Vehicle, Zone } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

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
  const { isLoading, error, data } = useQuery<{ rates: Rate[] }>({
    queryKey: ['rates'],
    queryFn: async () => axios.get('/api/rates').then(r => r.data),
    staleTime: Infinity,
  })

  if (error) throw Error('Rates endpoint is not working')
  if (isLoading) return null
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
              individuals <= vehicles[v].seats && (
                <VehicleItem
                  key={v as Vehicle}
                  price={
                    data?.rates &&
                    data.rates.find(
                      r =>
                        r.zone === zone &&
                        r.trip ===
                          (tripType === 'round-trip' ? 'ROUND' : 'ONEWAY') &&
                        r.vehicle === v.toUpperCase()
                    )?.value
                  }
                  seats={String(vehicles[v].seats)}
                  value={v as Vehicle}
                  className={`my-6 ${vehicles[v].imgAspect}`}
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

type VehicleItemProps = {
  value: Vehicle
  price?: number
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
          {value.charAt(0) + value.slice(1).toLowerCase()}
        </span>
        <div className={`relative h-[125px] ${className}`}>
          <Image
            src={`/img/${value}.png`}
            alt={value}
            fill
            className="pointer-events-none object-contain"
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
