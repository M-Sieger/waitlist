/**
 * WARUM: PostCSS-Config für Tailwind CSS-Processing
 * WIE: Tailwind + Autoprefixer (für Browser-Kompatibilität)
 * WAS: Verarbeitet CSS beim Build (Tailwind-Classes → normales CSS)
 */

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
