/**
 * WARUM: FAQ-Section mit Accordion (User kann Fragen auf/zuklappen)
 * WIE: Client-Component mit useState (für Toggle-Logic)
 * WAS: Beantwortet häufigste Fragen (Pricing, Privacy, Launch-Date, etc.)
 * 
 * BEISPIEL-USE:
 * import FAQ from '@/components/FAQ';
 * <FAQ /> // Rendert Accordion mit allen FAQs
 */

'use client';

import { useState } from 'react';

import {
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

// Array mit allen FAQ-Items
const faqs = [
  {
    question: 'How much will M-Recon cost?',
    answer: 'KES 500/month. First 100 waitlist members get lifetime free access for up to 30 transactions/month.',
  },
  {
    question: 'Do I need internet all the time?',
    answer: 'No. Upload your PDF with internet, then access your records offline anytime.',
  },
  {
    question: 'What about my data privacy?',
    answer: 'Your financial data is encrypted and stored securely on Kenyan servers. We never share it with third parties.',
  },
  {
    question: 'When will M-Recon launch?',
    answer: 'We are targeting Q1 2026. Join the waitlist to be the first to know and test the beta!',
  },
  {
    question: 'Which banks/institutions accept M-Recon records?',
    answer: 'We are working with WEF and several Kenyan banks. Our records format meets standard loan application requirements.',
  },
];

export default function FAQ() {
  // State: Welche FAQ ist gerade offen? (null = alle zu)
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        
        {/* Section-Headline */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-12">
          Frequently Asked Questions
        </h2>
        
        {/* FAQ-Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm">
              
              {/* Question-Button (togglet Antwort auf/zu) */}
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-semibold text-text">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-text/40 flex-shrink-0" />
                )}
              </button>
              
              {/* Answer (wird nur gezeigt wenn openIndex === index) */}
              {openIndex === index && (
                <div className="px-6 pb-6 text-text/70">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
