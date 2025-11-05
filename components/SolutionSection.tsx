/**
 * WARUM: Solution-Section – zeigt wie M-Recon funktioniert (3 Steps)
 * WIE: 3 Cards mit Step-Number + Icon + Title + Description
 * WAS: Macht User klar: "So einfach ist das" (Simplicity)
 * 
 * BEISPIEL-USE:
 * import SolutionSection from '@/components/SolutionSection';
 * <SolutionSection /> // Rendert 3-Step-Flow
 */

import {
  FileCheck,
  Upload,
  Zap,
} from 'lucide-react';

// Array mit allen Solution-Steps (für .map() später)
const steps = [
  {
    icon: Upload,
    step: '1',
    title: 'Upload your Safaricom M-Pesa statement',
    description: 'PDF, CSV, or Screenshot – we handle password-protected files.',
  },
  {
    icon: Zap,
    step: '2',
    title: 'We parse it automatically',
    description: '2 minutes later, your data is organized and categorized.',
  },
  {
    icon: FileCheck,
    step: '3',
    title: 'Get organized records ready for loan applications',
    description: 'Export to Excel, PDF, or share directly with banks/WEF.',
  },
];

export default function SolutionSection(): JSX.Element {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        
        {/* Section-Headline */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-12">
          How M-Recon Works
        </h2>
        
        {/* Steps-Grid: 3 Spalten auf Desktop, 1 Spalte auf Mobile */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((stepItem, index) => (
            <div key={index} className="relative">
              
              {/* Step-Number-Badge: Grüner Kreis mit Nummer (oben links) */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">
                {stepItem.step}
              </div>
              
              {/* Card: Weißer Hintergrund mit Schatten */}
              <div className="bg-white p-6 rounded-lg shadow-sm pt-8">
                {/* Icon: Grüne Farbe (Primary) */}
                <stepItem.icon className="w-12 h-12 text-primary mb-4" />
                
                {/* Step-Title */}
                <h3 className="text-lg font-semibold text-text mb-2">
                  {stepItem.title}
                </h3>
                
                {/* Step-Description */}
                <p className="text-text/70">
                  {stepItem.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
