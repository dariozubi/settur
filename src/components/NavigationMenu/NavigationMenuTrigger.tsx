import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Trigger } from '@radix-ui/react-navigation-menu'
import { cva } from 'class-variance-authority'
import { ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'

export const navigationMenuTriggerStyle = cva(
  'group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-stone-100 hover:text-stone-900 focus:bg-stone-100 focus:text-stone-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-stone-100/50 data-[state=open]:bg-stone-100/50 dark:bg-stone-950 dark:hover:bg-stone-800 dark:hover:text-stone-50 dark:focus:bg-stone-800 dark:focus:text-stone-50 dark:data-[active]:bg-stone-800/50 dark:data-[state=open]:bg-stone-800/50'
)

export const NavigationMenuTrigger = forwardRef<
  ElementRef<typeof Trigger>,
  ComponentPropsWithoutRef<typeof Trigger>
>(({ className, children, ...props }, ref) => (
  <Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), 'group', className)}
    {...props}
  >
    {children}
    {''}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </Trigger>
))

NavigationMenuTrigger.displayName = Trigger.displayName
