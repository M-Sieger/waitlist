# GitHub Copilot Instructions – M-Recon Waitlist Site

## 🎯 Projekt-Kontext

**Product Vision:**
M-Recon ist eine Mobile-First-App für kleine kenianische KMUs (1-10 Mitarbeiter), 
die Safaricom M-Pesa PDF-Statements automatisch in organisierte Finanzunterlagen 
umwandelt – für Kredit-Anträge (WEF, Banken, etc.).

**Diese Waitlist-Site ist Phase 0 (Product Validation):**
- Ziel: 30+ Email-Signups in Woche 1
- Zielgruppe: Dukas, Mama Mbogas, Salons, kleine Shops in Nairobi
- Launch-Kanäle: WhatsApp-Gruppen, Grace's Cousine + 10 KMU-Interviews
- Success-Metric: 50%+ der Interviews sagen "Ja, würde Email-Adresse geben"

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

## 📊 Supabase Schema

```sql
-- Waitlist-Table
CREATE TABLE waitlist_signups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  business_type VARCHAR(100) NOT NULL,
  transactions_per_month VARCHAR(20),
  referral_source VARCHAR(255),
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
- [ ] Confirmation-Email wird versendet (Resend)
- [ ] Success-Page wird angezeigt
- [ ] Mobile-Responsiveness (Chrome DevTools Mobile-View)
- [ ] Performance: Lighthouse-Score >90 (Mobile)

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
git checkout -b feature/form-validation
git push origin feature/form-validation
# → Vercel erstellt Preview-URL
```

### **3. Custom Domain (optional):**
- Kaufe Domain: `m-recon.com` (~$10/Jahr bei Namecheap)
- Vercel-Dashboard: Settings → Domains → Add Domain
- Nameservers auf Vercel umstellen

---

## 📈 Analytics-Setup

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
  props: { business_type: formData.businessType }
});
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

**Wenn Konflikte entstehen, diese Hierarchie:**
1. `/docs/PRODUCT-VISION.md` (Was wird gebaut? Warum?)
2. `.github/copilot-instructions.md` (Diese Datei – Tech-Stack, Struktur)
3. `/docs/COPILOT-WORKFLOW.md` (Arbeitsverhalten, Code-Style)
4. `/docs/WAITLIST-PLAN.md` (Task-by-Task-Plan)
5. Code-Comments (Inline-Erklärungen für komplexe Logik)

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
