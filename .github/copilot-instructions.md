# GitHub Copilot Instructions – M-Recon Waitlist Site

## 🎯 Projekt-Kontext

**EMERGENCY UPDATE (13.11.2025):** Waitlist page reality check → Critical copy fixes  
**See:** `/docs/EMERGENCY-CHANGES.md` for 7/10 → 9/10 roadmap

**Product Vision (UPDATED 13.11.2025):**
M-Recon enables informal income earners in Kenya to **access loans** through clean M-Pesa financial records.
NOT a bookkeeping tool – a **Financial Inclusion Platform**.

**Primary Value Prop:** Loan Access (60% rejections due to poor records) ✅ PAINKILLER  
**Secondary Value Prop:** Time-Saving (20h/month saved) ⏰ VITAMIN

**Diese Waitlist-Site ist Phase 0 (Product Validation):**
- Ziel: 500+ Email-Signups by Feb 2026
- NEW Ziel: 40%+ check "loan partnerships" checkbox
- Zielgruppe: Informal income earners (Mama Mboga, Boda Boda, Jua Kali, Freelancers)
- Loan Types: Business, Personal, SACCO, Chama (ALL use same M-Recon output!)
- Launch-Kanäle: SACCO partnerships (primary) + WhatsApp + Grace's network
- Success-Metric: >5% conversion rate (mobile) → TARGET: >7% after critical fixes

**CRITICAL COPY GUIDELINES (13.11.2025):**
```yaml
❌ AVOID:
  - Headlines about "time-saving" or "bookkeeping"
  - "Free Forever" (we'll charge KES 500/mo later!)
  - Technical jargon ("parse", "extract", "process")
  - Vague benefits ("with confidence", "seamlessly")
  - Fake social proof numbers (be honest about signup count)

✅ USE INSTEAD:
  - "Get Approved for Loans 3x Faster" (outcome-focused)
  - "Free for First 100" (honest, creates urgency)
  - "Turn into loan report" (clear transformation)
  - "Ready to submit to SACCO/Bank" (specific outcome)
  - Real numbers OR remove numbers entirely

Priority:
  1. 🔥 Loan Access (painkiller - validated pain!)
  2. ⏰ Time-Saving (vitamin - secondary benefit)
```

---

## 📐 Tech-Stack (für diese Waitlist-Page)

**Framework:** Next.js 14 (App Router) + TypeScript 5  
**Styling:** Tailwind CSS 3  
**Database:** Supabase (Auth + Waitlist-Table)  
**Email:** Resend.com (3.000 emails/mo kostenlos)  
**Deployment:** Vercel (kostenlos)  
**Analytics:** Plausible (privacy-friendly)

**Begründung:**
- Next.js: SEO-optimiert, schnelle Load-Times (wichtig für Mobile-Data in Kenya)
- Tailwind: Mobile-First, schnelles Styling
- Supabase: Schnelles Setup, Echtzeit-DB, Row-Level-Security
- Resend: Einfache API, gute Deliverability
- Vercel: Zero-Config Deployment, Edge-Functions
- Plausible: GDPR-compliant, kein Cookie-Banner nötig

---

## 🎨 Design-Vorgaben

### **Farbschema (Kenya-inspired):**
```css
Primary: #00A651    /* Safaricom Green */
Secondary: #E30613  /* Kenya Red */
Accent: #000000     /* Kenya Black */
Background: #F8F9FA /* Clean Grey */
Text: #1A1A1A       /* Dark Grey */
```

### **Typography:**
- **Headlines:** Inter 700 (Bold)
- **Body:** Inter 400 (Regular)
- **Mobile-First:** Base-Font 16px (readable ohne Zoom)

### **Responsive:**
- Mobile: 320px - 768px (80% der Kenyan Users)
- Tablet: 768px - 1024px
- Desktop: 1024px+

### **Performance-Ziele:**
- LCP <2s (wichtig für Mobile-Data)
- FCP <1s
- Image-Compression: WebP, <200KB pro Image
- Lazy-Loading für Below-Fold-Content

---

## 📂 Ordnerstruktur (Next.js 14 App Router)

```
mpesa-recon/
├── app/
│   ├── layout.tsx           [Root-Layout, Meta-Tags, Analytics]
│   ├── page.tsx              [Landing-Page (alle Sections)]
│   ├── api/
│   │   └── waitlist/
│   │       └── route.ts     [POST /api/waitlist - Form-Submission]
│   └── success/
│       └── page.tsx          [Success-Page nach Signup]
├── components/
│   ├── Hero.tsx              [Hero-Section + CTA]
│   ├── ProblemSection.tsx    [Pain-Points visualisiert]
│   ├── SolutionSection.tsx   [How M-Recon Works]
│   ├── WaitlistForm.tsx      [Email-Form + Validation]
│   ├── FAQ.tsx               [Accordion-FAQ]
│   └── Footer.tsx            [Contact + Social]
├── lib/
│   ├── supabase.ts           [Supabase-Client]
│   ├── email.ts              [Resend-API für Confirmation-Email]
│   └── validations.ts        [Zod-Schemas für Form]
├── types/
│   └── waitlist.ts           [TypeScript-Types]
├── public/
│   ├── og-image.png          [1200x630px für Social-Media-Preview]
│   └── favicon.ico
├── .env.example              [Environment-Variables mit Kommentaren]
├── .github/
│   ├── copilot-instructions.md  [Diese Datei]
│   └── workflows/
│       └── ci.yml            [Vercel-Preview-Deployment]
└── docs/
    ├── PRODUCT-VISION.md     [Primary SoT]
    ├── COPILOT-WORKFLOW.md   [Arbeitsanweisungen für Copilot]
    └── WAITLIST-PLAN.md      [Task-by-Task-Plan]
```

---

## 🔐 Environment Variables

```bash
# Supabase (von supabase.com Dashboard)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Resend (von resend.com Dashboard)
RESEND_API_KEY=re_your_api_key

# Plausible (optional)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=m-recon.vercel.app
```

---

## 📊 Supabase Schema (UPDATED 13.11.2025)

```sql
-- Waitlist-Table (UPDATED: added loan_interest column)
CREATE TABLE waitlist_signups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  business_type VARCHAR(100) NOT NULL,
  transactions_per_month VARCHAR(20),
  referral_source VARCHAR(255),
  loan_interest BOOLEAN DEFAULT FALSE,  -- NEW: Track loan partnership interest
  created_at TIMESTAMP DEFAULT NOW(),
  email_confirmed BOOLEAN DEFAULT FALSE,
  notes TEXT
);

-- Index für Performance
CREATE INDEX idx_email ON waitlist_signups(email);
CREATE INDEX idx_created_at ON waitlist_signups(created_at DESC);

-- Row Level Security (RLS)
ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Policy: Public kann INSERTen (für Waitlist-Form)
CREATE POLICY "Allow public insert" ON waitlist_signups
  FOR INSERT TO anon
  WITH CHECK (true);

-- Policy: Nur Authenticated kann SELECTen (für Admin-Dashboard später)
CREATE POLICY "Allow authenticated read" ON waitlist_signups
  FOR SELECT TO authenticated
  USING (true);
```

---

## 🧪 Testing-Strategie

### **Manual Testing (vor Deployment):**
- [ ] Form-Submission funktioniert (Email landet in Supabase)
- [ ] Validation funktioniert (Email-Format, Kenya-Phone-Format)
- [ ] loan_interest checkbox saves correctly (NEW)
- [ ] Confirmation-Email wird versendet (Resend)
- [ ] Success-Page wird angezeigt
- [ ] Mobile-Responsiveness (Chrome DevTools Mobile-View)
- [ ] Performance: Lighthouse-Score >90 (Mobile)
- [ ] Screenshot/proof elements visible (NEW - after adding)

### **Automated Testing (optional für später):**
- Unit-Tests: Zod-Validations (Vitest)
- E2E-Tests: Form-Submission (Playwright)

---

## 🚀 Deployment-Workflow

### **1. Development:**
```bash
pnpm install
pnpm run dev  # http://localhost:3000
```

### **2. Vercel-Deployment:**
```bash
# Automatisch bei Push zu main
git push origin main

# Preview-Deployment bei Pull-Request
git checkout -b feature/emergency-copy-fixes
git push origin feature/emergency-copy-fixes
# → Vercel erstellt Preview-URL
```

### **3. Custom Domain:**
- Domain: `m-recon.com` (bereits configured)
- Vercel-Dashboard: Settings → Domains
- SSL automatically enabled

---

## 📈 Analytics-Setup (UPDATED 13.11.2025)

### **Plausible (privacy-friendly, kein Cookie-Banner):**
```tsx
// app/layout.tsx
<Script
  defer
  data-domain="m-recon.vercel.app"
  src="https://plausible.io/js/script.js"
/>
```

**Track Custom Events:**
```tsx
// Nach Form-Submission
window.plausible('Waitlist Signup', {
  props: { 
    business_type: formData.businessType,
    loan_interest: formData.loanInterest  // NEW: Track checkbox
  }
});

// NEW: Track loan_interest checkbox clicks
window.plausible('Loan Interest Checked');
```

---

## 🎯 Code-Style & Best Practices

### **TypeScript:**
- Strict-Mode aktiviert (`tsconfig.json`)
- Keine `any`-Types (verwende `unknown` falls nötig)
- Alle Funktionen haben Return-Types

### **React-Components:**
- Server-Components by default (Next.js 14 App Router)
- Client-Components nur wo nötig (`'use client'` für Interaktivität)
- Props mit TypeScript-Interfaces

### **Tailwind:**
- Mobile-First Breakpoints (`sm:`, `md:`, `lg:`)
- Utility-Classes statt Custom-CSS
- Wiederverwendbare Styles via `@apply` (sparsam)

### **Accessibility:**
- Semantic HTML (`<button>`, `<nav>`, `<main>`)
- ARIA-Labels für Icons
- Keyboard-Navigation (Tab-Order)
- Contrast-Ratio ≥4.5:1 (WCAG AA)

### **Performance:**
- Images: Next.js `<Image>` Component (automatische Optimierung)
- Lazy-Loading: `loading="lazy"` für Below-Fold-Images
- Code-Splitting: Automatisch durch Next.js

### **Deutsche Kommentare in JEDER Datei:**
```typescript
/**
 * WARUM: Erklärt den Business-Purpose dieser Datei
 * WIE: Erklärt die technische Implementierung
 * WAS: Erklärt was genau diese Datei macht
 */
```

---

## 🔄 Git-Workflow

### **Branch-Naming:**
- `feature/form-validation`
- `fix/mobile-layout`
- `docs/update-readme`

### **Commit-Format (Conventional Commits):**
```bash
feat: add email validation to waitlist form
fix: mobile hero image overflow
docs: update README with deployment steps
chore: update dependencies
```

### **Pull-Request-Checklist:**
- [ ] Code läuft lokal (`pnpm run dev`)
- [ ] TypeScript-Check grün (`pnpm run type-check`)
- [ ] Linting grün (`pnpm run lint`)
- [ ] Mobile-Responsive getestet (Chrome DevTools)
- [ ] Screenshots im PR (vor/nach)

---

## 📚 Primary Source of Truth (SoT)

**UPDATED HIERARCHY (13.11.2025):**
**Wenn Konflikte entstehen, diese Hierarchie:**
1. `/docs/EMERGENCY-CHANGES.md` (NEW - Critical copy fixes 7/10 → 9/10)
2. `/docs/PRODUCT-VISION-2.0.md` (Was wird gebaut? Warum? Loan-access focus!)
3. `.github/copilot-instructions.md` (Diese Datei – Tech-Stack, Struktur, Copy Guidelines)
4. `/docs/COPILOT-WORKFLOW.md` (Arbeitsverhalten, Code-Style, Copy Guidelines)
5. `/docs/REDESIGN-PLAN.md` (Task-by-Task-Plan mit Emergency Fixes)
6. Code-Comments (Inline-Erklärungen für komplexe Logik)

---

## 💡 Copilot-Verhalten

### **🤖 Claude Code Integration (NEW 13.11.2025)**

**Mo hat jetzt Claude Code in WSL verfügbar!**

**CRITICAL: Check Complexity FIRST:**

```yaml
BEFORE implementing ANY task:
  1. Count files affected
  2. Check if architecture changes needed
  3. Assess cross-layer impact (Frontend + API + DB)

IF (≥3 files OR architecture change OR cross-layer):
  → ASK: "Soll Claude Code das übernehmen?"
  → GIVE: Recommendation + Reasoning
  → IF YES: Use Handoff Template (see CLAUDE-CODE-INTEGRATION.md)

IF (1-2 files AND simple change):
  → DO IT: Proceed with implementation

See: /.github/CLAUDE-CODE-INTEGRATION.md for full workflow
```

### **Wenn ich Frage: "Implementiere Task X"**
1. **CHECK COMPLEXITY FIRST** (Copilot vs Claude Code decision!)
2. Lese `/docs/EMERGENCY-CHANGES.md` FIRST (new critical fixes!)
3. Lese `/docs/PRODUCT-VISION-2.0.md` für Value Prop context
4. Checke diese Datei für Tech-Stack & Copy-Guidelines
5. **If complex:** Ask about Claude Code
6. **If simple:** Implementiere Task mit TypeScript Strict-Mode
7. **Follow COPY GUIDELINES** (loan-focused, outcome-based, no jargon)
8. Füge **deutsche Kommentare** hinzu (oben in jeder Datei: WARUM/WIE/WAS)
9. Sage mir: "✅ Task X fertig. Nächster Task: [Y]?"

### **Wenn ich sage: "Erklär mir das"**
1. User-Explanation (2-3 Sätze, deutsch, non-technical)
2. Technical-Explanation (Code-Details, für Devs)
3. Frage: "Soll ich weitermachen mit Task [Y]?"

### **Wenn ich sage: "Das funktioniert nicht"**
1. Frage nach Error-Message (Screenshot oder Text)
2. Debugge Schritt-für-Schritt
3. Erkläre die Lösung (warum war das falsch?)

### **WICHTIG: Deutsche Kommentare**
- **JEDE Datei** bekommt oben einen Block-Kommentar auf Deutsch
- Format:
```typescript
/**
 * WARUM: [Business-Purpose, für wen, wofür]
 * WIE: [Technische Implementierung, welche Tools]
 * WAS: [Was macht diese Datei konkret]
 */
```
- Inline-Kommentare für komplexe Logik auch auf Deutsch

### **CRITICAL: Copy Guidelines (13.11.2025)**
```yaml
When writing ANY user-facing text:
  ❌ AVOID:
    - "Free Forever" (we charge KES 500/mo later!)
    - "Parse", "extract", "process" (technical jargon)
    - "Bookkeeping", "time-saving" (wrong value prop - vitamin not painkiller!)
    - Vague benefits ("with confidence", "seamlessly")
    - Fake numbers (be honest about signup count)
  
  ✅ USE:
    - "Free for First 100" (honest + urgency)
    - "Turn into loan report" (clear transformation)
    - "Get approved 3x faster" (loan-access focus!)
    - "Ready to submit to SACCO/Bank" (specific outcome)
    - Real numbers OR remove entirely

  Priority Order:
    1. 🔥 Loan Access (painkiller - "get approved", "stop rejection")
    2. ⏰ Time-Saving (vitamin - "2 minutes", secondary benefit)
```

---

**Ende der Copilot Instructions** 🎯

---

## 💡 Copilot-Verhalten

### **Wenn ich Frage: "Implementiere Task X"**
1. Lese `/docs/WAITLIST-PLAN.md` für Task-Details
2. Checke diese Datei für Tech-Stack & Code-Style
3. Implementiere Task mit TypeScript Strict-Mode
4. Füge **deutsche Kommentare** hinzu (oben in jeder Datei: WARUM/WIE/WAS)
5. Sage mir: "✅ Task X fertig. Nächster Task: [Y]?"

### **Wenn ich sage: "Erklär mir das"**
1. User-Explanation (2-3 Sätze, deutsch, non-technical)
2. Technical-Explanation (Code-Details, für Devs)
3. Frage: "Soll ich weitermachen mit Task [Y]?"

### **Wenn ich sage: "Das funktioniert nicht"**
1. Frage nach Error-Message (Screenshot oder Text)
2. Debugge Schritt-für-Schritt
3. Erkläre die Lösung (warum war das falsch?)

### **WICHTIG: Deutsche Kommentare**
- **JEDE Datei** bekommt oben einen Block-Kommentar auf Deutsch
- Format:
```typescript
/**
 * WARUM: [Business-Purpose, für wen, wofür]
 * WIE: [Technische Implementierung, welche Tools]
 * WAS: [Was macht diese Datei konkret]
 */
```
- Inline-Kommentare für komplexe Logik auch auf Deutsch

---

**Ende der Copilot Instructions** 🎯
