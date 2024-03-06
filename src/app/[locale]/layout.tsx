import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { locales } from '@/i18n'
import NavigationBar from '@/components/NavigationBar'
import Footer from '@/components/Footer'
import { Providers } from './providers'

export const runtime = 'edge'
const inter = Inter({ subsets: ['latin'] })

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
    <html lang={locale} className="light">
      <body className={inter.className}>
        <Providers>
          <NavigationBar />
          <main className="w-full">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}
