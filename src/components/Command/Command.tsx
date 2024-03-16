'use client'

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Command as CommandPrimitive } from 'cmdk'

import { cn } from '@/lib/utils'

const Command = forwardRef<
  ElementRef<typeof CommandPrimitive>,
  ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      'flex h-full w-full flex-col overflow-hidden rounded-md bg-white text-stone-950 dark:bg-stone-950 dark:text-stone-50',
      className
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

export default Command
