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
// "Vraag demo-toegang aan" overal, staat waar er één knop is "Vraag een demonstratie aan" (DEMO_EERSTE),
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

/** De knop voor een plek waar er maar één staat: demo-toegang als die aangeboden wordt, anders de demonstratie. */
export const DEMO_EERSTE = DEMO_ZELF_AANGEBODEN ? DEMO_ZELF : DEMO_GESPREK;
