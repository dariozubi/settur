'use client'

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Root, Provider } from '@radix-ui/react-toast'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

export const ToastProvider = Provider

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border border-stone-200 p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full dark:border-stone-800',
  {
    variants: {
      variant: {
        default:
          'border bg-white text-stone-950 dark:bg-stone-950 dark:text-stone-50',
        destructive:
          'destructive group border-red-500 bg-red-500 text-stone-50 dark:border-red-900 dark:bg-red-900 dark:text-stone-50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const Toast = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root> & VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = Root.displayName

export default Toast
