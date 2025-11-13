/**
 * WARUM: Social Proof Section – zeigt Vertrauen durch Partnerschaften & Testimonials
 * WIE: Grid mit Logos/Badges + kurzen Texten für SACCO & Community Proof
 * WAS: Belegt, dass M-Recon ernsthafte Partner gewinnt (SACCO-Pilots, Interviews, Waitlist)
 */

import {
  Building2,
  MessageCircleHeart,
  Users,
} from 'lucide-react';

const proofItems = [
  {
    icon: Building2,
    title: 'SACCO pilots kicking off',
    description: 'Pilot discussions underway with Kimisitu SACCO and Nairobi community lenders. Waitlist members get first invites.',
  },
  {
    icon: Users,
    title: '50+ informal earners getting early access',
    description: 'Mama Mbogas, Boda Bodas, Jua Kalis, and freelancers already joined to secure faster loan approvals.',
  },
  {
    icon: MessageCircleHeart,
    title: 'Interviewed with real customers',
    description: '20+ deep interviews with Kenyan SMEs & hustlers shaped the product — we build exactly what lenders request.',
  },
];

export default function SocialProofSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-12">
          Trusted by the People Who Need Loans the Most
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {proofItems.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 text-center border border-gray-100">
              <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-semibold text-text mb-2">
                {item.title}
              </h3>
              <p className="text-text/70">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
