// Vragen die een koper van zorgsoftware stelt, met het antwoord uit het feitenblad
// (D:\Repos\Ponscura\docs\campagne\feitenblad-curanta.md, stand 17-10-2026). Ze staan zichtbaar op
// de sectorpagina's en als FAQPage voor zoekmachines en AI-assistenten (component Veelgesteld).
// Een antwoord is een claim: verandert een feit, dan eerst het feitenblad, dan hier.
// Het antwoord mag eenvoudige HTML bevatten (een link); de FAQPage krijgt de tekst zonder tags.
import { DEMO_ZELF_AANGEBODEN, DEMO_ZELF, DEMO_GESPREK, PRESENTATIE } from './demo';

export interface Vraag {
  vraag: string;
  antwoord: string;
}

const link = (href: string, tekst: string) =>
  `<a href="${href}" class="text-curanta-700 hover:underline">${tekst}</a>`;

/** Voor elke zorgsector; de sectorpagina zet haar eigen vragen ervoor. */
export const algemeneVragen: Vraag[] = [
  {
    vraag: 'Wat kost Curanta?',
    // Feitenblad: plannen (besluit Jan 25-09), implementatie (besluit Jan 15-10).
    antwoord: `Per actieve medewerker per maand: €19 in Basic, €29 in Compliance Pro en €39 in Totaalzorg Plus. Een zorgmedewerker die alleen het medewerkerportaal gebruikt, kost €19, in elk plan. Het cliëntportaal en het mantelzorgerportaal zijn gratis. De implementatie is maatwerk, met een prijs die wij vooraf afspreken. Alle bedragen staan op de pagina ${link('/prijzen', 'Prijzen')}.`,
  },
  {
    vraag: 'Waar staan onze gegevens?',
    // Feitenblad: hosting, subverwerkers, AI-keuze per organisatie.
    antwoord: `Bij IONOS Cloud in Berlijn, in Duitsland (EU). De AI-functies lopen standaard bij Mistral AI, via het EU-endpoint; Mistral bewaart de gegevens niet en traint er niet mee. Uw organisatie kan de AI-functies ook helemaal uitzetten. De subverwerkers staan in het ${link('/trust', 'Trust Centre')}.`,
  },
  {
    vraag: 'Kunnen wij onze gegevens meenemen als wij stoppen?',
    // Feitenblad: Export, Exit (besluit Jan 25-09; "na afloop" besluit Jan 13-10).
    antwoord: 'Ja. U krijgt een volledige export van uw gegevens en bestanden in JSON, binnen 5 werkdagen. Daarna hebt u 30 dagen om hem op te halen. Na afloop van die 30 dagen wissen wij uw gegevens, met een vernietigingsverklaring.',
  },
  {
    vraag: 'Hoe stappen wij over van ons huidige ECD?',
    // Feitenblad: Migratie, Doorlooptijd.
    antwoord: `Als migratieproject tegen een vaste prijs, na een migratie-inschatting. Een kant-en-klare import per bronsysteem is er nog niet; de route stellen wij per organisatie samen op. Hoe lang het duurt, spreken wij na die inschatting af. Meer op ${link('/overstappen', 'Overstappen en exit')}.`,
  },
  {
    vraag: 'Is Curanta gecertificeerd voor NEN 7510?',
    // Feitenblad: NEN 7510:2024 (audit gepland Q4 2026, bevestigd 13-10), externe pentest.
    antwoord: `Nog niet. De externe audit is gepland in het vierde kwartaal van 2026. Een externe pentest is nog niet gedaan. Wat er wel geregeld is, staat per onderdeel in het ${link('/trust', 'Trust Centre')}.`,
  },
  {
    vraag: 'Werkt er al een zorgorganisatie met Curanta?',
    // Feitenblad: Klanten (besluit Jan 14-10). Geen naam, logo of citaat.
    antwoord: 'De eerste implementatie loopt sinds oktober 2026, bij een organisatie in de basis-ggz. In productie werkt er nog geen zorgorganisatie mee.',
  },
  {
    vraag: 'Kunnen wij Curanta eerst zelf bekijken?',
    // Gelijk aan /demo-omgeving: geen termijn voor de toegang zelf (claimtoets 27-09-2026).
    // Zonder demo-toegang (src/config/demo.ts): de demonstratie, met de reactietermijn uit het feitenblad.
    antwoord: DEMO_ZELF_AANGEBODEN
      ? `Ja. In de demo-omgeving kijkt u rond met verzonnen cliënten, in de backoffice, het medewerkerportaal en het cliëntportaal. ${link(DEMO_ZELF.href, DEMO_ZELF.label)}; wij mailen u zodra uw toegang klaarstaat.`
      : `Ja. In de online presentatie bekijkt u Curanta rustig zelf, wanneer het u uitkomt: korte video's, de dia's en hoe het werkt in de applicatie. ${link(PRESENTATIE.href, PRESENTATIE.label)}; wij bekijken uw aanvraag meestal binnen 1 werkdag. Liever samen? Dan laten wij Curanta zien aan de hand van werkstromen uit uw organisatie: ${link(DEMO_GESPREK.href, DEMO_GESPREK.label)}.`,
  },
];
