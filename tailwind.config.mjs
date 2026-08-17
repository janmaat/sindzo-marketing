/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      // Curanta-palet (mint). Petrol als basis, mint als accent.
      colors: {
        // Curanta-merkfamilie: lichte mint-wash (50) → diep petrol (950).
        // Waarden overgenomen uit de vorige `sindzo`-familie, want dát was de
        // familie die alle 166 klassen in src/ gebruikten — de gelijknamige
        // `curanta`-familie stond erbij maar werd nergens aangesproken. Zo blijft
        // de rebrand een naamsverandering en geen herontwerp.
        curanta: {
          50:  '#F1F8F7', // surface
          100: '#D9EDE9',
          200: '#B0DDD5',
          300: '#7FC6BB',
          400: '#4AAA9D',
          500: '#21C7A8', // mint accent
          600: '#149F86',
          700: '#0E4F57', // petrol — basis / tekst
          800: '#0B4148',
          900: '#0E4F57', // petrol (bewust gelijk aan 700; zo stond het ook in
                          // de sindzo-familie, en 16 klassen leunen erop)
          950: '#06262A',
        },
        // Mint accent voor CTA en kleine tekst.
        // 500 = button-bg, 600 = hover/large display, 700 = small-text (WCAG AA).
        accent: {
          500: '#21C7A8', // mint
          600: '#149F86',
          700: '#0B7D6A', // mint-strong (AA op wit)
        },
        // Neutrale inkt/lijn-schaal — petrol-toned.
        ink: {
          900: '#0E4F57',
          700: '#2C5F66',
          500: '#5E7C82',
          300: '#C5D9DC',
          200: '#DAE6E8',
          100: '#F1F8F7',
        },
        cream:     '#FFFFFF',     // Curanta gebruikt wit i.p.v. crème
        sand:      '#F1F8F7',     // → curanta-surface
        greensoft: '#D9EDE9',     // → lichte mint-wash
      },
      fontFamily: {
        // Curanta-merk: Plus Jakarta Sans voor zowel body als display.
        // De aliassen sans/display delen bewust dezelfde stack.
        sans:    ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
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
