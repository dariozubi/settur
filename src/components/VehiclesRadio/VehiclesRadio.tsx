import Image from 'next/image'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { FormControl, FormItem } from '@/components/ui/form'
import { PropsWithChildren } from 'react'

export type Props = {
  value: string
  onChange: () => void
}

function VehiclesRadio({ value, onChange }: Props) {
  return (
    <FormItem>
      <FormControl>
        <RadioGroup
          defaultValue={value}
          onValueChange={onChange}
          className="flex w-full"
        >
          <VehicleItem value="escalade">
            Escalade
            <div className="relative my-6 aspect-[1775/1057] w-full">
              <Image
                src="/img/escalade.png"
                alt="escalade"
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 25vw"
              />
            </div>
          </VehicleItem>

          <VehicleItem value="suburban">
            Suburban
            <div className="relative my-5 aspect-[689/449] w-full">
              <Image
                src="/img/suburban.png"
                alt="suburban"
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 25vw"
              />
            </div>
          </VehicleItem>

          <VehicleItem value="hiace">
            Hiace
            <div className="relative my-8 aspect-[540/295] w-full">
              <Image
                src="/img/hiace.png"
                alt="hiace"
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 25vw"
              />
            </div>
          </VehicleItem>

          <VehicleItem value="sprinter">
            Sprinter
            <div className="relative my-5 aspect-[747/567] w-full">
              <Image
                src="/img/sprinter.png"
                alt="sprinter"
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 25vw"
              />
            </div>
          </VehicleItem>
        </RadioGroup>
      </FormControl>
    </FormItem>
  )
}

const VehicleItem = ({
  value,
  children,
}: PropsWithChildren<{ value: string }>) => {
  return (
    <div className="w-1/4">
      <RadioGroupItem value={value} id={value} className="peer sr-only" />
      <Label
        htmlFor={value}
        className="flex flex-col items-center rounded-md border-2 border-stone-200 bg-neutral-50 p-4 hover:bg-white hover:text-slate-800 peer-data-[state=checked]:border-slate-800 peer-data-[state=checked]:bg-white [&:has([data-state=checked])]:border-slate-800"
      >
        {children}
      </Label>
    </div>
  )
}

export default VehiclesRadio
