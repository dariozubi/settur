'use client'

import Image from 'next/image'
import { Mail, Phone } from 'lucide-react'

import NavigationMenu, {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/NavigationMenu'
import { Link } from '@/navigation'
import { cn } from '@/lib/utils'
import { LanguageSelector } from './LanguageSelector'
import { useTranslations } from 'next-intl'

function NavigationBar() {
  const t = useTranslations('Navigation')
  return (
    <div className="mx-auto flex max-w-screen-xl justify-between bg-transparent">
      <Link href="/" className="relative aspect-[978/182] w-[100px]">
        <Image
          src="/img/logo.png"
          alt="logo"
          fill
          className="pointer-events-none object-contain"
          sizes="(max-width: 1280px) 100vw, 33vw"
        />
      </Link>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/"
              className={cn(navigationMenuTriggerStyle(), 'bg-transparent')}
            >
              {t('about')}
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent">
              {t('contact')}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul>
                <li>
                  <NavigationMenuLink asChild>
                    <a
                      href="mailto:info@settur.com.mx"
                      className="flex items-center gap-1 p-4"
                    >
                      <Mail size={14} />

                      <span className="text-sm font-medium">
                        info@settur.com.mx
                      </span>
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <a
                      href="tel:+525531455826"
                      className="flex items-center gap-1 p-4"
                    >
                      <Phone size={14} />

                      <span className="text-sm font-medium">+525531455826</span>
                    </a>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <LanguageSelector />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

export default NavigationBar
