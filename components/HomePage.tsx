/**
 * WARUM: Zentraler Page-Container für die Landing-Page
 * WIE: Kombiniert Hero, Problem, Solution, Proof, Social Proof, Pricing, Waitlist, FAQ und Footer
 * WAS: Stellt die komplette Waitlist-Erfahrung bereit, damit wir denselben Aufbau für / und /[locale] nutzen können
 */

import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import LoanReportProof from '@/components/LoanReportProof';
import PricingSection from '@/components/PricingSection';
import ProblemSection from '@/components/ProblemSection';
import SocialProofSection from '@/components/SocialProofSection';
import SolutionSection from '@/components/SolutionSection';
import WaitlistForm from '@/components/WaitlistForm';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <LoanReportProof />
      <SocialProofSection />
      <PricingSection />

      {/* Waitlist-Form-Section */}
      <section id="waitlist" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-4">
            Join the Waitlist
          </h2>
          <p className="text-center text-text/70 mb-12 max-w-2xl mx-auto">
            Be among the first 100 to use the beta free of charge (up to 30 transactions/month) until public pricing rolls out.
            We will notify you when M-Recon launches.
          </p>
          <WaitlistForm />
        </div>
      </section>

      {/* FAQ-Section */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </main>
  );
}
