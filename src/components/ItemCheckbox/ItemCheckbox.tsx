import { FormControl, FormItem, FormLabel } from '@/components/Form'
import Checkbox from '@/components/Checkbox'
import { cn } from '@/lib/utils'

export type Props = {
  label: string
  id: string
  onChange: (_v: string[]) => void
  value: string[]
  className?: string
}

function ItemCheckbox({ label, id, value, onChange, className }: Props) {
  return (
    <FormItem
      key={id}
      className={cn('flex flex-row items-start space-x-3 space-y-0', className)}
    >
      <FormControl>
        <Checkbox
          checked={value?.includes(id)}
          onCheckedChange={checked => {
            return checked
              ? onChange([...value, id])
              : onChange(value?.filter((value: string) => value !== id))
          }}
        />
      </FormControl>
      <FormLabel className="font-normal">{label}</FormLabel>
    </FormItem>
  )
}

export default ItemCheckbox
