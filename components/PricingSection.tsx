/**
 * WARUM: Pricing-Section – zeigt Pay-Per-Report Modell (nicht Subscription-first!)
 * WIE: 3 Preis-Karten: Free (View-Only), Pay-Per-Report (KES 200), Monthly (KES 400)
 * WAS: Klärt Erwartung: Kenyans prefer pay-per-use (like M-Pesa) statt Subscriptions
 *
 * GTM INSIGHT: 60% Free users, 30% pay KES 200/report, 10% subscribe KES 400/month
 */

const tiers = [
  {
    name: 'Free',
    price: 'KES 0',
    highlight: 'Try M-Recon risk-free',
    features: [
      '3-month M-Pesa analysis',
      'View-only report (no download)',
      'Income & expense breakdown',
      'Community support',
    ],
    badge: 'Always Free',
    isPopular: false,
  },
  {
    name: 'Pay-Per-Report',
    price: 'KES 200',
    highlight: 'Perfect for one-time loan applications',
    features: [
      '6-month full report (up to 12 months)',
      'PDF + Excel export',
      'Income/Expense categorization',
      'Ready for SACCOs, Banks, Chamas',
      'Valid for 30 days',
    ],
    badge: 'Most Popular',
    isPopular: true,
  },
  {
    name: 'Monthly',
    price: 'KES 400/mo',
    highlight: 'For heavy users & Chama leaders',
    features: [
      'Unlimited reports',
      '12-month history',
      'Expense tracking dashboard',
      'Priority support',
      'Early access to new features',
    ],
    badge: 'Best Value',
    isPopular: false,
  },
];

export default function PricingSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-4">
          Simple Pricing - Pay Only When You Need a Report
        </h2>
        <p className="text-center text-text/70 mb-12 max-w-2xl mx-auto">
          No subscriptions required. Pay KES 200 per report, or go unlimited for KES 400/month. First 100 users get 3 months FREE. 🎉
        </p>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`border-2 rounded-2xl p-8 shadow-sm relative ${
                tier.isPopular
                  ? 'border-primary bg-primary/5 scale-105'
                  : 'border-gray-200 bg-white'
              }`}
            >
              {/* Badge */}
              <div className="flex items-center justify-center mb-4">
                <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                  tier.isPopular
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {tier.badge}
                </span>
              </div>

              {/* Pricing */}
              <h3 className="text-xl font-semibold text-text mb-2 text-center">{tier.name}</h3>
              <p className="text-4xl font-bold text-primary mb-2 text-center">{tier.price}</p>
              <p className="text-sm text-text/60 mb-6 text-center h-10">{tier.highlight}</p>

              {/* Features */}
              <ul className="space-y-3 text-text/80 text-sm mb-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8">
          <p className="text-sm text-text/60">
            💡 <strong>First 100 users get FREE access for 3 months</strong> - then choose the plan that fits your needs.
          </p>
        </div>
      </div>
    </section>
  );
}
