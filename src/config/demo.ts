// De twee demo-knoppen van de site: overal dezelfde tekst, overal dezelfde bestemming.
//
// Waarom hier en niet per pagina: de bestemming verschilt per branch, de tekst niet.
//   - develop (live tot uitrolstap 2): /demo-omgeving legt uit en verwijst naar het
//     gespreksformulier /demo; sinds 26-09-2026 zonder openbare inloggegevens (incident 23-09).
//   - feat/proefomgeving-08-aanmelden: zelf rondkijken begint met een eigen toegang op /demo;
//     het gespreksformulier staat op /demo#gesprek.
// Zo klopt elke knop op beide branches, en raakt een merge alleen dit bestand.
export const DEMO_ZELF = {
  label: 'Vraag toegang tot de demo',
  href: '/demo-omgeving',
};

export const DEMO_GESPREK = {
  label: 'Plan een demo op uw eigen proces',
  href: '/demo',
};
