/**
 * WARUM: Zentraler Resend-Client für alle Email-Operationen
 * WIE: Erstellt Singleton aus Resend-SDK basierend auf ENV-Variable
 * WAS: Exportiert initialisierten Resend-Client oder `null`, falls API-Key fehlt
 */

import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY ?? '';

if (!resendApiKey) {
  console.warn('RESEND_API_KEY missing - emails will be skipped.');
}

export const resend = resendApiKey ? new Resend(resendApiKey) : null;
