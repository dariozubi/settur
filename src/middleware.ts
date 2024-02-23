import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n";
import { pathnames } from "./navigation";

export default createMiddleware({
  locales: locales,
  defaultLocale: "en",
  pathnames: pathnames,
});

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(es|en)/:path*",

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
