import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Command as CommandPrimitive } from 'cmdk'

import { cn } from '@/lib/utils'

export const CommandItem = forwardRef<
  ElementRef<typeof CommandPrimitive.Item>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-stone-100 aria-selected:text-stone-900 data-[disabled='true']:pointer-events-none data-[disabled='true']:opacity-50 dark:aria-selected:bg-stone-800 dark:aria-selected:text-stone-50",
      className
    )}
    {...props}
  />
))

CommandItem.displayName = CommandPrimitive.Item.displayName
