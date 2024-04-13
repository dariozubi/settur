import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { cn } from '@/lib/utils'
import '../globals.css'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import ReactQueryProvider from '@/providers/ReactQueryProvider'
import ErrorBoundary from '@/components/ErrorBoundary'
import ErrorPage from '@/components/ErrorPage'

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
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <ReactQueryProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ErrorBoundary fallback={<ErrorPage />}>{children}</ErrorBoundary>
          </NextIntlClientProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
