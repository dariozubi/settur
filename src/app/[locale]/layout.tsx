import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { locales } from '@/i18n'
import NavigationBar from '@/components/NavigationBar'
import Footer from '@/components/Footer'
import { cn } from '@/lib/utils'

export const runtime = 'edge'
const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'SETTUR',
  description: 'Ground transportation services',
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <NavigationBar />
        <main className="w-full">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}
