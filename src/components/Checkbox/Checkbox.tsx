'use client'

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Root, Indicator } from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'

const Checkbox = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, ref) => (
  <Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-stone-200 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-stone-900 data-[state=checked]:text-stone-50 dark:border-stone-50 dark:ring-offset-stone-950 dark:focus-visible:ring-stone-300 dark:data-[state=checked]:bg-stone-50 dark:data-[state=checked]:text-stone-900',
      className
    )}
    {...props}
  >
    <Indicator className={cn('flex items-center justify-center text-current')}>
      <Check className="h-4 w-4" />
    </Indicator>
  </Root>
))
Checkbox.displayName = Root.displayName

export default Checkbox
