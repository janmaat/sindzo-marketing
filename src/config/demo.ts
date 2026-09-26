// De twee demo-knoppen van de site: overal dezelfde tekst, overal dezelfde bestemming.
//
// Waarom hier en niet per pagina: de bestemming verschilt per branch, de tekst niet.
//   - hotfix/fg-bewering (live tot uitrolstap 2): zelf rondkijken gebeurt op /demo-omgeving
//     (openbare inloggegevens); /demo is het gespreksformulier.
//   - feat/proefomgeving-08-aanmelden: zelf rondkijken begint met een eigen toegang op /demo;
//     het gespreksformulier staat op /demo#gesprek.
// Zo klopt elke knop op beide branches, en raakt een merge alleen dit bestand.
export const DEMO_ZELF = {
  label: 'Kijk zelf rond in de demo',
  href: '/demo-omgeving',
};

export const DEMO_GESPREK = {
  label: 'Plan een demo op uw eigen proces',
  href: '/demo',
};
