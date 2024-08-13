import { withAuth } from 'next-auth/middleware'
import createIntlMiddleware from 'next-intl/middleware'
import { NextRequest } from 'next/server'
import { locales } from './i18n'

const privates = ['/dashboard', '/servicios']

const intlMiddleware = createIntlMiddleware({
  locales,
  localePrefix: 'as-needed',
  defaultLocale: 'es',
})

const authMiddleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req)
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: '/login',
      verifyRequest: '/verify',
    },
  }
)

export default function middleware(req: NextRequest) {
  const privatePages = RegExp(
    `^(/(${locales.join('|')}))?(${privates
      .flatMap(p => (p === '/' ? ['', '/'] : p))
      .join('|')})/?$`,
    'i'
  )
  const isPrivate = privatePages.test(req.nextUrl.pathname)

  if (isPrivate) {
    return (authMiddleware as any)(req)
  } else {
    return intlMiddleware(req)
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|img|_ipx).*)'],
}
