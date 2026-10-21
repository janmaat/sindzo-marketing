// Eén statusindeling voor functies en koppelingen, gedeeld door de homepage, /oplossing,
// /integraties en het Trust Centre. Zo heeft hetzelfde onderdeel op elke pagina dezelfde status.
//
// Waarom vier en niet drie: "gebouwd" zei te weinig. Een gebouwde koppeling met Vecozo werkt pas
// met een certificaat van de klant, en een gebouwde lotgenotenfunctie staat uit tot de DPIA van de
// organisatie. Dat is iets anders dan een scherm dat u vandaag in de demo kunt openen.
//
//   demo         — gebouwd en in de demo te bekijken, met verzonnen gegevens
//   inrichten    — gebouwd, maar pas te gebruiken na inrichting of een test bij de klant
//                  (certificaat, contract of toegang bij een externe partij, eindtest, DPIA)
//   ontwikkeling — er wordt aan gebouwd; nog niet te gebruiken
//   gepland      — op de planning, nog niet begonnen
//
// Labels sinds 21-10-2026 (besluit Jan: de site laat een volwaardig product zien, geen beginnend bedrijf):
// "Beschikbaar" in plaats van "Gebouwd, te zien in de demo". Wat gebouwd is, kan een organisatie afnemen; de
// demo is alleen de plek waar u het ziet. De betekenis van de vier statussen is niet veranderd.
//
// Bron per onderdeel: het feitenblad (D:\Repos\Ponscura\docs\campagne\feitenblad-curanta.md).
import { DEMO_ZELF_AANGEBODEN } from './demo';

export type Status = 'demo' | 'inrichten' | 'ontwikkeling' | 'gepland';

export const STATUS: Record<Status, { label: string; dot: string; uitleg: string }> = {
  demo: {
    label: 'Beschikbaar',
    dot: 'bg-accent-600',
    uitleg: DEMO_ZELF_AANGEBODEN
      ? 'Onderdeel van Curanta. U kunt het in de demo-omgeving bekijken, met verzonnen gegevens.'
      : 'Onderdeel van Curanta. U ziet het in de online presentatie of in een demonstratie, met verzonnen gegevens.',
  },
  inrichten: {
    label: 'Beschikbaar, in te richten',
    dot: 'bg-sky-600',
    uitleg:
      'Onderdeel van Curanta, te gebruiken zodra het bij uw organisatie is ingericht. Denk aan een certificaat, contract of toegang bij een externe partij, een eindtest met uw gegevens, of een eigen besluit zoals een DPIA.',
  },
  ontwikkeling: {
    label: 'In ontwikkeling',
    dot: 'bg-amber-500',
    uitleg: 'Wij bouwen eraan. Bij het onderdeel staat wat er al werkt.',
  },
  gepland: {
    label: 'Op de roadmap',
    dot: 'bg-ink-300',
    uitleg: 'Gepland; de bouw is nog niet begonnen.',
  },
};

export const STATUS_VOLGORDE: Status[] = ['demo', 'inrichten', 'ontwikkeling', 'gepland'];
