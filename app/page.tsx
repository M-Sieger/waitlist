/**
 * WARUM: Landing-Page (Home) mit Hero + Problem + Solution + Waitlist-Form + FAQ + Footer
 * WIE: Server-Component (Next.js 14) → schnelles Initial-Load
 * WAS: Kombiniert alle Sections zu einer vollständigen Landing-Page
 * 
 * BEISPIEL-USE:
 * User öffnet http://localhost:3000 → sieht diese Page
 */

import HomePage from '@/components/HomePage';

export default function Home() {
  return <HomePage />;
}
