import { TdHTMLAttributes, forwardRef } from 'react'

import { cn } from '@/lib/utils'

export const TableCell = forwardRef<
  HTMLTableCellElement,
  TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      'px-4 py-2 align-middle [&:has([role=checkbox])]:pr-0',
      className
    )}
    {...props}
  />
))

TableCell.displayName = 'TableCell'
