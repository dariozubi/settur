import { HTMLAttributes, forwardRef } from 'react'

import { cn } from '@/lib/utils'

export const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('my-4 text-sm text-stone-500 dark:text-stone-400', className)}
    {...props}
  />
))
TableCaption.displayName = 'TableCaption'
