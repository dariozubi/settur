import createMiddleware from 'next-intl/middleware'
import { locales } from './i18n'

export default createMiddleware({
  locales: locales,
  defaultLocale: 'es',
})

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(es|en)/:path*'],
}
