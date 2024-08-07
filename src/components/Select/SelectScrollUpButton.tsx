import * as React from 'react'
import { ScrollUpButton } from '@radix-ui/react-select'
import { ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

export const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof ScrollUpButton>
>(({ className, ...props }, ref) => (
  <ScrollUpButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </ScrollUpButton>
))
SelectScrollUpButton.displayName = ScrollUpButton.displayName
