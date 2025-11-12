# 🚨 EMAIL DEBUG CHECKLIST (12.11.2025)

## Problem
Keine Admin-Notification Emails an `msieger1994@gmail.com` trotz:
- ✅ Resend Domain verified (m-recon.com)
- ✅ Supabase Inserts funktionieren
- ✅ Neuer Email-Code deployed (sendWaitlistEmails)

## Root Cause (aus 09.11 Learnings)
`RESEND_FROM_EMAIL` fehlt in Vercel ENV → Sandbox-Mode → nur Emails an registrierte Adresse

---

## SOFORT-FIX (5 Minuten):

### Step 1: Vercel ENV Variables Check
```bash
Gehe zu: https://vercel.com/m-sieger/waitlist/settings/environment-variables

MUSS existieren:
✅ RESEND_API_KEY=re_...
✅ RESEND_FROM_EMAIL=hello@m-recon.com  (oder "M-Recon <hello@m-recon.com>")
✅ RESEND_ADMIN_EMAIL=msieger1994@gmail.com  (NEU seit 11.11 Code!)

Environments: ALL (Production + Preview + Development)
```

### Step 2: Redeploy WITHOUT Cache
```bash
1. Gehe zu: https://vercel.com/m-sieger/waitlist/deployments
2. Click latest deployment
3. Click "..." Menu → "Redeploy"
4. ❌ DEAKTIVIERE "Use existing Build Cache"
5. Click "Redeploy"
6. Warte 1-2 Min
```

### Step 3: Test
```bash
1. Gehe zu: https://m-recon.com
2. Fülle Waitlist-Form aus (deine Email: moritz.sieger94@gmail.com)
3. Submit
4. Check Supabase: https://app.supabase.com (Eintrag da?)
5. Check Gmail: msieger1994@gmail.com (Admin-Notification?)
6. Check Gmail: moritz.sieger94@gmail.com (User-Confirmation?)
7. Check Spam-Ordner in BEIDEN!
```

### Step 4: Debug Logs
```bash
Wenn Emails fehlen:
1. Gehe zu: https://vercel.com/m-sieger/waitlist
2. Click "Logs" Tab
3. Such nach: "Email" oder "Resend" oder "❌"
4. Screenshot von Errors → an mich senden
```

---

## ALTERNATIVE (Falls Vercel ENV nicht klappt):

### Local .env.local Test
```bash
cd /home/mo/dev/waitlist

# Checke ob .env.local existiert
cat .env.local

# Sollte enthalten:
RESEND_API_KEY=re_deine_api_key
RESEND_FROM_EMAIL=hello@m-recon.com
RESEND_ADMIN_EMAIL=msieger1994@gmail.com
NEXT_PUBLIC_SUPABASE_URL=https://jakqhnvgbjtrjjirqlqa.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Falls falsch/fehlt:
# 1. Copy from Vercel Dashboard
# 2. Paste in .env.local
# 3. pnpm run dev
# 4. Test auf localhost:3000
```

---

## SUCCESS CRITERIA:

✅ Admin bekommt Email mit Subject: "🎉 New Waitlist Signup: [user-email]"
✅ User bekommt Email mit Subject: "Welcome to M-Recon - You're on the list! 🚀"
✅ Beide Emails haben korrekten HTML-Content (Templates)
✅ Keine Errors in Vercel Logs

---

## Nächster Schritt nach Email-Fix:
→ Vision/Roadmap Update + Redesign Planning
