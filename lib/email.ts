/**
 * WARUM: Versand-Logik für Waitlist-Emails zentralisieren
 * WIE: Nutzt Resend-Singleton + Templates für Admin-Notification & Nutzer-Bestätigung
 * WAS: Exportiert Hilfsfunktionen, um Emails innerhalb des API-Handlers zu triggern
 * 
 * BEISPIEL-USE:
 * await sendWaitlistEmails({ email, phone, businessType, referralSource });
 * // ✅ Emails verschickt ODER ❌ Fehler geloggt, Signup bleibt gültig
 */

import type { Resend } from 'resend';

import {
  adminNotificationTemplate,
  userWelcomeTemplate,
  type WaitlistEmailData,
} from './email-templates';
import { resend } from './resend';

const resendFromEmail = process.env.RESEND_FROM_EMAIL ?? 'M-Recon <hello@m-recon.com>';
const adminNotificationRecipient = process.env.RESEND_ADMIN_EMAIL ?? 'msieger1994@gmail.com';
const adminNotificationFrom = 'M-Recon Waitlist <hello@m-recon.com>';

export interface WaitlistEmailPayload extends WaitlistEmailData {}

type ResendSendPayload = Parameters<Resend['emails']['send']>[0];

const sendEmail = async (payload: ResendSendPayload): Promise<void> => {
  if (!resend) {
    console.warn('Resend client missing - skipping email send.');
    return;
  }

  const response = await resend.emails.send(payload);

  if (response.error) {
    throw response.error;
  }
};

export async function sendAdminNotificationEmail(data: WaitlistEmailPayload): Promise<void> {
  try {
    await sendEmail({
      from: adminNotificationFrom,
      to: adminNotificationRecipient,
      subject: `🎉 New Waitlist Signup: ${data.email}`,
      html: adminNotificationTemplate(data),
    });
  } catch (error) {
    console.error('❌ Admin notification email failed:', error);
    throw error;
  }
}

export async function sendUserConfirmationEmail(data: WaitlistEmailPayload): Promise<void> {
  try {
    await sendEmail({
      from: resendFromEmail,
      to: data.email,
      subject: "Welcome to M-Recon - You're on the list! 🚀",
      html: userWelcomeTemplate(data),
    });
  } catch (error) {
    console.error('❌ User confirmation email failed:', error);
    throw error;
  }
}

export async function sendWaitlistEmails(data: WaitlistEmailPayload): Promise<void> {
  if (!resend) {
    console.warn('Resend client missing - skipping waitlist emails.');
    return;
  }

  try {
    await sendAdminNotificationEmail(data);
    await sendUserConfirmationEmail(data);
    console.log('✅ Email notifications sent successfully');
  } catch (error) {
    console.error('❌ Email sending failed:', error);
  }
}
