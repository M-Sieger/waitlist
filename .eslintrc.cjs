/**
 * WARUM: Stellt ESLint-Regeln für Next.js sicher, um Codequalität zu garantieren
 * WIE: Verlängert das offizielle "next/core-web-vitals"-Preset und nutzt eslint-config-next
 * WAS: Exportiert die ESLint-Konfiguration, damit `pnpm run lint` klar definiert ist
 */

module.exports = {
  extends: ['next/core-web-vitals'],
};
