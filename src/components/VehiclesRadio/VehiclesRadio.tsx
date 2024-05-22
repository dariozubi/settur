import RadioGroup from '@/components/RadioGroup'
import { FormControl, FormItem, FormMessage } from '@/components/Form'
import { trips, vehicles } from '@/lib/consts'
import { Rate, Vehicle, Zone } from '@prisma/client'
import { VehicleItem } from './VehicleItem'

export type Props = {
  value: string
  onChange: () => void
  tripType: (typeof trips)[number]
  zone: Zone
  individuals: number
  rates: Rate[]
}

function VehiclesRadio({
  value,
  onChange,
  tripType,
  zone,
  individuals,
  rates,
}: Props) {
  return (
    <FormItem>
      <FormControl>
        <RadioGroup
          value={value}
          onValueChange={onChange}
          className="flex w-full flex-wrap justify-center gap-0"
        >
          {Object.keys(vehicles).map(
            v =>
              individuals <= vehicles[v].seats && (
                <VehicleItem
                  key={v as Vehicle}
                  price={
                    rates.find(
                      r =>
                        r.zone === zone &&
                        r.trip ===
                          (tripType === 'round-trip' ? 'ROUND' : 'ONEWAY') &&
                        r.vehicle === v.toUpperCase()
                    )?.value
                  }
                  seats={String(vehicles[v].seats)}
                  value={v as Vehicle}
                  className={`my-2 sm:my-6 ${vehicles[v].imgAspect}`}
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

export default VehiclesRadio
