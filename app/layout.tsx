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
  metadataBase: new URL('https://m-recon.com'),
  title: 'M-Recon – Loan-ready M-Pesa reports in 2 minutes',
  description: 'Get approved for loans 3x faster by turning your M-Pesa statements into lender-ready reports that Banks, SACCOs, and Chamas accept.',
  openGraph: {
    title: 'M-Recon – Loan-ready M-Pesa reports in 2 minutes',
    description: 'Stop getting rejected for “insufficient records” – share organized cash-flow proof with any lender.',
    url: 'https://m-recon.com',
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
    title: 'M-Recon – Loan-ready M-Pesa reports in 2 minutes',
    description: 'Turn your M-Pesa history into a loan-ready report trusted by Banks, SACCOs, and Chamas.',
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
