/**
 * WARUM: Pricing-Section – zeigt Free vs. Premium Angebot für Waitlist Visitors
 * WIE: Zwei Preis-Karten mit Feature-Listen, die Loan-Value hervorheben
 * WAS: Klärt Erwartung vor Launch (Pricing, Loan-Referral Benefit, Limits)
 */

const tiers = [
  {
    name: 'Early Access',
    price: 'FREE',
    highlight: '3 months free - First 100 only',
    features: [
      '50 transactions/month included',
      'Bank-ready PDF report + Excel export',
      'Manual lender sharing',
      'Community WhatsApp support',
    ],
    badge: 'Waitlist Exclusive',
  },
  {
    name: 'Growth (After Trial)',
    price: 'KES 499/mo',
    highlight: 'Available after your 3-month trial',
    features: [
      'Unlimited transactions',
      'Bank-ready PDF + Excel export (unlimited)',
      'Automated lender sharing (Banks, SACCOs, Chamas)',
      'Loan referral introductions',
      'Priority support + onboarding call',
    ],
    badge: 'Coming Soon',
  },
];

export default function PricingSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-4">
          Join the Waitlist - First 100 Get Free Access
        </h2>
        <p className="text-center text-text/70 mb-12 max-w-2xl mx-auto">
          Be among the first to use M-Recon. Early access includes 3 months free, then decide if you want to upgrade for unlimited features.
        </p>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <div key={tier.name} className="border border-gray-200 rounded-2xl p-8 shadow-sm bg-background/50">
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                  {tier.badge}
                </span>
                <p className="text-sm text-text/60">{tier.highlight}</p>
              </div>
              <h3 className="text-2xl font-semibold text-text mb-2">{tier.name}</h3>
              <p className="text-3xl font-bold text-primary mb-6">{tier.price}</p>
              <ul className="space-y-3 text-text/80">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
