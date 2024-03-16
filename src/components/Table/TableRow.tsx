import { HTMLAttributes, forwardRef } from 'react'

import { cn } from '@/lib/utils'

export const TableRow = forwardRef<
  HTMLTableRowElement,
  HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'border-b transition-colors hover:bg-stone-100/50 data-[state=selected]:bg-stone-100 dark:hover:bg-stone-800/50 dark:data-[state=selected]:bg-stone-800',
      className
    )}
    {...props}
  />
))

TableRow.displayName = 'TableRow'
