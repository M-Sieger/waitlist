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
  Timer,
} from 'lucide-react';

// Array mit allen Problem-Karten (für .map() später)
const problems = [
  {
    icon: CreditCard,
    title: 'Loans get rejected because your records aren\'t organized',
    description: 'Whether it\'s a Business Loan, Personal Loan, or SACCO Loan – they all need proof of income. Handwritten notes don\'t cut it.',
  },
  {
    icon: FileText,
    title: 'Every lender demands a clean statement they can trust',
    description: 'Banks, SACCOs, Chamas, Women\'s Fund, WEF – all ask for organized M-Pesa statements showing steady income.',
  },
  {
    icon: Timer,
    title: 'Manual bookkeeping takes hours every month - or gets skipped entirely',
    description: 'Copying 200+ M-Pesa transactions into Excel, fighting with PDF passwords, and reconciling totals is exhausting - or worse, you skip it and get rejected.',
  },
];

export default function ProblemSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Section-Headline */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-4">
          The Problem Every Informal Income Earner Faces
        </h2>
        <p className="text-center text-text/60 mb-12">
          💔 <strong>Over 4 million Kenyans</strong> (14% of adults) get rejected for loans every year*
        </p>
        <p className="text-center text-xs text-text/50 mb-8">
          *FSD Kenya FinAccess Household Survey 2024/2025
        </p>
        
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
