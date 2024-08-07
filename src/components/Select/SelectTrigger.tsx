import { cn } from '@/lib/utils'
import { Trigger, Icon, SelectTriggerProps } from '@radix-ui/react-select'
import { ChevronDown } from 'lucide-react'
import React from 'react'

type ExtendedTrigger = React.ForwardRefExoticComponent<
  SelectTriggerProps & {
    noIcon?: boolean
  } & React.RefAttributes<HTMLButtonElement>
>

export const SelectTrigger = React.forwardRef<
  React.ElementRef<ExtendedTrigger>,
  React.ComponentPropsWithoutRef<ExtendedTrigger>
>(({ className, children, noIcon, ...props }, ref) => (
  <Trigger
    ref={ref}
    className={cn(
      'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
      className
    )}
    {...props}
  >
    {children}
    {!noIcon && (
      <Icon asChild>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </Icon>
    )}
  </Trigger>
))

SelectTrigger.displayName = Trigger.displayName
