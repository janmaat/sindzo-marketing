/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      // Sindzo-palet — afgestemd op de one-pager-vormgeving:
      // diep petrol/groen, fris groen accent, warme crème achtergrond.
      colors: {
        // Merkfamilie: van lichte groene wash (50) naar diep petrol (900/950).
        sindzo: {
          50:  '#f0f7f4',
          100: '#dfeee8',
          200: '#c2ded3',
          300: '#93c6b6',
          400: '#5fa68f',
          500: '#3f8f76',
          600: '#2c6c5d',
          700: '#1a5249',
          800: '#11463f',
          900: '#0e423d',
          950: '#0a302c',
        },
        // Fris groen accent voor CTA-knoppen en highlights (one-pager-groen).
        // 500 = button-bg, 600 = button-hover + large display, 700 = small-text
        // (700 is donker genoeg voor WCAG AA op white/cream).
        accent: {
          500: '#3fa37a',
          600: '#2f8c66',
          700: '#2a7d5b',
        },
        // Warm-neutrale inkt/lijn-schaal.
        ink: {
          900: '#19302c',
          700: '#3a4a46',
          500: '#5d706b',
          300: '#dfe6e1',
          200: '#c7d2cc',
          100: '#f6f2e9',
        },
        cream:     '#fbf9f4',
        sand:      '#f6f2e9',
        greensoft: '#e7f1ea',
      },
      fontFamily: {
        // Body: Mulish (humanist sans). Koppen: Fraunces (warme serif).
        sans: ['Mulish', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
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
