/**
 * WARUM: HTML-Templates für Waitlist-Emails zentral verwalten
 * WIE: Erzeugt HTML-Strings anhand der Waitlist-Daten für Admin & Nutzer:innen
 * WAS: Exportiert Template-Funktionen für Benachrichtigungs- und Bestätigungs-Emails
 */

export interface WaitlistEmailData {
  email: string;
  phone?: string | null;
  businessType?: string | null;
  transactionsPerMonth?: string | null;
  referralSource?: string | null;
  loanInterest?: boolean | null;
  createdAt?: string | Date | null;
}

const formatDisplayValue = (value: string | null | undefined, fallback: string): string => {
  return value && value.trim().length > 0 ? value : fallback;
};

const formatNairobiTime = (value?: string | Date | null): string => {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) {
    return 'Unknown';
  }

  return new Intl.DateTimeFormat('en-KE', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Africa/Nairobi',
  }).format(date);
};

export const adminNotificationTemplate = (data: WaitlistEmailData): string => {
  const email = formatDisplayValue(data.email, 'unknown');
  const phone = formatDisplayValue(data.phone, 'Not provided');
  const businessType = formatDisplayValue(data.businessType, 'Not specified');
  const referralSource = formatDisplayValue(data.referralSource, 'Direct');
  const loanInterest = data.loanInterest ? 'Yes - follow up!' : 'No';
  const formattedTime = formatNairobiTime(data.createdAt);

  return `
      <div style="font-family: Inter, sans-serif; max-width: 600px;">
        <h2 style="color: #00A651;">New M-Recon Waitlist Signup!</h2>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Business Type:</strong> ${businessType}</p>
          <p><strong>Referral Source:</strong> ${referralSource}</p>
          <p><strong>Loan Partnerships Interest:</strong> ${loanInterest}</p>
          <p><strong>Time:</strong> ${formattedTime}</p>
        </div>
        <p style="color: #666; font-size: 14px;">
          Total signups: Check <a href="https://app.supabase.com" style="color: #00A651;">Supabase Dashboard</a>
        </p>
      </div>
    `;
};

export const userWelcomeTemplate = (data: WaitlistEmailData): string => {
  return `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; padding: 40px 20px; background: linear-gradient(135deg, #00A651 0%, #005A2F 100%); border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 32px;">Welcome to M-Recon!</h1>
        </div>
        <div style="padding: 40px 20px; background: white;">
          <p style="font-size: 18px; color: #1a1a1a;">Hi there! 👋</p>
          <p style="color: #666; line-height: 1.6;">
            Thank you for joining the M-Recon waitlist! You're among the first to experience how we're transforming M-Pesa statements into loan-ready financial reports.
          </p>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 30px 0;">
            <h3 style="color: #00A651; margin-top: 0;">What happens next?</h3>
            <ul style="color: #666; line-height: 1.8;">
              <li>We'll notify you as soon as we launch (early 2025)</li>
              <li>Early access members get <strong>50% off</strong> first 3 months</li>
              <li>You'll receive tips on organizing your M-Pesa records</li>
            </ul>
          </div>
          <p style="color: #666; line-height: 1.6;">
            In the meantime, start collecting your M-Pesa PDF statements. You'll need them when we launch!
          </p>
          <div style="text-align: center; margin: 40px 0;">
            <a href="https://wa.me/254712345678?text=Hi%20M-Recon%20team!" style="display: inline-block; background: #25D366; color: white; padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: bold;">
              💬 Chat with us on WhatsApp
            </a>
          </div>
        </div>
        <div style="padding: 20px; background: #f8f9fa; text-align: center; border-radius: 0 0 8px 8px;">
          <p style="color: #999; font-size: 12px; margin: 0;">
            M-Recon | Turning your M-Pesa data into loan opportunities<br />
            Nairobi, Kenya | hello@m-recon.com
          </p>
        </div>
      </div>
    `;
};
