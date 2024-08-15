import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { cn } from '@/lib/utils'
import '../globals.css'
import ReactQueryProvider from '@/providers/ReactQueryProvider'
import ErrorBoundary from '@/components/ErrorBoundary'

const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'SETTUR',
  description: 'Ground transportation services',
}

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <html lang="es">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <ReactQueryProvider>
          <ErrorBoundary fallback={'Error'}>{children}</ErrorBoundary>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
