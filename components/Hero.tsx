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
          
          {/* Headline: LOAN-ACCESS VALUE PROP (nicht time-saving!) */}
          <h1 className="text-4xl md:text-6xl font-bold text-text mb-6 leading-tight">
            Get Approved for Your Next Loan{' '}
            <span className="text-primary">3x Faster</span>
          </h1>

          {/* Subheadline: Outcome-focused (was bekommt der User?) */}
          <p className="text-lg md:text-xl text-text/80 mb-8">
            Turn your M-Pesa statements into professional loan reports accepted by Banks, SACCOs, and Chamas – in <strong className="text-primary">2 minutes</strong>.
            <br />
            <span className="text-sm">🔒 Your data stays private</span>
          </p>
          
          {/* CTA-Button: Scrollt zu Waitlist-Form (Anchor-Link #waitlist) */}
          <Link
            href="#waitlist"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Get Early Access – Free for First 100
            <ArrowRight className="w-5 h-5" />
          </Link>
          
          {/* Social-Proof: Ehrliche Zahlen (keine Fake-Numbers!) */}
          <p className="mt-6 text-sm text-text/60">
            🎉 Join <strong>50+ informal earners getting early access</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
