/**
 * WARUM: Root-Layout für gesamte Next.js-App (SEO, Fonts, Analytics)
 * WIE: Meta-Tags (OpenGraph, Twitter), Inter-Font, Plausible-Analytics
 * WAS: Wrapper für alle Pages – definiert HTML-Structure + Global-Styles
 * 
 * BEISPIEL-USE:
 * Wird automatisch von Next.js um alle Pages gewickelt
 */

import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

// Inter-Font von Google Fonts laden
const inter = Inter({ subsets: ['latin'] });

// SEO-Meta-Tags (für Social-Media-Previews, Google-Search)
export const metadata: Metadata = {
  title: 'M-Recon – M-Pesa Bookkeeping for Kenyan SMEs',
  description: 'Turn your Safaricom M-Pesa PDF into organized financial records in 2 minutes. Built for small Kenyan businesses.',
  openGraph: {
    title: 'M-Recon – M-Pesa Bookkeeping for Kenyan SMEs',
    description: 'Stop wasting 20 hours every month on M-Pesa bookkeeping.',
    url: 'https://m-recon.vercel.app',
    siteName: 'M-Recon',
    images: [
      {
        url: '/og-image.png', // 1200x630px (User muss später erstellen)
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'M-Recon – M-Pesa Bookkeeping for Kenyan SMEs',
    description: 'Stop wasting 20 hours every month on M-Pesa bookkeeping.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Plausible Analytics (privacy-friendly, kein Cookie-Banner nötig) */}
        <Script
          defer
          data-domain="m-recon.vercel.app"
          src="https://plausible.io/js/script.js"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
