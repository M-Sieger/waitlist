/**
 * WARUM: Grace's 10 SME Interviews + Quantitative Validation (see docs/PDF-POC-PLAN.md)
 * WIE: Multi-step form mit 13 Fragen (Option C: Conditional Rendering), KES 150 payment incentive
 * WAS: Validation Survey Page - Product-Market Fit Testing + WTP Analysis
 * 
 * OPTIMIZATION (Option C):
 * - 13 questions total (removed Q9 + Q12 textarea fields - UX friction)
 * - Conditional rendering: Q5 only shows if Q4="Yes", Q6 only if Q5="Rejected"
 * - Loan messaging updated: "any type of loan" (Business, Personal, SACCO, Chama)
 * - Faster completion: 5-7 min instead of 8+ min
 */

'use client';

import React, { useState } from 'react';

import {
  AlertCircle,
  CheckCircle,
  DollarSign,
  TrendingUp,
} from 'lucide-react';

export default function ValidationSurveyPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic questions array based on responses (Option C: Conditional Rendering)
  const getVisibleQuestions = () => {
    const allQuestions = [
      // SECTION 1: SEGMENTATION
      {
        id: 'business_type',
        section: 'About Your Business',
        question: '1. What type of business do you operate?',
        type: 'radio',
        options: [
          'Duka/Shop',
          'Mama Mboga (Vegetables/Fruits)',
          'Salon/Barber',
          'Food Kiosk/Restaurant',
          'Mitumba (Second-hand clothes)',
          'Boda Boda',
          'Jua Kali (Mechanic/Welder/Carpenter)',
          'Other'
        ]
      },
      {
        id: 'sacco_member',
        section: 'About Your Business',
        question: '2. Are you a member of a SACCO or Chama?',
        type: 'radio',
        options: [
          'Yes, SACCO member',
          'Yes, Chama member',
          'Yes, both',
          'No'
        ]
      },
      
      // SECTION 2: M-PESA USAGE & PAST BEHAVIOR
      {
        id: 'mpesa_usage',
        section: 'M-Pesa Usage',
        question: '3. How do you use M-Pesa? (Select all that apply)',
        type: 'checkbox',
        options: [
          'Receive customer payments',
          'Pay suppliers',
          'Withdraw cash',
          'Pay bills (electricity, rent)',
          'Personal transfers',
          'Save money'
        ]
      },
      {
        id: 'loan_applied',
        section: 'Loan Experience',
        question: '4. Have you ever applied for any type of loan? (Business, Personal, SACCO, Chama, etc.)',
        type: 'radio',
        options: ['Yes', 'No']
      },
      // CONDITIONAL Q5: Only show if Q4 = "Yes"
      ...(responses.loan_applied === 'Yes' ? [{
        id: 'loan_outcome',
        section: 'Loan Experience',
        question: '5. What was the outcome of your loan application?',
        type: 'radio',
        options: [
          'Approved',
          'Rejected',
          'Still waiting'
        ]
      }] : []),
      // CONDITIONAL Q6: Only show if Q5 = "Rejected"
      ...(responses.loan_outcome === 'Rejected' ? [{
        id: 'rejection_reason',
        section: 'Loan Experience',
        question: '6. What reason were you given for rejection?',
        type: 'radio',
        options: [
          'Insufficient financial records',
          'No bank account',
          'No collateral',
          'Credit history issues',
          'Other/Don\'t know'
        ]
      }] : []),
      
      // SECTION 3: CURRENT PAIN POINTS
      {
        id: 'record_keeping',
        section: 'Current Record Keeping',
        question: '7. How do you currently track your income and expenses?',
        type: 'radio',
        options: [
          'Handwritten notebook',
          'Excel/Spreadsheet',
          'M-Pesa statements only',
          'I don\'t track regularly',
          'Accounting software/app'
        ]
      },
      {
        id: 'time_spent',
        section: 'Current Record Keeping',
        question: '8. How much time do you spend per MONTH organizing financial records for loan applications?',
        type: 'radio',
        options: [
          'I don\'t do this',
          'Less than 2 hours',
          '2-5 hours',
          '5-10 hours',
          'More than 10 hours'
        ]
      },
      
      // SECTION 4: PAIN QUANTIFICATION
      {
        id: 'time_savings',
        section: 'Time & Cost',
        question: '9. If loan approval took 5 minutes instead of days/weeks, how much would that help you?',
        type: 'radio',
        options: [
          'Not helpful',
          'Slightly helpful',
          'Very helpful - would save 1-2 hours per application',
          'Extremely helpful - would save 5+ hours per application',
          'Game-changing - would apply for loans more often'
        ]
      },
      
      // SECTION 5: SOLUTION FIT
      {
        id: 'solution_fit',
        section: 'Solution',
        question: '10. If you had an app that automatically analyzes your M-Pesa statements and shows: monthly income, expenses, and loan qualification - would that help?',
        type: 'radio',
        options: [
          'No, I don\'t need this',
          'Maybe helpful',
          'Yes, very helpful',
          'Yes, this would solve my biggest problem'
        ]
      },
      
      // SECTION 6: WILLINGNESS TO PAY (3-PART)
      {
        id: 'current_spending',
        section: 'Pricing',
        question: '11. Do you currently pay for any tools to help with bookkeeping or loan applications?',
        type: 'radio',
        options: [
          'No, I use free tools only',
          'Yes, KES 100-500/month',
          'Yes, KES 500-1,000/month',
          'Yes, KES 1,000-3,000/month',
          'Yes, more than KES 3,000/month'
        ]
      },
      {
        id: 'free_trial',
        section: 'Pricing',
        question: '12. If M-Recon offered a FREE 1-month trial (no payment needed), would you try it?',
        type: 'radio',
        options: [
          'Yes, definitely',
          'Yes, probably',
          'Maybe',
          'No'
        ]
      },
      {
        id: 'paid_commitment',
        section: 'Pricing',
        question: '13. After a free trial, if M-Recon costs KES 500/month, would you continue paying?',
        type: 'radio',
        options: [
          'Yes, definitely worth it',
          'Yes, if it helps me get a loan',
          'Maybe, depends on results',
          'No, too expensive',
          'No, I prefer free tools'
        ]
      },
      
      // SECTION 7: CONTACT
      {
        id: 'phone_number',
        section: 'Payment',
        question: '14. Your M-Pesa phone number (for KES 150 payment)',
        type: 'text',
        placeholder: '07XXXXXXXX or 254XXXXXXXXX'
      }
    ];

    return allQuestions;
  };

  const questions = getVisibleQuestions();

  const handleResponse = (questionId: string, value: any) => {
    setResponses({ ...responses, [questionId]: value });
  };

  const handleCheckboxChange = (questionId: string, option: string) => {
    const current = responses[questionId] || [];
    const updated = current.includes(option)
      ? current.filter((item: string) => item !== option)
      : [...current, option];
    setResponses({ ...responses, [questionId]: updated });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/validation-survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...responses,
          submitted_at: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Survey submission error:', error);
      alert('Sorry, submission failed. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentQuestion = questions[currentStep];
  const isLastQuestion = currentStep === questions.length - 1;
  const hasResponse = responses[currentQuestion.id] !== undefined && responses[currentQuestion.id] !== '';

  // Success Screen
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Asante Sana! 🎉
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Your responses have been recorded successfully.
          </p>
          
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-6">
            <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Payment: KES 150
            </h3>
            <p className="text-gray-700 mb-4">
              You will receive KES 150 via M-Pesa within 24 hours to:
            </p>
            <p className="text-2xl font-mono font-bold text-green-600">
              {responses.phone_number}
            </p>
            <p className="text-sm text-gray-600 mt-4">
              Payment from: M-Recon<br/>
              If you don&apos;t receive it, WhatsApp: +254-XXX-XXX-XXX
            </p>
          </div>

          {(responses.free_trial === 'Yes, definitely' || responses.free_trial === 'Yes, probably') && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-4">
              <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-700 font-semibold">
                ✅ You said YES to free trial!<br/>
                We&apos;ll contact you within 48 hours with early access.
              </p>
            </div>
          )}

          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <p className="text-sm text-gray-700">
              Want early access to M-Recon?<br/>
              <a href="https://m-recon.com" className="text-blue-600 font-semibold underline">
                Join the waitlist →
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show section header when section changes
  const showSectionHeader = currentStep === 0 || 
    (currentStep > 0 && questions[currentStep].section !== questions[currentStep - 1].section);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-2xl shadow-xl p-6 mt-8">
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl font-bold text-green-600">M-Recon</div>
            <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-green-700">
                Earn KES 150
              </span>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            M-Pesa Business Survey
          </h1>
          <p className="text-gray-600 mb-4">
            Help us understand your business needs. Takes 5-7 minutes.
          </p>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Question {currentStep + 1} of {questions.length}
          </p>
        </div>

        {/* Question Card */}
        <div className="bg-white shadow-xl p-8">
          {showSectionHeader && (
            <div className="mb-6 pb-4 border-b-2 border-green-100">
              <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">
                {currentQuestion.section}
              </span>
            </div>
          )}

          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
            {currentQuestion.type === 'radio' && Array.isArray(currentQuestion.options) && currentQuestion.options.map((option, idx) => (
              <label 
                key={idx}
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  responses[currentQuestion.id] === option
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value={option}
                  checked={responses[currentQuestion.id] === option}
                  onChange={(e) => handleResponse(currentQuestion.id, e.target.value)}
                  className="w-4 h-4 text-green-600"
                />
                <span className="ml-3 text-gray-700">{option}</span>
              </label>
            ))}

            {currentQuestion.type === 'checkbox' && Array.isArray(currentQuestion.options) && currentQuestion.options.map((option, idx) => (
              <label 
                key={idx}
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  (responses[currentQuestion.id] || []).includes(option)
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-green-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={(responses[currentQuestion.id] || []).includes(option)}
                  onChange={() => handleCheckboxChange(currentQuestion.id, option)}
                  className="w-4 h-4 text-green-600"
                />
                <span className="ml-3 text-gray-700">{option}</span>
              </label>
            ))}

            {currentQuestion.type === 'text' && (
              <div>
                <input
                  type="text"
                  placeholder={currentQuestion.placeholder}
                  value={responses[currentQuestion.id] || ''}
                  onChange={(e) => handleResponse(currentQuestion.id, e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none text-lg"
                />
                {currentQuestion.id === 'phone_number' && (
                  <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    We&apos;ll send KES 150 to this number after you submit
                  </p>
                )}
              </div>
            )}

            {currentQuestion.type === 'textarea' && (
              <div>
                <textarea
                  placeholder={currentQuestion.placeholder}
                  value={responses[currentQuestion.id] || ''}
                  onChange={(e) => handleResponse(currentQuestion.id, e.target.value)}
                  rows={4}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none text-base"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Share your real experience - helps us build better solutions
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-b-2xl shadow-xl p-6 mb-8">
          <div className="flex justify-between gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              ← Previous
            </button>

            {!isLastQuestion ? (
              <button
                onClick={handleNext}
                disabled={!hasResponse}
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!hasResponse || isSubmitting}
                className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                {isSubmitting ? 'Submitting...' : 'Submit & Get KES 150'}
              </button>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-8">
          <p className="text-sm text-gray-700 text-center">
            🔒 Your responses are confidential and used only for product research.
          </p>
        </div>
      </div>
    </div>
  );
}
