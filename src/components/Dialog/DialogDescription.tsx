import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Description } from '@radix-ui/react-dialog'

import { cn } from '@/lib/utils'

export const DialogDescription = forwardRef<
  ElementRef<typeof Description>,
  ComponentPropsWithoutRef<typeof Description>
>(({ className, ...props }, ref) => (
  <Description
    ref={ref}
    className={cn('text-sm text-stone-500 dark:text-stone-400', className)}
    {...props}
  />
))
DialogDescription.displayName = Description.displayName
