/**
 * WARUM: Locale-spezifische Route für next-intl, damit /en oder /sw dieselbe Landing-Page rendern
 * WIE: Re-uses den zentralen HomePage-Server-Component und generiert statische Pfade für alle Locales
 * WAS: Verhindert 404s sobald proxy.ts auf Locale-Präfixe weiterleitet
 */

import HomePage from '@/components/HomePage';
import { locales } from '@/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleHomePage() {
  return <HomePage />;
}
