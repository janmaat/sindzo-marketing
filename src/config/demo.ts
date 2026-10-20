// De twee demo-knoppen van de site: overal dezelfde tekst, overal dezelfde bestemming.
//
// Waarom hier en niet per pagina: de bestemming verschilt per branch, de tekst niet.
//   - develop (live tot uitrolstap 2): /demo-omgeving legt uit en verwijst naar het
//     gespreksformulier /demo; sinds 26-09-2026 zonder openbare inloggegevens (incident 23-09).
//   - feat/proefomgeving-08-aanmelden: zelf rondkijken begint met een eigen toegang op /demo;
//     het gespreksformulier staat op /demo#gesprek.
// Zo klopt elke knop op beide branches, en raakt een merge alleen dit bestand.
//
// AAN/UIT (besluit Jan 18-10-2026): demo-toegang bieden wij nog even niet aan. Met false verdwijnt de knop
// "Vraag demo-toegang aan" overal, staat bij de demo de knop "Vraag een demonstratie aan" (DEMO_KNOP),
// beloven de teksten geen zelf rondkijken meer, en is /demo-omgeving een korte pagina met noindex die
// buiten de sitemap blijft. Weer aanbieden: zet dit op true; verder hoeft er niets te veranderen.
export const DEMO_ZELF_AANGEBODEN = false;

// De tekst zegt wat er gebeurt (opdracht 08-10-2026): op beide branches vraagt de bezoeker eerst
// toegang aan en krijgt hij die daarna. "Bekijk de demo" gebruiken we dus niet: die knop geeft
// geen directe toegang. De tweede knop vraagt een demonstratie aan via een formulier.
export const DEMO_ZELF = {
  label: 'Vraag demo-toegang aan',
  href: '/demo-omgeving',
};

export const DEMO_GESPREK = {
  label: 'Vraag een demonstratie aan',
  href: '/demo',
};

/** De demoknop: demo-toegang als die aangeboden wordt, anders de demonstratie. Voor plekken die over de demo gaan. */
export const DEMO_KNOP = DEMO_ZELF_AANGEBODEN ? DEMO_ZELF : DEMO_GESPREK;

// SPEERPUNT (besluit Jan 20-10-2026): de online presentatie is de hoofdroute van site en campagne. Lekker makkelijk,
// alles rustig zelf bekijken wanneer het de bezoeker uitkomt, zonder afspraak. Waar één knop staat (menubalk,
// sectorpagina's, afsluitende oproep) is het deze; de demonstratie (DEMO_GESPREK) is de tweede keuze. Dezelfde tekst
// overal, ook in advertenties en berichten: "Online presentatie aanvragen".
export const PRESENTATIE = {
  label: 'Online presentatie aanvragen',
  href: '/presentatie',
};

/** De knop voor een plek waar er maar één staat. */
export const HOOFDKNOP = PRESENTATIE;
