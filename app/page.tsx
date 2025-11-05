/**
 * WARUM: Landing-Page (Home) mit Hero + Problem + Solution + Waitlist-Form + FAQ + Footer
 * WIE: Server-Component (Next.js 14) → schnelles Initial-Load
 * WAS: Kombiniert alle Sections zu einer vollständigen Landing-Page
 * 
 * BEISPIEL-USE:
 * User öffnet http://localhost:3000 → sieht diese Page
 */

import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import SolutionSection from '@/components/SolutionSection';
import WaitlistForm from '@/components/WaitlistForm';

export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemSection />
      <SolutionSection />
      
      {/* Waitlist-Form-Section */}
      <section id="waitlist" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-4">
            Join the Waitlist
          </h2>
          <p className="text-center text-text/70 mb-12 max-w-2xl mx-auto">
            Be among the first 100 to get <strong>lifetime free access</strong> (up to 30 transactions/month).
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
