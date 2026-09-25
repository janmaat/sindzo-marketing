# Curanta.Marketing — curanta.nl

Statische Astro-site (Tailwind, MDX) van Curanta. Build: `npm run build` → `dist/`. Uitrol: zip van
`dist/` uitpakken in `/httpdocs` via Plesk (zie de skill `site-inhoudscontrole` in de Ponscura-repo).

## Feiten

Elk feit op deze site — prijzen, contact, hosting, talen, koppelingen, termijnen, beveiliging, de demo —
komt uit het feitenblad: `D:\Repos\Ponscura\docs\campagne\feitenblad-curanta.md`. Staat iets daar niet,
zeg het dan niet, of voeg het daar eerst toe met bron. Claims toets je met de skill `claimtoets`, de hele
site met `site-inhoudscontrole` (beide in `D:\Repos\Ponscura\.claude\skills\`).

## Grenzen

- De site plaatst geen cookies en laadt geen trackingscripts buiten Plausible (cookieloos).
- Geen klantlogo's, citaten, klantaantallen of casussen: er zijn nog geen klanten in productie.
- Nederlands, u-vorm, voor bestuurders en managers van zorgorganisaties.
- Werk op de branch die `site-inhoudscontrole` noemt; `develop` in de hoofdmap kan ongecommit werk van
  een andere sessie bevatten.
