/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      // Sindzo-palet — klinisch, vertrouwd, rustig.
      // Bewust andere tint dan Ponscura (warmer/orange) zodat
      // beide producten visueel onmiddellijk te onderscheiden zijn.
      colors: {
        sindzo: {
          50:  '#f0f7f8',
          100: '#d9eaed',
          200: '#b3d4da',
          300: '#85b7c0',
          400: '#5896a3',
          500: '#3f7d8a',
          600: '#326470',
          700: '#2a525c',
          800: '#24444d',
          900: '#1f3a42',
          950: '#0f2026',
        },
        accent: {
          // Warm accent voor CTA-knoppen — niet voor body
          500: '#d97757',
          600: '#c45a3d',
        },
        ink: {
          900: '#0f172a',
          700: '#334155',
          500: '#64748b',
          300: '#cbd5e1',
          100: '#f1f5f9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Inter Display"', 'Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        prose: '68ch',
      },
      letterSpacing: {
        tightish: '-0.015em',
      },
    },
  },
  plugins: [],
};
