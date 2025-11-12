/**
 * WARUM: Waitlist-Form mit Validation und Email-Submission
 * WIE: React Hook Form + Zod-Validation, sendet POST zu /api/waitlist
 * WAS: Sammelt Email, Phone, Business-Type → speichert in Supabase → sendet Confirmation-Email
 * 
 * BEISPIEL-USE:
 * import WaitlistForm from '@/components/WaitlistForm';
 * <WaitlistForm /> // Rendert Form mit Submit-Button
 */

'use client';

import { useState } from 'react';

import { Loader2 } from 'lucide-react';
import {
  type SubmitHandler,
  useForm,
} from 'react-hook-form';

import {
  type WaitlistFormData,
  waitlistSchema,
} from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';

export default function WaitlistForm() {
  // State für Loading-Indicator und Success-Message
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // React Hook Form Setup mit Zod-Validation
  const {
    register,      // Registriert Input-Fields
    handleSubmit,  // Submit-Handler
    formState: { errors },  // Validation-Errors
    reset,         // Form zurücksetzen nach Success
  } = useForm<WaitlistFormData>({
  resolver: zodResolver<WaitlistFormData>(waitlistSchema),  // Zod-Schema für Validation
    defaultValues: {
      loanInterest: false,
    },
  });

  // Submit-Handler: Sendet Form-Daten an API
  const onSubmit: SubmitHandler<WaitlistFormData> = async (data) => {
    setIsSubmitting(true);
    
    try {
      // POST zu /api/waitlist
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Something went wrong');
      }

      // Success: Form zurücksetzen + Success-Message zeigen
      setSubmitSuccess(true);
      reset();
      
      // Track Event mit Plausible Analytics (wenn verfügbar)
      if (typeof window !== 'undefined' && (window as any).plausible) {
        (window as any).plausible('Waitlist Signup', {
          props: {
            business_type: data.businessType,
            loan_interest: data.loanInterest ? 'yes' : 'no',
          },
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert(error instanceof Error ? error.message : 'Failed to submit form');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success-Message (wird nach erfolgreichem Submit angezeigt)
  if (submitSuccess) {
    return (
      <div className="bg-primary/10 border border-primary rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-primary mb-2">
          🎉 You are on the list!
        </h3>
        <p className="text-text/80">
          We will notify you when M-Recon launches.
          <br />
          Check your email for confirmation.
        </p>
      </div>
    );
  }

  // Form-UI
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-6">
      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
          Email Address *
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="your@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-secondary">{errors.email.message}</p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-text mb-2">
          Phone Number *
        </label>
        <input
          id="phone"
          type="tel"
          {...register('phone')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="+254712345678"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-secondary">{errors.phone.message}</p>
        )}
      </div>

      {/* Business Type Dropdown */}
      <div>
        <label htmlFor="businessType" className="block text-sm font-medium text-text mb-2">
          What do you do? *
        </label>
        <select
          id="businessType"
          {...register('businessType')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">Select your work...</option>
          <option value="duka">Duka/Shop Owner</option>
          <option value="mama-mboga">Mama Mboga</option>
          <option value="salon">Salon/Barber</option>
          <option value="restaurant">Restaurant/Food Kiosk</option>
          <option value="boda-boda">Boda Boda Rider</option>
          <option value="jua-kali">Jua Kali (Mechanic/Welder/Carpenter)</option>
          <option value="mitumba">Mitumba Seller</option>
          <option value="freelancer">Freelancer/Consultant</option>
          <option value="other">Other</option>
        </select>
        {errors.businessType && (
          <p className="mt-1 text-sm text-secondary">{errors.businessType.message}</p>
        )}
      </div>

      {/* Transactions Per Month (optional) */}
      <div>
        <label htmlFor="transactionsPerMonth" className="block text-sm font-medium text-text mb-2">
          Transactions Per Month (optional)
        </label>
        <select
          id="transactionsPerMonth"
          {...register('transactionsPerMonth')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">Select range...</option>
          <option value="<30">&lt;30 (Free Tier)</option>
          <option value="30-100">30-100</option>
          <option value="100+">100+</option>
        </select>
      </div>

      {/* Referral Source (optional) */}
      <div>
        <label htmlFor="referralSource" className="block text-sm font-medium text-text mb-2">
          How did you hear about us? (optional)
        </label>
        <input
          id="referralSource"
          type="text"
          {...register('referralSource')}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="WhatsApp, Friend, etc."
        />
      </div>

      {/* Loan Interest Checkbox */}
      <div className="flex items-start gap-3 rounded-lg border border-gray-300 p-4">
        <input
          id="loanInterest"
          type="checkbox"
          {...register('loanInterest')}
          className="mt-1 h-5 w-5 text-primary focus:ring-primary"
        />
        <label htmlFor="loanInterest" className="text-sm text-text/80">
          I want early access to loan partnerships (Banks, SACCOs, Chamas). Invite me to pilot programs and preferential lender onboarding.
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-white px-6 py-4 rounded-lg font-semibold hover:bg-primary/90 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Joining...
          </>
        ) : (
          'Join Waitlist'
        )}
      </button>

      {/* Disclaimer */}
      <p className="text-xs text-text/60 text-center">
        By joining, you agree to receive launch updates via email.
      </p>
    </form>
  );
}
