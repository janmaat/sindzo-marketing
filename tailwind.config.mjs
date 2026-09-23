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
          // Was #5E7C82: 4,49:1 op wit en 3,9:1 op de mint-wash — Lighthouse vond op
          // elke pagina tientallen kleine teksten (text-xs, voetnoten, footer) onder
          // WCAG AA. #4F6D73 haalt ≥4,5:1 op wit, ink-100 én curanta-100.
          500: '#4F6D73',
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
        // Breedte van de site-container; zie de toelichting bij .container-prose
        // in global.css voor waarom 1400 en niet breder of smaller.
        site: '1400px',
        // Let op: 68ch is hier géén 68 tekens. De ch-eenheid meet de breedte van
        // het cijfer 0, en dat is 0,73em in Plus Jakarta Sans — dus 68ch komt op
        // 16px-tekst uit rond de 100 tekens per regel. Gebruik voor lopende tekst
        // liever max-w-2xl (672px) of read (hieronder), niet max-w-prose.
        prose: '68ch',
        // Comfortabele leesmaat voor 16px broodtekst: ~70 tekens per regel.
        read: '580px',
      },
      letterSpacing: {
        tightish: '-0.015em',
      },
    },
  },
  plugins: [],
};
