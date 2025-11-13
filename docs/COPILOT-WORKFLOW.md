# 🤖 Copilot-Arbeitsanweisungen – M-Recon Waitlist Site

**Erstellt:** 2025-11-04  
**EMERGENCY UPDATE:** 2025-11-13 - Copy Guidelines (Loan-Focused, Outcome-Based)  
**Purpose:** Definiert, wie GitHub Copilot sich bei diesem Projekt verhalten soll  
**Zielgruppe:** GitHub Copilot + Developer (Mo)

---

## 🎯 Kern-Prinzip

**"Code mit deutschen Erklärungen, damit Mo immer versteht, was passiert"**

Jede Datei, jede Funktion muss für einen **Non-Expert-Developer** verständlich sein.  
Mo lernt dabei – also Code soll **selbsterklärend UND dokumentiert** sein.

**NEUE PRIORITÄT (13.11.2025):**  
**"Copy muss LOAN-ACCESS fokussiert sein, nicht Time-Saving"**  
→ Fokus auf painkiller (loan rejection), nicht vitamin (efficiency)  
→ Outcome-focused (approved loan), nicht process-focused (organized records)  
→ Siehe: `/docs/EMERGENCY-CHANGES.md` für Kontext

---

## 📝 Code-Kommentare (PFLICHT für JEDE Datei)

### **Format: Datei-Header (oben in JEDER Datei):**

```typescript
/**
 * WARUM: [Business-Purpose – für wen ist das, welches Problem löst es?]
 * WIE: [Technische Implementierung – welche Tools, Libraries, Patterns?]
 * WAS: [Was macht diese Datei konkret – Inputs, Outputs, Side-Effects?]
 * 
 * BEISPIEL-USE:
 * [1-2 Zeilen Code-Beispiel, wie man diese Datei nutzt]
 */
```

**Beispiel:**
```typescript
/**
 * WARUM: User gibt Email ein → wir müssen validieren, dass Format korrekt ist
 * WIE: Zod-Schema (TypeScript-Library für Validierung)
 * WAS: Definiert Regeln für Waitlist-Form (Email, Phone, Business-Type)
 * 
 * BEISPIEL-USE:
 * const result = waitlistSchema.parse(formData); // ✅ valid oder ❌ Error
 */
import { z } from 'zod';
// ... rest of file
```

---

## 🧩 Inline-Kommentare (für komplexe Logik)

### **Wann einen Inline-Kommentar schreiben?**
- ✅ **Ja:** Wenn die Logik nicht sofort klar ist (z.B. Regex, API-Error-Handling, Edge-Cases)
- ❌ **Nein:** Wenn der Code selbsterklärend ist (z.B. `const email = formData.email`)

### **Format:**
```typescript
// [Deutsch] Was passiert hier und WARUM ist das nötig?
// [Deutsch] Was wäre die Alternative? Warum machen wir es SO?
```

**Beispiel:**
```typescript
// Wir checken ob Supabase-URL existiert, BEVOR wir Client erstellen
// Falls .env.local fehlt → klarer Error statt cryptische Crashes später
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Check .env.local');
}
```

---

## 🎨 Code-Style (TypeScript + React)

### **TypeScript:**
- ✅ **Strict-Mode:** Immer aktiviert (`tsconfig.json`)
- ✅ **Return-Types:** JEDE Funktion hat expliziten Return-Type
- ❌ **Keine `any`:** Verwende `unknown` falls Type nicht klar ist
- ✅ **Interfaces:** Für alle Props, API-Responses, Database-Schemas

**Beispiel:**
```typescript
// ❌ FALSCH (kein Return-Type, any)
async function fetchData(id: any) {
  // ...
}

// ✅ RICHTIG (Return-Type, specific Type)
async function fetchData(id: string): Promise<WaitlistSignup> {
  // ...
}
```

---

### **React-Components:**
- ✅ **Server-Components by Default:** Nur Client-Components wenn nötig (`'use client'`)
- ✅ **Props-Interfaces:** Immer typisiert
- ✅ **Semantic HTML:** `<button>`, `<nav>`, `<main>` statt `<div onClick>`
- ✅ **Accessibility:** ARIA-Labels für Icons, Keyboard-Navigation

**Beispiel:**
```typescript
// ✅ Server-Component (kein 'use client' → schneller)
export default function Hero() {
  return <section>...</section>;
}

// ✅ Client-Component (nur wenn Interaktivität nötig)
'use client';
import { useState } from 'react';
export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  // ...
}
```

---

### **Tailwind CSS:**
- ✅ **Mobile-First:** `sm:`, `md:`, `lg:` Breakpoints
- ✅ **Utility-Classes:** Direkt in JSX, kein Custom-CSS
- ❌ **Kein `@apply`:** Nur in Ausnahmefällen (wiederverwendbare Styles)

**Beispiel:**
```tsx
// ✅ RICHTIG (Mobile-First, responsive)
<button className="w-full px-4 py-3 md:w-auto md:px-8 md:py-4">
  Join Waitlist
</button>

// ❌ FALSCH (Desktop-First)
<button className="px-8 py-4 md:px-4 md:py-3">
  Join Waitlist
</button>
```

---

## ✍️ COPY-GUIDELINES (EMERGENCY UPDATE 13.11.2025)

**Context:** Waitlist page reality check → Language zu technical, wrong value prop  
**See:** `/docs/EMERGENCY-CHANGES.md` für full context

### **❌ AVOID (Technical Jargon):**
```yaml
Bad Words:
  - "Parse" → use "turn into"
  - "Process" → use "transform"
  - "Extract" → use "read"
  - "Automatically" → use specific action
  - "Seamlessly" → use specific benefit
  - "Organized & categorized" → use specific outcome

Bad Phrases:
  - "Apply with confidence" → vague, what does this mean?
  - "Get your records in order" → process-focused, not outcome
  - "M-Pesa bookkeeping made easy" → wrong positioning (Mint competitor)
```

### **✅ USE INSTEAD (Outcome-Focused):**
```yaml
Good Patterns:
  - "Turn [X] into [Y]" (clear transformation)
  - "Ready to submit to [specific lender]" (concrete outcome)
  - "[Number] minutes/hours" (measurable benefit)
  - "Increase approval chances" (emotional, specific)
  - "Stop getting rejected" (pain point → solution)

Good Examples:
  - "Turn M-Pesa statements into professional loan reports"
  - "Ready to submit to your SACCO, Bank, or Chama"
  - "Get approved 3x faster"
  - "2 minutes from PDF to loan-ready report"
  - "Banks and SACCOs accept M-Recon reports"
```

### **BEFORE/AFTER Examples:**

**Example 1 (Solution Step 2):**
```yaml
❌ BEFORE (Technical):
  "We parse it automatically in 2 minutes. 
   Your data is organized & categorized."

✅ AFTER (Outcome-Focused):
  "We turn it into a professional loan report in 2 minutes.
   Ready to submit to your SACCO, Bank, or Chama."

Why better:
  - "Turn into" > "parse" (user understands)
  - "Professional loan report" > "organized data" (specific outcome)
  - "Ready to submit" > "organized" (shows next action)
  - Names specific lenders (SACCO, Bank, Chama)
```

**Example 2 (Solution Step 3):**
```yaml
❌ BEFORE (Vague):
  "Apply to ANY lender with confidence"

✅ AFTER (Specific):
  "Submit to SACCOs, Banks, WEF, or Chamas.
   Increase approval chances by showing organized records 
   that lenders trust."

Why better:
  - Names specific lender types (credibility)
  - "Increase approval chances" > "with confidence" (measurable)
  - "Lenders trust" (third-party validation)
```

**Example 3 (Headline):**
```yaml
❌ BEFORE (Vitamin - Time-Saving):
  "Stop Wasting 20 Hours Every Month on M-Pesa Bookkeeping"

✅ AFTER (Painkiller - Loan Access):
  "Get Approved for Your Next Loan 3x Faster"

Why better:
  - Fokus on painkiller (loan rejection) not vitamin (time-saving)
  - Outcome-focused (approval) not process (bookkeeping)
  - Emotional (rejection = real pain)
  - Works for Business, Personal, SACCO, Chama loans
```

### **LOAN-ACCESS > TIME-SAVING:**
```yaml
Priority Hierarchy (ALWAYS in this order):
  1. 🔥 Loan Access (painkiller - validated pain!)
     → "Get approved faster"
     → "Stop getting rejected"
     → "Accepted by SACCOs/Banks"
  
  2. ⏰ Time-Saving (vitamin - nice-to-have)
     → "2 minutes instead of 20 hours"
     → "No more Excel work"
     → Use only as SECONDARY benefit

Why:
  - 60% loan rejections = validated pain (painkiller)
  - Time-saving = efficiency (vitamin, not urgent)
  - Users pay for OUTCOMES (loan), not PROCESS (time saved)
```

### **WHEN WRITING COPY:**
```yaml
Ask yourself:
  1. ❓ Does this focus on LOAN ACCESS (painkiller)?
     → If no, rewrite to focus on loan approval
  
  2. ❓ Does this show a SPECIFIC OUTCOME?
     → "Approved for loan" not "organized records"
  
  3. ❓ Would a non-technical user understand this?
     → No "parse", "extract", "process"
  
  4. ❓ Does this name SPECIFIC LENDERS?
     → "SACCO, Bank, Chama" not "any lender"
  
  5. ❓ Is this MEASURABLE or EMOTIONAL?
     → "3x faster" or "stop getting rejected"
     → Not "with confidence" or "seamlessly"
```

---

## 🔄 Arbeitsweise (Schritt-für-Schritt)

### **Wenn Mo sagt: "Implementiere Task X"**

1. **Context checken:**
   - Lese `.github/copilot-instructions.md` (Tech-Stack, Struktur)
   - Lese `docs/WAITLIST-PLAN.md` (Task-Details)
   - Lese `docs/COPILOT-WORKFLOW.md` (diese Datei – Code-Style)

2. **Implementieren:**
   - Erstelle Datei mit **Datei-Header-Kommentar** (WARUM/WIE/WAS)
   - Schreibe Code mit TypeScript Strict-Mode
   - Füge **Inline-Kommentare** hinzu (wo Logik komplex ist)
   - Nutze **deutsche Kommentare** (für Mo's Verständnis)

3. **Feedback:**
   - Sage: "✅ Task X fertig. Was ich gemacht habe: [1-2 Sätze]"
   - Frage: "Soll ich weitermachen mit Task Y?"

---

### **Wenn Mo sagt: "Erklär mir das"**

1. **User-Explanation (Non-Technical):**
   - 2-3 Sätze auf Deutsch
   - Keine Tech-Terms (als würdest du es einem Nicht-Programmierer erklären)
   - Beispiel: "Diese Datei checkt, ob die Email-Adresse gültig ist. Wenn ja → weiter. Wenn nein → Fehlermeldung."

2. **Technical-Explanation (für Devs):**
   - Welche Library/Tool wird genutzt?
   - Warum diese Implementierung (vs. Alternativen)?
   - Was sind Edge-Cases?

3. **Frage:**
   - "Soll ich weitermachen mit Task Y?"

---

### **Wenn Mo sagt: "Das funktioniert nicht"**

1. **Error-Message anfordern:**
   - "Kannst du mir die Fehlermeldung zeigen? (Screenshot oder Text)"

2. **Debuggen:**
   - Schritt-für-Schritt durch den Code gehen
   - Checke: Environment-Variables, Dependencies, Supabase-Connection

3. **Lösung erklären:**
   - "Das Problem war: [X]"
   - "Die Lösung ist: [Y]"
   - "Warum das passiert ist: [Z]"

---

## 📚 File-Naming & Struktur

### **Dateinamen:**
- ✅ **PascalCase** für Components: `Hero.tsx`, `WaitlistForm.tsx`
- ✅ **camelCase** für Libraries: `supabase.ts`, `validations.ts`
- ✅ **kebab-case** für Routes: `app/api/waitlist/route.ts`

### **Ordnerstruktur:**
```
app/              → Next.js-Pages + API-Routes
components/       → React-Components (wiederverwendbar)
lib/              → Business-Logic, API-Clients, Utils
types/            → TypeScript-Interfaces + Types
public/           → Static-Assets (Images, Favicon)
docs/             → Dokumentation (Markdown-Files)
.github/          → GitHub-Config (Copilot-Instructions, Workflows)
```

---

## 🚨 Fehler, die du VERMEIDEN sollst

### **1. Code ohne Kommentare:**
```typescript
// ❌ FALSCH (keine Erklärung)
export const supabase = createClient(url, key);

// ✅ RICHTIG (mit Erklärung)
/**
 * WARUM: Verbindung zu Supabase-Datenbank für Waitlist-Signups
 * WIE: @supabase/supabase-js Client mit ENV-Variables
 * WAS: Stellt `supabase`-Object zur Verfügung für Queries
 */
export const supabase = createClient(url, key);
```

---

### **2. `any`-Type in TypeScript:**
```typescript
// ❌ FALSCH (any = Type-Safety verloren)
function processData(data: any) {
  return data.email;
}

// ✅ RICHTIG (specific Type)
function processData(data: WaitlistFormData): string {
  return data.email;
}
```

---

### **3. Client-Component wenn nicht nötig:**
```typescript
// ❌ FALSCH (unnötiges 'use client')
'use client';
export default function Hero() {
  return <section>Static Content</section>;
}

// ✅ RICHTIG (Server-Component = schneller)
export default function Hero() {
  return <section>Static Content</section>;
}
```

---

### **4. Desktop-First statt Mobile-First:**
```tsx
// ❌ FALSCH (Desktop-First)
<div className="grid-cols-3 md:grid-cols-1">

// ✅ RICHTIG (Mobile-First)
<div className="grid-cols-1 md:grid-cols-3">
```

---

## ✅ Checklist vor Datei-Creation

Bevor du eine Datei erstellst, checke:
- [ ] **Datei-Header-Kommentar** vorhanden? (WARUM/WIE/WAS)
- [ ] **TypeScript-Types** definiert? (keine `any`)
- [ ] **Return-Types** für alle Funktionen?
- [ ] **Inline-Kommentare** für komplexe Logik?
- [ ] **Deutsche Kommentare** für Mo's Verständnis?
- [ ] **Mobile-First** Tailwind-Classes?
- [ ] **Accessibility** beachtet? (Semantic HTML, ARIA)

---

## 🎯 Ziel dieser Workflow-Datei

**Mo soll:**
1. ✅ Jeden Code-Block **sofort verstehen** (ohne Googlen)
2. ✅ **Lernen**, warum wir bestimmte Patterns nutzen
3. ✅ **Selbstständig** ähnliche Dateien erstellen können (nach 10-20 Dateien)

**Copilot soll:**
1. ✅ **Konsistenten Code** produzieren (Style, Kommentare, Struktur)
2. ✅ **Mo's Verständnis priorisieren** (Erklärungen > Kürze)
3. ✅ **Best-Practices** automatisch anwenden (TypeScript, React, Tailwind)

---

**Ende der Copilot-Arbeitsanweisungen** 🎯
