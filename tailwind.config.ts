/**
 * WARUM: Tailwind CSS v3-Konfiguration mit Kenya-inspirierten Farben
 * WIE: Custom-Colors (Safaricom Green, Kenya Red), Inter-Font, Mobile-First
 * WAS: Definiert Design-System für gesamte Waitlist-Site
 * 
 * BEISPIEL-USE:
 * <button className="bg-primary text-white">Join Waitlist</button>
 */

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Kenya-inspirierte Farben
        primary: '#00A651',    // Safaricom Green
        secondary: '#E30613',  // Kenya Red
        accent: '#000000',     // Kenya Black
        background: '#F8F9FA', // Clean Grey
        text: '#1A1A1A',       // Dark Grey
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
