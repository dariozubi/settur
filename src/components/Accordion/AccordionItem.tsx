import { Item } from '@radix-ui/react-accordion'
import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

export const AccordionItem = forwardRef<
  ElementRef<typeof Item>,
  ComponentPropsWithoutRef<typeof Item>
>(({ className, ...props }, ref) => (
  <Item ref={ref} className={cn('border-b', className)} {...props} />
))

AccordionItem.displayName = 'AccordionItem'
