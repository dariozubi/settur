import { withAuth } from 'next-auth/middleware'
import createIntlMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { locales } from './i18n'

const admin = ['/operacion', '/traslados', '/precios', '/ordenes']
const login = ['/login', '/verify', '/unauthorized']

const intlMiddleware = createIntlMiddleware({
  locales,
  localePrefix: 'as-needed',
  defaultLocale: 'es',
})

const authMiddleware = withAuth({
  callbacks: {
    authorized: ({ token }) => token != null,
  },
  pages: {
    signIn: '/admin/login',
    verifyRequest: '/verify',
  },
})

export default function middleware(req: NextRequest) {
  const isAdmin = RegExp(
    `^/admin(${admin.flatMap(p => (p === '/' ? ['', '/'] : p)).join('|')})/?$`,
    'i'
  ).test(req.nextUrl.pathname)

  const isLogin = RegExp(
    `^/admin(${login.flatMap(p => (p === '/' ? ['', '/'] : p)).join('|')})/?$`,
    'i'
  ).test(req.nextUrl.pathname)

  if (isAdmin) {
    return (authMiddleware as any)(req)
  } else if (isLogin) {
    return NextResponse.next()
  } else {
    return intlMiddleware(req)
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|icon|img|_ipx|opengraph-image|twitter-image|apple-icon).*)',
  ],
}
