/**
 * WARUM: Next.js Proxy (ehemals Middleware) für Locale-Routing
 * WIE: next-intl createMiddleware entscheidet anhand von Locale + Cookies
 * WAS: Leitet Requests auf korrekte Sprach-Pfade und schützt vor ungültigen Locale-Aufrufen
 */

import createMiddleware from 'next-intl/middleware';

import {
  defaultLocale,
  locales,
} from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
});

export const config = {
  matcher: ['/', '/(en|sw)/:path*'],
};
