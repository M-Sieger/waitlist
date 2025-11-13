/**
 * WARUM: Next.js-Konfiguration für Production-Optimierung + i18n
 * WIE: TypeScript-Config mit Image-Optimization, Strict-Mode und next-intl
 * WAS: Definiert wie Next.js die App buildet und served
 */

import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
};

export default withNextIntl(nextConfig);
