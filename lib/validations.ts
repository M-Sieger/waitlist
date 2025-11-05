/**
 * WARUM: Zentrale Validierungs-Regeln für Waitlist-Form
 * WIE: Zod-Schema (TypeScript-Library für Runtime-Validation)
 * WAS: Checkt ob Email gültig, Phone im Kenya-Format, Business-Type ausgewählt
 * 
 * BEISPIEL-USE:
 * const result = waitlistSchema.parse(formData);
 * // ✅ Returns validated data  ODER  ❌ Throws ZodError
 */

import { z } from 'zod';

export const waitlistSchema = z.object({
  // Email: Required, muss valid sein
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format'),
  
  // Phone: Required, muss Kenya-Format sein (+254...)
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(
      /^\+254[0-9]{9}$/,
      'Phone must be in format +254712345678'
    ),
  
  // Business-Type: Required, muss eine Option gewählt sein
  businessType: z
    .string()
    .min(1, 'Please select a business type'),
  
  // Transactions/Month: Optional (für Pricing-Segmentierung später)
  transactionsPerMonth: z.string().optional(),
  
  // Referral-Source: Optional (Tracking für Marketing)
  referralSource: z.string().optional(),
});

// TypeScript-Type aus Zod-Schema generieren
export type WaitlistFormData = z.infer<typeof waitlistSchema>;
