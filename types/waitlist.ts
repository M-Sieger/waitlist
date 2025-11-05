/**
 * WARUM: TypeScript-Types für Waitlist-Form und Supabase-Table
 * WIE: Interfaces die Form-Daten und DB-Schema abbilden
 * WAS: Type-Safety für Frontend (Form) und Backend (API + DB)
 * 
 * BEISPIEL-USE:
 * const formData: WaitlistFormData = { email: "...", phone: "...", ... }
 * const dbRecord: WaitlistSignup = { id: "...", created_at: "...", ... }
 */

// Form-Daten (User-Input)
export interface WaitlistFormData {
  email: string;
  phone: string;
  businessType: string;
  transactionsPerMonth?: string;  // Optional
  referralSource?: string;        // Optional
}

// Supabase-Record (mit zusätzlichen Feldern nach Insert)
export interface WaitlistSignup extends WaitlistFormData {
  id: string;                 // UUID von Supabase
  created_at: string;         // ISO-8601 Timestamp
  email_confirmed: boolean;   // Email-Bestätigung (via Resend)
  notes?: string;             // Admin-Notes (optional, für später)
}
