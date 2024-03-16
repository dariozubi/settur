import { HTMLAttributes, forwardRef } from 'react'

import { cn } from '@/lib/utils'

export const TableBody = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('[&_tr:last-child]:border-0', className)}
    {...props}
  />
))

TableBody.displayName = 'TableBody'
