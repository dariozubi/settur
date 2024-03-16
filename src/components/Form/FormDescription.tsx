import { HTMLAttributes, forwardRef } from 'react'

import { cn } from '@/lib/utils'
import { useFormField } from './useFormField'

export const FormDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn('text-sm text-stone-500 dark:text-stone-400', className)}
      {...props}
    />
  )
})
FormDescription.displayName = 'FormDescription'
