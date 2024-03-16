import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export const TableFooter = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'border-t bg-stone-100/50 font-medium dark:bg-stone-800/50 [&>tr]:last:border-b-0',
      className
    )}
    {...props}
  />
))

TableFooter.displayName = 'TableFooter'
