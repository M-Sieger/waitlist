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

// Array mit allen FAQ-Items (Updated based on GTM Playbook insights)
const faqs = [
  {
    question: 'Do I need a Safaricom-certified statement?',
    answer: 'Most SACCOs and Chamas accept M-Recon reports for initial loan assessment. Some lenders may require a certified original statement (costs KES 50 from Safaricom) for final approval. M-Recon provides a step-by-step guide if certification is needed.',
  },
  {
    question: 'How much does M-Recon cost?',
    answer: 'Pay KES 200 per report (perfect for one-time loan applications) or KES 400/month for unlimited reports. First 100 users get 3 months completely FREE with no credit card required.',
  },
  {
    question: 'Does this work for Personal Loans too? Or just Business Loans?',
    answer: 'YES! M-Recon works for ANY loan type: Business Loans, Personal Loans, SACCO Loans, Chama Loans, Women\'s Fund, WEF. We organize your M-Pesa income – lenders don\'t care what you call it.',
  },
  {
    question: 'Which banks/institutions accept M-Recon reports?',
    answer: 'Most SACCOs (like Kimisitu, Hazina, Stima), Chamas, and MFIs accept organized M-Pesa reports. Banks may require additional documentation. We\'re actively partnering with lenders to streamline acceptance.',
  },
  {
    question: 'What if my PDF is password-protected?',
    answer: 'M-Recon automatically handles password-protected M-Pesa statements. Just enter your ID number and we\'ll unlock it for you - no need to manually remove the password.',
  },
  {
    question: 'What about my data privacy?',
    answer: 'Your M-Pesa data stays 100% private. We process your statement locally and don\'t store your M-Pesa password or PIN. All reports are encrypted and only accessible by you.',
  },
  {
    question: 'When will M-Recon launch?',
    answer: 'We are targeting Q1 2026. Join the waitlist to be among the first 100 users to test the beta for FREE!',
  },
  {
    question: 'Do I need internet all the time?',
    answer: 'No. Upload your PDF with internet, then access your records offline anytime.',
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
