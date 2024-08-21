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
  title: 'SETTUR | Ground transportation services',
  description: 'Your best option for airport transfers in Los Cabos, México',
  applicationName: 'SETTUR',
  referrer: 'origin-when-cross-origin',
  authors: [{ name: 'Dario Zubillaga', url: 'https://dazu.ma' }],
  creator: 'Dario Zubillaga',
  publisher: 'Dario Zubillaga',
  metadataBase: new URL('https://settur.netlify.app/'),
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
