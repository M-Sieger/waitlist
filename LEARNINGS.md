# 🎓 Learnings aus dem Build-Prozess (M-Recon Waitlist)

**Datum:** November 7-9, 2025  
**Projekt:** M-Recon Waitlist Site (Phase 0 – Product Validation)  
**Entwickler:** Mo (mit GitHub Copilot)

---

## 🚨 Kritischer Blocker: Supabase `fetch failed` Error

### Problem
```
TypeError: fetch failed
  at node:internal/deps/undici/undici:13510:13
  at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
```

**REST Endpoint:** `https://jakqhnvgbjtrjjirqlqa.supabase.co/rest/v1/waitlist_signups`  
**Response:** `{"message":"Not Found"}` (HTTP 404)

---

## 🔍 Root Cause: Supabase Project PAUSED

### Was ist passiert?
- Supabase Free Tier pausiert Projekte nach **~1 Woche Inaktivität**
- In paused State: Database offline (auf Disk gespeichert)
- **Keine automatische Wiederherstellung** – manuelles Unpause nötig!

### Lösung (in 2 Minuten)
1. **Supabase Dashboard öffnen:** https://app.supabase.com
2. **Projekt checken:** Gibt's ein "Paused" Banner?
3. **Restore klicken:** "Restore project" Button drücken
4. **Warten:** 2-3 Minuten bis Status = "Active"
5. **Testen:** API Route nochmal aufrufen

**Quelle:** [Stack Overflow Case](https://stackoverflow.com/questions/76424910/supabase-typeerror-fetch-failed) – exakt gleicher Fehler, gelöst durch Unpause.

---

## 🛠️ Was wir ALLES probiert haben (bevor wir Root Cause fanden)

### ✅ Fix 1: TypeScript JSX Config
**Problem:** Build-Error `'React' refers to a UMD global, but the current file is a module.`

**Lösung:**
```json
// tsconfig.json
{
  "compilerOptions": {
    "jsx": "react-jsx"  // statt "jsx": "preserve"
  }
}
```

**Warum:** Next.js 14+ App Router nutzt automatisch JSX Transform (braucht kein `import React from 'react'`).

---

### ✅ Fix 2: Explicit JSX.Element Types entfernen
**Problem:** Components hatten explizite Return-Types (`function Hero(): JSX.Element`)

**Lösung:**
```typescript
// Vorher (mit Error)
export default function Hero(): JSX.Element {
  return <div>...</div>;
}

// Nachher (funktioniert)
export default function Hero() {
  return <div>...</div>;
}
```

**Warum:** TypeScript inferiert Return-Type automatisch (mit `jsx: "react-jsx"` ist expliziter Type nicht nötig).

---

### ✅ Fix 3: Node.js Runtime forcen
**Problem:** Next.js API Routes laufen default in Edge Runtime (limitierte Node.js APIs)

**Lösung:**
```typescript
// app/api/waitlist/route.ts
export const runtime = 'nodejs'; // ← Diese Zeile am Anfang!

export async function POST(request: NextRequest) {
  // ... Supabase-Code
}
```

**Warum:** Supabase-Client braucht volle Node.js Libraries (nicht Edge-kompatibel).

---

### ✅ Fix 4: Supabase URL Typo
**Problem:** URL hatte Typo (`jakqhnvgbjtjrjirqlqa` statt `jakqhnvgbjtrjjirqlqa`)

**Wie gefunden:**
```bash
# Test 1: Falsche URL
curl -I https://jakqhnvgbjtjrjirqlqa.supabase.co
# curl: (6) Could not resolve host

# Test 2: Richtige URL
curl -I https://jakqhnvgbjtrjjirqlqa.supabase.co
# HTTP/2 404 (aber Host existiert!)
```

**Lösung:** `.env.local` + Vercel Env Variables korrigieren.

---

### ❌ Was NICHT geholfen hat
- Multiple Redeployments (Vercel auto + manual)
- ENV Variables nochmal setzen
- Supabase Schema nochmal ausführen
- Verschiedene Node.js Versionen testen
- RLS Policies anpassen

**Fazit:** Alles richtig konfiguriert – aber Project war paused! 😤

---

## 🧪 Debug-Methoden die geholfen haben

### 1. Node.js REPL Test (isoliert Next.js)
```bash
node -e "
  const { createClient } = require('@supabase/supabase-js');
  const supabase = createClient(
    'https://jakqhnvgbjtrjjirqlqa.supabase.co',
    'eyJhbGci...'
  );
  supabase.from('waitlist_signups').select('*').then(r => {
    console.log(r);
  });
"
```

**Ergebnis:** Gleicher `fetch failed` Error → Problem ist **nicht Next.js**, sondern Supabase!

---

### 2. DNS & HTTP Tests mit curl
```bash
# Test 1: Base URL
curl -I https://jakqhnvgbjtrjjirqlqa.supabase.co
# HTTP/2 404 (Cloudflare antwortet, aber Project offline)

# Test 2: REST Endpoint (ohne Auth)
curl https://jakqhnvgbjtrjjirqlqa.supabase.co/rest/v1/waitlist_signups
# {"message":"Not Found"}
```

**Wichtig:** 404 heißt hier **nicht** "Table existiert nicht", sondern "Project nicht erreichbar oder Auth fehlt".

---

### 3. AI Research Tools (Perplexity + Claude Opus + ChatGPT)
**Prompt:** Vollständiger Context (Stack Trace, ENV vars, Schema, was wir probiert haben)

**Ergebnis:** Alle 3 AIs kamen unabhängig auf die gleiche Diagnose:
- "Project might be **paused**"
- "Check Supabase Dashboard for status"
- "Free tier auto-pauses after 1 week inactivity"

**Learning:** Bei komplexen Bugs: Research mit FULL CONTEXT = Gold wert! 🏆

---

## 📊 Supabase Specifics (für nächstes Mal)

### Free Tier Limitations
- **Auto-Pause nach ~7 Tagen Inaktivität**
- **Manuelle Restore nötig** (keine Auto-Wakeup bei Request)
- **Kein Warning vorher** – einfach offline!

### Wie verhindern? (2 Optionen)
**Option A: Keep-Alive Cron Job**
```bash
# GitHub Actions Workflow (täglich um 6:00 UTC)
name: Keep Supabase Alive
on:
  schedule:
    - cron: '0 6 * * *'
jobs:
  ping:
    runs-on: ubuntu-latest
    steps:
      - name: Ping Supabase
        run: |
          curl -X POST ${{ secrets.SUPABASE_URL }}/rest/v1/waitlist_signups \
            -H "apikey: ${{ secrets.SUPABASE_ANON_KEY }}" \
            -H "Content-Type: application/json" \
            -d '{"email":"keepalive@test.com","phone":"0000000000","business_type":"test"}'
```

**Option B: Upgrade auf Pro Plan** ($25/mo – kein Auto-Pause).

**Für dieses Projekt:** Option A (Launch-Phase, danach entscheiden).

---

## 🔐 Auth Keys: Anon vs Service Role

### Was wir gelernt haben:

#### Anon Key (Public)
- ✅ **Für Client-Side** (Browser, Mobile Apps)
- ✅ **Subject to RLS Policies**
- ❌ **Limitierte Permissions**

**Use Case:** Waitlist-Form im Frontend (User-Facing).

#### Service Role Key (Secret!)
- ✅ **Für Server-Side** (API Routes, Cron Jobs)
- ✅ **Bypasses RLS** (volle Permissions)
- ❌ **NIEMALS im Browser exposen!**

**Use Case:** Admin-Operations, Background-Jobs.

### Best Practice für Next.js API Routes
```typescript
// app/api/waitlist/route.ts
import { createClient } from '@supabase/supabase-js';

// NICHT: NEXT_PUBLIC_* verwenden (würde im Browser landen)
const supabase = createClient(
  process.env.SUPABASE_URL!,               // Kein NEXT_PUBLIC_
  process.env.SUPABASE_SERVICE_ROLE_KEY!,  // Service Role!
  {
    auth: {
      persistSession: false,  // Kein Session-Persist auf Server
      autoRefreshToken: false
    }
  }
);
```

**ENV Variables (Vercel):**
```bash
# Server-Only (kein NEXT_PUBLIC_ Prefix!)
SUPABASE_URL=https://jakqhnvgbjtrjjirqlqa.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...  # Get from Settings > API

# Client-Side (mit NEXT_PUBLIC_)
NEXT_PUBLIC_SUPABASE_URL=https://jakqhnvgbjtrjjirqlqa.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

---

## 🚀 Deployment-Learnings (Vercel + Namecheap)

### Vercel Auto-Deploy funktioniert perfekt
- Push zu `main` → automatisches Deployment
- Preview-URL für jeden Commit
- Environment Variables via Dashboard setzen
- **Wichtig:** Nach ENV-Change immer redeployen!

### Namecheap Domain Setup (m-recon.com)
**Noch nicht gemacht im Chat, aber geplant:**
1. Domain kaufen (~$10/Jahr)
2. Nameservers auf Vercel umstellen:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`
3. Vercel Dashboard: Settings → Domains → Add `m-recon.com`
4. Warten (DNS Propagation ~1-24h)

**Status:** Domain gekauft, DNS-Config pending.

---

## 📈 Performance & Analytics (geplant)

### Plausible Analytics Setup
**Warum Plausible?**
- ✅ Privacy-friendly (GDPR-compliant)
- ✅ Kein Cookie-Banner nötig
- ✅ Lightweight (<1KB Script)

**Implementation:**
```tsx
// app/layout.tsx
<Script
  defer
  data-domain="m-recon.vercel.app"
  src="https://plausible.io/js/script.js"
/>
```

**Custom Events tracken:**
```tsx
// Nach Form-Submission
window.plausible('Waitlist Signup', {
  props: { business_type: formData.businessType }
});
```

---

## 🧰 Tools & Workflows die geholfen haben

### 1. GitHub Copilot Chat
- **Strength:** Code-Generation, Debugging, Erklärungen
- **Limitation:** Verliert Context bei Crash (deswegen dieses Doc!)

### 2. Perplexity AI (für Research)
- Schnelle Antworten mit Sources
- Gut für "Was sagen andere zu diesem Error?"

### 3. Claude Opus (Deep Research)
- Detaillierte Analysen
- Struktur: Root Cause → Solutions → Best Practices

### 4. ChatGPT (Second Opinion)
- Bestätigung von Hypothesen
- Alternative Lösungsansätze

**Learning:** Multi-Tool-Approach = robuste Lösungen! 💪

---

## 🎯 Nächste Steps (nach Supabase Fix)

### Phase 1: Verification (1-2h)
- [ ] Supabase Project unpausen
- [ ] API Route testen (POST /api/waitlist)
- [ ] Confirmation Email testen (Resend)
- [ ] Success Page checken

### Phase 2: Domain Setup (1h)
- [ ] Namecheap DNS auf Vercel umstellen
- [ ] Custom Domain in Vercel hinzufügen
- [ ] HTTPS Certificate automatisch (Vercel macht das)

### Phase 3: Analytics (30min)
- [ ] Plausible Account erstellen
- [ ] Script in `layout.tsx` einbauen
- [ ] Custom Events für Form-Submissions

### Phase 4: Launch! 🚀
- [ ] WhatsApp-Gruppen vorbereiten
- [ ] Grace's Cousine kontaktieren (10 KMU-Interviews)
- [ ] Monitor: 30+ Signups in Woche 1 (Success-Metric)

---

## 🧠 Meta-Learnings (für zukünftige Projekte)

### 1. Documentation is King 👑
**Was gut war:**
- `.github/copilot-instructions.md` (Source of Truth)
- `docs/COPILOT-WORKFLOW.md` (Arbeitsanweisungen)
- `SUPABASE_DEBUG.md` (Debugging-Context)

**Was gefehlt hat:**
- **LEARNINGS.md** (dieses Doc!) – hätte früher angelegt werden sollen!

**Für nächstes Mal:** LEARNINGS.md ab Tag 1 führen (parallel zum Build).

---

### 2. External Services = Single Point of Failure
**Problem:** Supabase pausiert → ganzes Projekt down.

**Mitigation:**
- **Monitoring:** Uptime-Checks (z.B. UptimeRobot)
- **Keep-Alive:** Cron Jobs für Free Tier
- **Fallback:** Plan B haben (z.B. lokale SQLite für Dev)

---

### 3. Debugging-Flow für External APIs
```
1. Isolate: Funktioniert API außerhalb meiner App? (curl, Node REPL)
   ↓
2. Verify: Credentials korrekt? ENV vars gesetzt?
   ↓
3. Research: Was sagen andere zu diesem Error? (AI + Google)
   ↓
4. Test Hypotheses: Systematisch durchgehen (nicht wild raten!)
   ↓
5. Document: Was war's? Wie gefixed? (für Future-You!)
```

**Anti-Pattern:** "Lass mal random Dinge ändern und hoffen dass es funktioniert" 😅

---

### 4. AI als Co-Pilot, nicht Auto-Pilot
**Was AI gut kann:**
- Code-Generierung (Boilerplate)
- Erklärungen (komplexe Konzepte)
- Research (bekannte Probleme finden)

**Was AI nicht kann:**
- Dein Projekt verstehen (ohne guten Context)
- External Services debuggen (API down = AI hilflos)
- Entscheidungen treffen (Product vs Tech)

**Meine Rolle:** Context geben, verifizieren, final Decisions treffen.

---

## 📚 Ressourcen zum Nachlesen

### Supabase
- [Docs: Free Tier Limits](https://supabase.com/docs/guides/deployment/going-into-prod)
- [Docs: Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Troubleshooting: HTTP Status Codes](https://supabase.com/docs/guides/troubleshooting/http-status-codes)

### Next.js 14+ (App Router)
- [Docs: API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Docs: Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Docs: TypeScript](https://nextjs.org/docs/app/building-your-application/configuring/typescript)

### Vercel Deployment
- [Docs: Environment Variables](https://vercel.com/docs/environment-variables)
- [Docs: Custom Domains](https://vercel.com/docs/custom-domains)

### Stack Overflow Cases
- [Supabase fetch failed Error](https://stackoverflow.com/questions/76424910/supabase-typeerror-fetch-failed) ← Exakt unser Problem!

---

## ✅ Checkliste für zukünftige Projekte

### Before Writing Code
- [ ] **Source of Truth** anlegen (wie `.github/copilot-instructions.md`)
- [ ] **External Services** Setup dokumentieren (Credentials, Limits)
- [ ] **LEARNINGS.md** initialisieren (ab Tag 1!)

### During Development
- [ ] **Commits:** Atomic + Conventional (feat/fix/docs)
- [ ] **ENV Variables:** `.env.example` pflegen
- [ ] **Testing:** Lokal + Production testen (nicht nur lokal!)
- [ ] **Debugging:** Systematisch (Isolation → Verification → Research)

### After Deployment
- [ ] **Monitoring:** Uptime-Checks einrichten
- [ ] **Documentation:** README + LEARNINGS updaten
- [ ] **Postmortem:** Was lief gut? Was lief schief?

---

**Ende der Learnings** 🎓

---

## 📮 Email-Setup Debug (09.11.2025)

### ✅ Fortschritt heute
- Resend-Domain `m-recon.com` vollständig verifiziert (DKIM, SPF, MX send, DMARC)
- Namecheap-DNS Records korrigiert (`send` MX, SPF, `_dmarc` TXT)
- Supabase Insert über Live-Form erfolgreich (Eintrag sichtbar im Table Editor)
- Resend API-Key in Vercel hinterlegt (`RESEND_API_KEY`)

### ❌ Aktuelles Problem
- API-Logs zeigen: `RESEND_FROM_EMAIL missing - using Resend sandbox sender.`
- Folge: Resend nutzt Sandbox-Absender und erlaubt nur `msieger1994@gmail.com`
- Confirmation-Email wird deshalb bei anderen Adressen blockiert (403 validation_error)

### 🛠️ Fix-Plan für morgen
1. **Vercel ENV prüfen:** `RESEND_FROM_EMAIL` (nicht `RESEND_FROM_MAIL`) für *All Environments* setzen, Value `M-Recon <hello@m-recon.com>` oder fallback `hello@m-recon.com`
2. **Redeploy ohne Cache:** Deployment → Redeploy → "Use existing build cache" deaktivieren
3. **E2E-Test:** Form ausfüllen → Supabase Eintrag prüfen → Email-Empfang verifizieren (auch Spam-Ordner)
4. Optional: Admin-Notification erst aktivieren, wenn MX `@` auf Grün springt

### 🧾 Reminder
- Nach erfolgreichem Email-Test `email_confirmed`-Flag in Supabase setzen (perspektivisch für Analytics)
- Plausible & WhatsApp-Outreach erst starten, wenn Email-Flow stabil ist
- Fortschritt regelmäßig in `LEARNINGS.md` dokumentieren (Backup falls Chat weg ist)

**Status:** Supabase-Fix pending → dann Launch-ready! 🚀
