/**
 * WARUM: Survey responses in Supabase speichern für Analyse (WTP, SACCO membership, loan rejection reasons)
 * WIE: POST /api/validation-survey → Insert in validation_survey_responses table
 * WAS: API Route für Validation Survey Submissions (16 Fragen → Supabase)
 */

import {
  NextRequest,
  NextResponse,
} from 'next/server';

import { createClient } from '@supabase/supabase-js';

// Force Node.js runtime (Supabase compatibility)
export const runtime = 'nodejs';

// Admin client for server-side operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    // Validation: Phone number required
    if (!payload.phone_number) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const { data, error } = await supabaseAdmin
      .from('validation_survey_responses')
      .insert([
        {
          // SECTION 1: Business Info
          business_type: payload.business_type || null,
          sacco_member: payload.sacco_member || null,

          // SECTION 2: M-Pesa Usage
          mpesa_usage: Array.isArray(payload.mpesa_usage) 
            ? payload.mpesa_usage 
            : [],
          
          // SECTION 3: Loan Experience
          loan_applied: payload.loan_applied || null,
          loan_outcome: payload.loan_outcome || null,
          rejection_reason: payload.rejection_reason || null,

          // SECTION 4: Current Record Keeping
          record_keeping: payload.record_keeping || null,
          time_spent: payload.time_spent || null,
          concrete_problem: payload.concrete_problem || null,

          // SECTION 5: Pain Quantification
          time_savings: payload.time_savings || null,

          // SECTION 6: Solution Fit
          solution_fit: payload.solution_fit || null,
          solution_impact: payload.solution_impact || null,

          // SECTION 7: Willingness to Pay
          current_spending: payload.current_spending || null,
          free_trial: payload.free_trial || null,
          paid_commitment: payload.paid_commitment || null,

          // Contact
          phone_number: payload.phone_number,

          // Metadata
          submitted_at: payload.submitted_at || new Date().toISOString(),
          user_agent: request.headers.get('user-agent') || null,
          ip_address: request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      null
        }
      ])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: 'Database error', details: error.message },
        { status: 500 }
      );
    }

    console.log('✅ Survey response saved:', data[0].id);

    // TODO: Trigger M-Pesa payment here (KES 150 to phone_number)
    // See: https://developer.safaricom.co.ke/APIs/MpesaExpressSimulate
    // For now: Manual payment via M-Pesa dashboard

    return NextResponse.json({
      success: true,
      message: 'Survey submitted successfully',
      response_id: data[0].id
    });

  } catch (error) {
    console.error('Survey API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
