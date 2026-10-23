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
- Persoonsnamen alleen op /over: Jan Maat, Erwin C.A. van der Star en Janus Hoeks, met de levensloop uit het
  feitenblad (besluit Jan 15-10-2026). Elders "Curanta" of "wij". "Ons team" alleen daar, bij wie het product
  bouwde; nooit een teamgrootte of "implementatieteam". Geen Ponscura op de site;
  nergens een rechtspersoon, ook niet in /privacy en /voorwaarden: overal Curanta met adres en KvK-nummer 09147820 (besluit Jan 23-10-2026). Curanta komt onder een andere B.V.; zodra die is ingeschreven, komt haar naam in /privacy en /voorwaarden.
- De twee demoknoppen staan in `src/config/demo.ts`: tekst overal gelijk, bestemming per branch.
- **Een volwaardig product, geen beginnend bedrijf** (besluit Jan 21-10-2026). Curanta staat naast Nedap Ons
  en de andere grote pakketten. Zet dus niet uit uzelf "Curanta is nieuw", "nieuwe leverancier", "nog geen
  klant in productie", "als eerste", "founding partner" of een early-access-banner op een pagina. Laat de
  breedte zien (het aantal onderdelen uit `src/config/onderdelen.ts`) en wat een koper zelf kan nakijken.
  De stand per onderdeel en per beveiligingsonderwerp blijft op /oplossing, /integraties en /trust.
- Het blijft eerlijk. Geen klantlogo's, citaten, klantaantallen of casussen, en geen "in gebruik bij",
  "bewezen", "marktleider" of iets anders dat klanten suggereert die er niet zijn. Op een directe vraag
  (veelgestelde vragen, /cases onder "Klantverhalen") staat het antwoord: de eerste implementatie loopt
  sinds oktober 2026, bij een organisatie in de basis-ggz, zonder naam tot de klant schriftelijk toestemt
  (besluit Jan 14-10-2026). Het partnerprogramma (maximaal drie, nog twee plekken) heet "partnerprogramma"
  en staat op /cases#partner.
- Nederlands, u-vorm, voor bestuurders en managers van zorgorganisaties.
- Werk op de branch die `site-inhoudscontrole` noemt; `develop` in de hoofdmap kan ongecommit werk van
  een andere sessie bevatten.
