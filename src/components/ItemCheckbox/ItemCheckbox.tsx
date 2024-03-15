import { FormControl, FormItem, FormLabel } from '../ui/form'
import { Checkbox } from '../ui/checkbox'

export type Props = {
  label: string
  id: string
  onChange: (_v: string[]) => void
  value: string[]
}

function ItemCheckbox({ label, id, value, onChange }: Props) {
  return (
    <FormItem
      key={id}
      className="flex flex-row items-start space-x-3 space-y-0"
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
