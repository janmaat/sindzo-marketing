// De twee demo-knoppen van de site: overal dezelfde tekst, overal dezelfde bestemming.
//
// Waarom hier en niet per pagina: de bestemming verschilt per branch, de tekst niet.
//   - develop (live tot uitrolstap 2): /demo-omgeving legt uit en verwijst naar het
//     gespreksformulier /demo; sinds 26-09-2026 zonder openbare inloggegevens (incident 23-09).
//   - feat/proefomgeving-08-aanmelden: zelf rondkijken begint met een eigen toegang op /demo;
//     het gespreksformulier staat op /demo#gesprek.
// Zo klopt elke knop op beide branches, en raakt een merge alleen dit bestand.
//
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
