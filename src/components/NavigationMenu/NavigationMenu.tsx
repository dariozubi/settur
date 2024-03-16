import { Root, Item, Link } from '@radix-ui/react-navigation-menu'

import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { NavigationMenuViewport } from './NavigationMenuViewport'

const NavigationMenu = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(({ className, children, ...props }, ref) => (
  <Root
    ref={ref}
    className={cn(
      'relative z-10 flex max-w-max flex-1 items-center justify-center',
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </Root>
))
NavigationMenu.displayName = Root.displayName

export const NavigationMenuItem = Item

export const NavigationMenuLink = Link

export default NavigationMenu
