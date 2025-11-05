# 🚀 M-Recon Waitlist Site

**M-Pesa Bookkeeping für kleine kenianische KMUs** – Diese Waitlist-Site ist Phase 0 der Product-Validation.

---

## 📋 Projekt-Status

✅ **Fertiggestellt:**
- Next.js 14 mit TypeScript + Tailwind CSS
- Vollständige Landing-Page (Hero, Problem, Solution, Waitlist-Form, FAQ, Footer)
- Waitlist-Form mit Zod-Validation
- API-Endpoint `/api/waitlist` (bereitet Supabase-Integration vor)
- Email-Service (Resend) vorbereitet
- Deutsche Kommentare in ALLEN Dateien (Warum/Wie/Was)

⏳ **Nächste Schritte:**
1. Supabase-Projekt erstellen + ENV-Variables setzen
2. Resend-Account erstellen + API-Key setzen
3. Testen: Form-Submission → Supabase → Email
4. Deployment zu Vercel

---

## 🛠️ Setup & Installation

### **1. Dependencies installieren:**
```bash
pnpm install
```

### **2. Environment-Variables setzen:**
Kopiere `.env.example` zu `.env.local` und fülle die Werte aus:

```bash
cp .env.example .env.local
```

Dann editiere `.env.local`:
```bash
# Supabase (von supabase.com Dashboard)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# Resend (von resend.com Dashboard)
RESEND_API_KEY=re_your_api_key

# Plausible (optional)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=m-recon.vercel.app
```

### **3. Development-Server starten:**
```bash
pnpm run dev
```

Öffne http://localhost:3000 im Browser.

---

## 📊 Supabase-Setup

### **1. Projekt erstellen:**
- Gehe zu [supabase.com](https://supabase.com)
- Erstelle neues Projekt: "m-recon-waitlist"
- Wähle Region: `eu-central-1` (oder closest zu Kenya)

### **2. Tabelle erstellen:**
Öffne Supabase Dashboard → SQL Editor → Run:

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

### **3. API-Keys kopieren:**
- Gehe zu Settings → API
- Kopiere `Project URL` → `.env.local` als `NEXT_PUBLIC_SUPABASE_URL`
- Kopiere `anon public` Key → `.env.local` als `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 📧 Resend-Setup

### **1. Account erstellen:**
- Gehe zu [resend.com](https://resend.com)
- Sign up (kostenlos: 3.000 emails/month)

### **2. API-Key erstellen:**
- Dashboard → API Keys → Create API Key
- Kopiere Key → `.env.local` als `RESEND_API_KEY`

### **3. Domain verifizieren (später):**
- Für Production: Add Domain → DNS-Records setzen
- Für Testing: Nutze Default-Sender (`hello@resend.dev`)

---

## 🧪 Testing

### **1. Form-Submission testen:**
```bash
pnpm run dev
```

- Öffne http://localhost:3000
- Scrolle zu "Join the Waitlist"
- Fülle Form aus (Email + Phone im Kenya-Format: `+254712345678`)
- Submit → Sollte Success-Message zeigen

### **2. Supabase checken:**
- Öffne Supabase Dashboard → Table Editor → `waitlist_signups`
- Neuer Eintrag sollte sichtbar sein

### **3. Email checken:**
- Checke Inbox der eingegebenen Email
- Confirmation-Email sollte ankommen (Subject: "🎉 You're on the M-Recon Waitlist!")

---

## 🚀 Deployment zu Vercel

### **1. GitHub-Repo pushen:**
```bash
git add .
git commit -m "feat: complete waitlist site"
git push origin main
```

### **2. Vercel-Deployment:**
- Gehe zu [vercel.com](https://vercel.com)
- Sign up / Login mit GitHub
- Import Project → Wähle `M-Sieger/mpesa-recon` Repo
- Framework: Next.js (auto-detect)
- Root Directory: `/` (oder wo Waitlist-Site liegt)

### **3. Environment-Variables hinzufügen:**
In Vercel-Dashboard → Settings → Environment Variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `RESEND_API_KEY`
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`

### **4. Deploy:**
- Klicke "Deploy"
- Warte 2-3 Min
- ✅ Site ist live: `https://m-recon.vercel.app`

---

## 📂 Projekt-Struktur

```
mpesa-recon/
├── app/
│   ├── layout.tsx           # Root-Layout (Meta-Tags, Analytics)
│   ├── page.tsx              # Landing-Page (alle Sections)
│   ├── globals.css           # Global-Styles + Tailwind-Imports
│   └── api/
│       └── waitlist/
│           └── route.ts     # POST /api/waitlist (Form-Submission)
├── components/
│   ├── Hero.tsx              # Hero-Section + CTA
│   ├── ProblemSection.tsx    # Pain-Points (3 Cards)
│   ├── SolutionSection.tsx   # How M-Recon Works (3 Steps)
│   ├── WaitlistForm.tsx      # Form mit Validation
│   ├── FAQ.tsx               # Accordion-FAQ
│   └── Footer.tsx            # Footer (Links + Social)
├── lib/
│   ├── supabase.ts           # Supabase-Client
│   ├── email.ts              # Resend-Email-Service
│   └── validations.ts        # Zod-Schemas
├── types/
│   └── waitlist.ts           # TypeScript-Interfaces
├── docs/
│   └── COPILOT-WORKFLOW.md   # Arbeitsanweisungen für Copilot
├── .github/
│   └── copilot-instructions.md  # Tech-Stack, Code-Style
├── .env.example              # ENV-Template
├── .env.local                # ENV-Variables (nicht in Git)
├── tailwind.config.ts        # Tailwind-Config (Kenya-Farben)
├── tsconfig.json             # TypeScript-Config
└── package.json              # Dependencies
```

---

## 🎨 Design-System

### **Farben (Kenya-inspired):**
```css
Primary: #00A651    /* Safaricom Green */
Secondary: #E30613  /* Kenya Red */
Accent: #000000     /* Kenya Black */
Background: #F8F9FA /* Clean Grey */
Text: #1A1A1A       /* Dark Grey */
```

### **Typography:**
- **Font:** Inter (von Google Fonts)
- **Headlines:** `font-bold` (700)
- **Body:** `font-normal` (400)
- **Base-Size:** 16px (Mobile-First)

### **Breakpoints:**
- Mobile: `320px - 768px`
- Tablet: `768px - 1024px`
- Desktop: `1024px+`

---

## 📚 Dokumentation

### **Code-Kommentare:**
**JEDE Datei** hat oben einen Block-Kommentar auf Deutsch:

```typescript
/**
 * WARUM: [Business-Purpose – für wen ist das?]
 * WIE: [Technische Implementierung – welche Tools?]
 * WAS: [Was macht diese Datei konkret?]
 * 
 * BEISPIEL-USE:
 * [1-2 Zeilen Code-Beispiel]
 */
```

### **Weitere Docs:**
- `.github/copilot-instructions.md` – Vollständige Tech-Stack-Beschreibung
- `docs/COPILOT-WORKFLOW.md` – Code-Style-Regeln, Arbeitsweise
- Inline-Kommentare in komplexer Logik (auf Deutsch)

---

## 🐛 Troubleshooting

### **Problem: "Missing Supabase environment variables"**
**Lösung:** Checke `.env.local` – sind `NEXT_PUBLIC_SUPABASE_URL` und `NEXT_PUBLIC_SUPABASE_ANON_KEY` gesetzt?

### **Problem: Form-Submit funktioniert nicht**
**Lösung:** 
1. Checke Browser-Console: Welche Error-Message?
2. Checke Supabase-Logs: Dashboard → Logs
3. Checke API-Route: `app/api/waitlist/route.ts` → console.error

### **Problem: Email kommt nicht an**
**Lösung:**
1. Checke Resend-Dashboard: Logs → Delivery-Status
2. Checke Spam-Folder
3. Für Production: Domain muss verifiziert sein (DNS-Records)

### **Problem: TypeScript-Errors**
**Lösung:**
```bash
pnpm run type-check
```
- Checke `tsconfig.json` – ist `strict: true`?
- Checke alle Funktionen: Haben sie Return-Types?

---

## 📈 Nächste Features (nach Launch)

### **Phase 1: Analytics (Woche 1)**
- [ ] Plausible-Account erstellen
- [ ] Custom-Events tracken (Form-Submissions, Button-Clicks)

### **Phase 2: A/B-Testing (Woche 2-3)**
- [ ] Teste verschiedene Headlines (Problem vs. Solution-focused)
- [ ] Teste CTA-Wording ("Join Waitlist" vs. "Get Early Access")

### **Phase 3: Admin-Dashboard (Monat 2)**
- [ ] Supabase-Auth Setup
- [ ] Admin-Page: `/admin` → Liste aller Signups
- [ ] CSV-Export für Signups

---

## 🤝 Contributing

Falls du Änderungen machen willst:

1. Lese **ERST** `.github/copilot-instructions.md` (Tech-Stack, Struktur)
2. Lese `docs/COPILOT-WORKFLOW.md` (Code-Style, Kommentare)
3. Erstelle Feature-Branch: `git checkout -b feature/xyz`
4. Committe mit Conventional-Commits: `feat: add xyz`
5. Push + Pull-Request erstellen

---

## 📧 Kontakt

- **Email:** hello@m-recon.com
- **GitHub:** [@M-Sieger](https://github.com/M-Sieger)
- **Twitter:** [@m_recon](https://twitter.com/m_recon)

---

**Built with ❤️ for Kenyan SMEs** 🇰🇪
