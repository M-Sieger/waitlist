/**
 * WARUM: Zentrale i18n-Konfiguration für Next.js Internationalization
 * WIE: next-intl mit lokalisierten Routing (en/sw)
 * WAS: Definiert verfügbare Locales und Default-Locale
 */

import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Verfügbare Sprachen
export const locales = ['en', 'sw'] as const;
export type Locale = (typeof locales)[number];

// Default-Sprache
export const defaultLocale: Locale = 'en';

export default getRequestConfig(async ({ locale }) => {
  // Validate that die übergebene Locale existiert
  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  const normalizedLocale = locale as Locale;

  return {
    locale: normalizedLocale,
    messages: (await import(`./messages/${normalizedLocale}.json`)).default,
  };
});
