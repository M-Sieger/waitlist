/**
 * WARUM: Problem-Section – zeigt die 3 größten Pain-Points der Zielgruppe
 * WIE: Grid mit Icons (Lucide-React) + Headline + Description
 * WAS: Macht User klar: "Das sind MEINE Probleme" (Empathy)
 * 
 * BEISPIEL-USE:
 * import ProblemSection from '@/components/ProblemSection';
 * <ProblemSection /> // Rendert 3 Pain-Points
 */

import {
  CreditCard,
  FileText,
  Lock,
} from 'lucide-react';

// Array mit allen Problem-Karten (für .map() später)
const problems = [
  {
    icon: FileText,
    title: 'Spending hours copying M-Pesa statements to Excel',
    description: 'Every month, you manually type 200+ transactions. It\'s exhausting.',
  },
  {
    icon: Lock,
    title: 'Password-protected PDFs are a nightmare',
    description: 'Safaricom locks your statement. You can\'t copy, can\'t search.',
  },
  {
    icon: CreditCard,
    title: 'Loan applications rejected due to "insufficient records"',
    description: 'Banks and WEF need clean records. Your Excel sheets aren\'t enough.',
  },
];

export default function ProblemSection(): JSX.Element {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Section-Headline */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-12">
          The Problem Every Small Business Faces
        </h2>
        
        {/* Problem-Grid: 3 Spalten auf Desktop, 1 Spalte auf Mobile */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {problems.map((problem, index) => (
            <div key={index} className="text-center">
              {/* Icon-Circle: Roter Hintergrund (Secondary-Color) */}
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <problem.icon className="w-8 h-8 text-secondary" />
              </div>
              
              {/* Problem-Title */}
              <h3 className="text-lg font-semibold text-text mb-2">
                {problem.title}
              </h3>
              
              {/* Problem-Description */}
              <p className="text-text/70">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
