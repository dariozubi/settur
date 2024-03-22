import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { cn } from '@/lib/utils'
import '../globals.css'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import ReactQueryProvider from '@/providers/ReactQueryProvider'

const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'SETTUR',
  description: 'Ground transportation services',
}

type Props = {
  children: ReactNode
  params: { locale: string }
}

export default function LocaleLayout({ children, params: { locale } }: Props) {
  const messages = useMessages()

  return (
    <html lang={locale}>
      <body
        className={cn(
          'bg-background min-h-screen font-sans antialiased',
          fontSans.variable
        )}
      >
        <ReactQueryProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
