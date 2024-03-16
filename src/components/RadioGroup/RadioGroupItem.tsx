import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Item, Indicator } from '@radix-ui/react-radio-group'
import { Circle } from 'lucide-react'

import { cn } from '@/lib/utils'

export const RadioGroupItem = forwardRef<
  ElementRef<typeof Item>,
  ComponentPropsWithoutRef<typeof Item>
>(({ className, ...props }, ref) => {
  return (
    <Item
      ref={ref}
      className={cn(
        'aspect-square h-4 w-4 rounded-full border border-stone-200 text-stone-900 ring-offset-white focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-50 dark:text-stone-50 dark:ring-offset-stone-950 dark:focus-visible:ring-stone-300',
        className
      )}
      {...props}
    >
      <Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </Indicator>
    </Item>
  )
})
RadioGroupItem.displayName = Item.displayName
