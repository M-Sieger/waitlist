# 🤖 Claude Code + VS Code Copilot Integration

**Created:** 13.11.2025  
**Purpose:** Definiert wann Copilot vs. Claude Code verwendet wird  
**Context:** WSL-Integration mit Claude Code für komplexe Refactorings

---

## 🎯 WANN WELCHES TOOL?

### **VS Code Copilot (Dieser Chat):**
```yaml
Use Cases:
  ✅ Planung & Dokumentation
  ✅ Kleine Code-Änderungen (1-2 Dateien)
  ✅ Inline-Autocompletion
  ✅ Schnelle Bugfixes
  ✅ Component-Snippets (einzelne React Components)
  ✅ Copy-Writing & Content-Updates
  ✅ Code-Erklärungen & Debugging-Hilfe
  ✅ Deutsche Kommentare schreiben
  
Examples:
  - "Fix Headline in Hero.tsx"
  - "Add FAQ question about locked PDFs"
  - "Update PRODUCT-VISION.md"
  - "Explain this Zod schema"
  - "Write German comments for this function"
```

### **Claude Code (WSL Terminal):**
```yaml
Use Cases:
  ✅ Multi-File Refactoring (3+ Dateien)
  ✅ Architektur-Änderungen (globaler Scope)
  ✅ Code-Flow über mehrere Schichten (Frontend → API → DB)
  ✅ Komplexe Dependency-Updates
  ✅ Migration Tasks (z.B. i18n Routing umbauen)
  ✅ Performance-Optimierungen (cross-file)
  ✅ Testing-Setup (Vitest/Playwright)
  
Examples:
  - "Migrate app/ to app/[locale]/ for i18n"
  - "Update ALL components to use useTranslations()"
  - "Refactor Supabase client to use new API"
  - "Setup E2E testing with Playwright"
  - "Optimize image loading across all pages"
```

---

## 🔄 ENTSCHEIDUNGS-WORKFLOW

### **Copilot prüft automatisch:**

```typescript
/**
 * DECISION TREE (Copilot internes Checking):
 * 
 * IF (Aufgabe betrifft 1-2 Dateien):
 *   → Copilot macht es selbst
 * 
 * IF (Aufgabe betrifft 3+ Dateien ODER globale Architektur):
 *   → Frage User: "Soll Claude Code das übernehmen?"
 * 
 * IF (User sagt "ja"):
 *   → Gebe klare Anweisungen für Claude Code (mit Context)
 * 
 * IF (User sagt "nein"):
 *   → Copilot macht es, aber warnt vor möglicher Komplexität
 */
```

### **Copilot fragt automatisch:**

Wenn Copilot erkennt, dass eine Aufgabe komplex ist:

```
🤖 COPILOT PROMPT:

"Diese Änderung betrifft [X Dateien] und könnte die [Architektur/Routing/State] 
beeinflussen. 

Soll ich:
A) Selbst fortfahren (kann länger dauern, evtl. mehrere Iterationen)
B) Claude Code verwenden (schneller, globaler Überblick, WSL-optimiert)

Empfehlung: [A/B] weil [Begründung]"
```

---

## 📋 TRIGGER-REGELN (für Copilot)

### **🚨 IMMER Claude Code vorschlagen wenn:**

```yaml
Multi-File Changes:
  - ≥3 Dateien gleichzeitig ändern
  - Gleiche Änderung in vielen Files (z.B. alle Components updaten)
  
Architektur:
  - Ordnerstruktur umbauen (z.B. app/ → app/[locale]/)
  - Routing-Änderungen (middleware, layouts)
  - State-Management-Integration (Zustand, Redux)
  
Cross-Layer:
  - Frontend + API + DB gleichzeitig
  - i18n-Migration (Components + Messages + Config)
  
Dependencies:
  - Major Version Updates (Next.js 14 → 15)
  - Library-Migrationen (Supabase v1 → v2)
  
Testing:
  - Setup von Test-Infrastructure
  - E2E-Tests über mehrere Pages
```

### **✅ Copilot kann selbst wenn:**

```yaml
Single-File:
  - Nur 1 Component ändern
  - Nur 1 Doc-File updaten
  
Content:
  - Copy-Writing (Headlines, FAQ)
  - Kommentare hinzufügen
  - README/Docs schreiben
  
Quick Fixes:
  - Typo-Fixes
  - Import-Statements korrigieren
  - CSS/Tailwind-Klassen anpassen
  
Explanations:
  - Code erklären
  - Debugging-Hilfe
  - Dokumentation lesen/zusammenfassen
```

---

## 🎯 COPILOT → CLAUDE CODE HANDOFF

### **Template für Handoff:**

Wenn Copilot zu Claude Code übergibt, gibt er IMMER:

```markdown
# HANDOFF TO CLAUDE CODE

## Context:
[Was soll gemacht werden, warum komplex?]

## Files Affected:
- /app/[locale]/page.tsx
- /components/Hero.tsx
- /components/ProblemSection.tsx
- [etc.]

## What needs to happen:
1. [Schritt 1 - konkret]
2. [Schritt 2 - konkret]
3. [Schritt 3 - konkret]

## Important Constraints:
- [z.B. "Keep German comments"]
- [z.B. "Follow copy guidelines from EMERGENCY-CHANGES.md"]
- [z.B. "Don't break existing API routes"]

## Related Docs:
- /docs/EMERGENCY-CHANGES.md (Copy-Guidelines)
- /docs/PRODUCT-VISION-2.0.md (Value Prop)
- /.github/copilot-instructions.md (Tech-Stack)

## Success Criteria:
- [✅ Was muss am Ende funktionieren?]
- [✅ Wie testest du es?]
```

---

## 🧪 BEISPIEL-SZENARIEN

### **Szenario 1: i18n Migration (Claude Code)**

```yaml
User Request:
  "Migrate app folder to [locale] routing"

Copilot Check:
  ❌ Betrifft 10+ Dateien (app/page.tsx, layout.tsx, all components)
  ❌ Architektur-Änderung (Routing-Pattern)
  ❌ Cross-Layer (Frontend + Middleware + Config)

Copilot Response:
  "🚨 Diese Aufgabe betrifft 10+ Dateien und ändert die Routing-Architektur.
  
  EMPFEHLUNG: Claude Code verwenden
  
  WARUM:
  - Globaler Überblick über alle Imports
  - Automatische Dependency-Updates
  - Weniger Fehler bei großen Refactorings
  
  Soll ich die Anweisungen für Claude Code vorbereiten?"

User: "Ja"

Copilot Handoff:
  [Gibt Template oben mit allen Details]
```

### **Szenario 2: Headline Fix (Copilot)**

```yaml
User Request:
  "Fix headline in Hero.tsx to 'Get Approved for Loans 3x Faster'"

Copilot Check:
  ✅ Nur 1 Datei (components/Hero.tsx)
  ✅ Content-Änderung (kein Code-Refactoring)
  ✅ Klare Anweisung

Copilot Response:
  "✅ Mache ich direkt! (1 Datei, einfache Copy-Änderung)"
  
  [Macht die Änderung selbst]
```

### **Szenario 3: Emergency Fixes (Copilot ODER Claude)**

```yaml
User Request:
  "Implement all 6 emergency fixes from EMERGENCY-CHANGES.md"

Copilot Check:
  ⚠️ 6 separate Tasks
  ⚠️ Betrifft 4-5 Dateien (Hero, FAQ, SocialProof, etc.)
  ✅ ABER: Jeder Task ist einzeln machbar

Copilot Response:
  "⚠️ Diese Aufgabe hat 6 separate Fixes in 5 Dateien.
  
  OPTION A (Copilot): 
    Ich mache es Task-by-Task (6 separate Edits, du checkst jeden)
    → Dauert länger, aber du siehst jeden Schritt
  
  OPTION B (Claude Code):
    Claude macht alle 6 Fixes in einem Durchgang
    → Schneller, aber du reviewst am Ende alles
  
  Was bevorzugst du?"
```

---

## 🔧 INTEGRATION IN COPILOT-INSTRUCTIONS

**Add to `.github/copilot-instructions.md`:**

```markdown
## 🤖 Claude Code Integration (13.11.2025)

**NEW:** Mo hat jetzt Claude Code in WSL verfügbar!

### Wann Copilot zu Claude Code wechseln soll:

ALWAYS ASK wenn:
  - ≥3 Dateien betroffen
  - Architektur-Änderungen (Routing, State, Structure)
  - Cross-Layer-Changes (Frontend + API + DB)
  - Major Refactorings

NEVER ASK wenn:
  - 1-2 Dateien nur
  - Content/Copy-Changes
  - Quick Bugfixes
  - Documentation

Bei Unsicherheit:
  → Frage User: "Soll Claude Code das übernehmen?"
  → Gebe Empfehlung mit Begründung
  → Wenn JA: Nutze Handoff-Template (siehe CLAUDE-CODE-INTEGRATION.md)
```

---

## 📚 RELATED DOCS

- `.github/copilot-instructions.md` - Copilot Tech-Stack & Workflow
- `docs/COPILOT-WORKFLOW.md` - Detailed Copilot behavior
- `docs/EMERGENCY-CHANGES.md` - Current priorities (copy fixes)
- `docs/PRODUCT-VISION-2.0.md` - Product context

---

## ✅ NEXT STEPS

1. **Copilot liest diese Datei** bei jedem komplexen Request
2. **Copilot fragt automatisch** wenn Aufgabe zu komplex
3. **User entscheidet** (A: Copilot, B: Claude Code)
4. **Handoff-Template** wird automatisch generiert (wenn B)

---

**Ende der Claude Code Integration Guidelines** 🚀
