/**
 * WARUM: Hero-Section (erste Section) – fängt User-Attention + CTA
 * WIE: Gradient-Background, Bold-Headline, CTA-Button (scrollt zu #waitlist)
 * WAS: Zeigt Value-Proposition + Social-Proof ("127 businesses joined")
 * 
 * BEISPIEL-USE:
 * import Hero from '@/components/Hero';
 * <Hero /> // Rendert Hero-Section
 */

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-primary/10 to-background min-h-[80vh] flex items-center">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Headline: Das größte Problem benennen (Pain-Point) */}
          <h1 className="text-4xl md:text-6xl font-bold text-text mb-6 leading-tight">
            Stop Wasting 20 Hours Every Month on{' '}
            <span className="text-primary">M-Pesa Bookkeeping</span>
          </h1>
          
          {/* Subheadline: Die Lösung in 1 Satz */}
          <p className="text-lg md:text-xl text-text/80 mb-8">
            Turn your Safaricom PDF into loan-ready statements in <strong className="text-primary">2 minutes</strong>.
            <br />
            Works for Business, Personal, SACCO, and Chama loans — get approved faster.
            <br />
            <span className="text-sm">🔒 Your data stays private</span>
          </p>
          
          {/* CTA-Button: Scrollt zu Waitlist-Form (Anchor-Link #waitlist) */}
          <Link
            href="#waitlist"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Get Early Access – Free Forever
            <ArrowRight className="w-5 h-5" />
          </Link>
          
          {/* Social-Proof: Wie viele haben schon gesigned-up? */}
          <p className="mt-6 text-sm text-text/60">
            🎉 Join <strong>127+ Mama Mbogas, Boda Bodas & Jua Kalis</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
