/**
 * WARUM: Confirmation-Email an User nach Waitlist-Signup
 * WIE: Resend.com API (3.000 emails/mo kostenlos)
 * WAS: Schickt "Welcome to M-Recon"-Email mit Next-Steps
 * 
 * BEISPIEL-USE:
 * await sendConfirmationEmail('user@example.com');
 * // ✅ Email wird versendet  ODER  ❌ Error wird geworfen
 */

import { Resend } from 'resend';

// Resend-Client nur initialisieren, wenn API-Key vorhanden ist
const resendApiKey = process.env.RESEND_API_KEY ?? '';
const resend = resendApiKey ? new Resend(resendApiKey) : null;

/**
 * Sendet Confirmation-Email an Waitlist-Signup
 * @param email - Email-Adresse des Users
 * @returns Promise mit Resend-Response-Data
 * @throws Error wenn Email-Versand fehlschlägt
 */
export async function sendConfirmationEmail(email: string): Promise<any> {
  if (!resend) {
    console.warn('Resend API key missing - skipping email send.');
    return { skipped: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'M-Recon <onboarding@resend.dev>', // TODO: Replace mit hello@m-recon.com nach Domain-Verification
      to: email,
      subject: 'You are on the M-Recon Waitlist!',
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #00A651;">Welcome to M-Recon!</h1>
          <p>Hi there,</p>
          <p>You are officially on the waitlist for <strong>M-Recon</strong> - the app that turns your M-Pesa statements into organized financial records in 2 minutes.</p>
          
          <h2 style="color: #1A1A1A;">What happens next?</h2>
          <ul>
            <li>We will email you when M-Recon launches (estimated: Q1 2026)</li>
            <li>As one of the first 100, you will get <strong>lifetime free access</strong> for up to 30 transactions/month</li>
            <li>You will be able to test the beta version before public launch</li>
          </ul>
          
          <p>Have questions? Just reply to this email - we read every message.</p>
          <p>Thanks for joining us!</p>
          <p><strong>- The M-Recon Team</strong></p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #E0E0E0;" />
          
          <p style="font-size: 12px; color: #666;">
            You received this email because you signed up for the M-Recon waitlist at m-recon.com.
          </p>
        </div>
      `,
    });

    // Wenn Resend-API Error zurückgibt → Error werfen
    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('❌ Resend email error:', error);
    throw new Error('Failed to send confirmation email');
  }
}
