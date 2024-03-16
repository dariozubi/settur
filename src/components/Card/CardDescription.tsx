import { cn } from '@/lib/utils'
import { HTMLAttributes, forwardRef } from 'react'

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-stone-500 dark:text-stone-400', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'
