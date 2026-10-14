# Curanta.Marketing — curanta.nl

Statische Astro-site (Tailwind, MDX) van Curanta. Build: `npm run build` → `dist/`. Uitrol: zip van
`dist/` uitpakken in `/httpdocs` via Plesk (zie de skill `site-inhoudscontrole` in de Ponscura-repo).

## Feiten

Elk feit op deze site — prijzen, contact, hosting, talen, koppelingen, termijnen, beveiliging, de demo —
komt uit het feitenblad: `D:\Repos\Ponscura\docs\campagne\feitenblad-curanta.md`. Staat iets daar niet,
zeg het dan niet, of voeg het daar eerst toe met bron. Claims toets je met de skill `claimtoets`, de hele
site met `site-inhoudscontrole` (beide in `D:\Repos\Ponscura\.claude\skills\`).

## Grenzen

- De site plaatst geen cookies en laadt geen meetdienst van derden; alleen de eigen cookieloze
  bezoekmeting van app.curanta.nl (feitenblad, besluit Jan 25-09-2026).
- Geen persoonsnaam, geen "team" en geen Ponscura op de site; "Curanta is een handelsnaam van Maat
  Holding B.V." in footer, /over en /voorwaarden.
- De twee demoknoppen staan in `src/config/demo.ts`: tekst overal gelijk, bestemming per branch.
- Geen klantlogo's, citaten, klantaantallen of casussen. De eerste implementatie loopt sinds oktober 2026,
  bij een organisatie in de basis-ggz; in productie werkt er nog geen zorgorganisatie mee. Zo mag het er
  staan, zonder naam, tot de klant schriftelijk toestemt (besluit Jan 14-10-2026). Nog twee founding-plekken.
- Nederlands, u-vorm, voor bestuurders en managers van zorgorganisaties.
- Werk op de branch die `site-inhoudscontrole` noemt; `develop` in de hoofdmap kan ongecommit werk van
  een andere sessie bevatten.
