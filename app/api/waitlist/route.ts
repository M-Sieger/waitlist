/**
 * WARUM: API-Endpoint für Waitlist-Form-Submissions
 * WIE: Next.js Route Handler → validiert Daten → speichert in Supabase → sendet Email
 * WAS: POST /api/waitlist empfängt Form-Daten, validiert, speichert, benachrichtigt User
 * 
 * BEISPIEL-USE:
 * fetch('/api/waitlist', { method: 'POST', body: JSON.stringify(formData) })
 * // Returns: { message: "Success!", data: {...} }
 */

import {
  NextRequest,
  NextResponse,
} from 'next/server';

import { sendConfirmationEmail } from '@/lib/email';
import { supabase } from '@/lib/supabase';
import { waitlistSchema } from '@/lib/validations';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // 1. Parse Request-Body (JSON)
    const body = await request.json();
    
    // 2. Validate mit Zod (throws ZodError wenn invalid)
    const validatedData = waitlistSchema.parse(body);
    
    // DEBUG: Log Supabase URL
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    
    // 3. Insert in Supabase (waitlist_signups-Table)
    const { data, error } = await supabase
      .from('waitlist_signups')
      .insert([
        {
          email: validatedData.email,
          phone: validatedData.phone,
          business_type: validatedData.businessType,
          transactions_per_month: validatedData.transactionsPerMonth,
          referral_source: validatedData.referralSource,
        },
      ])
      .select()
      .single();

    // Error-Handling: Duplicate Email (PostgreSQL Unique-Constraint)
    if (error) {
      console.error('Supabase error:', error);
      if (error.code === '23505') {  // PostgreSQL Unique-Violation
        return NextResponse.json(
          { message: 'This email is already on the waitlist.' },
          { status: 400 }
        );
      }
      throw error;
    }

    // 4. Send Confirmation-Email (Resend)
    try {
      await sendConfirmationEmail(validatedData.email);
    } catch (emailError) {
      console.error('Email send failed:', emailError);
      // Don't fail the request if email fails (DB-Insert war erfolgreich)
    }

    // 5. Return Success-Response
    return NextResponse.json(
      { message: 'Successfully joined waitlist!', data },
      { status: 201 }
    );
  } catch (error) {
    console.error('Waitlist API error:', error);
    
    // Zod-Validation-Error → Return 400 mit Error-Message
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }
    
    // Generic Error → Return 500
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
