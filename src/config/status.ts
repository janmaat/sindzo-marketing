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
// Bron per onderdeel: het feitenblad (D:\Repos\Ponscura\docs\campagne\feitenblad-curanta.md).
import { DEMO_ZELF_AANGEBODEN } from './demo';

export type Status = 'demo' | 'inrichten' | 'ontwikkeling' | 'gepland';

export const STATUS: Record<Status, { label: string; dot: string; uitleg: string }> = {
  demo: {
    label: 'Gebouwd, te zien in de demo',
    dot: 'bg-accent-600',
    uitleg: DEMO_ZELF_AANGEBODEN
      ? 'Gebouwd; u kunt het in de demo-omgeving bekijken, met verzonnen gegevens.'
      : 'Gebouwd; wij laten het zien in een demonstratie, met verzonnen gegevens.',
  },
  inrichten: {
    label: 'Gebouwd, in te richten per klant',
    dot: 'bg-sky-600',
    uitleg:
      'Gebouwd, maar pas bruikbaar na inrichting of een test bij uw organisatie. Denk aan een certificaat, contract of toegang bij een externe partij, een eindtest met echte gegevens, of een eigen besluit zoals een DPIA.',
  },
  ontwikkeling: {
    label: 'In ontwikkeling',
    dot: 'bg-amber-500',
    uitleg: 'Wij bouwen eraan. Bij elk onderdeel staat wat er al werkt en wat nog volgt.',
  },
  gepland: {
    label: 'Gepland',
    dot: 'bg-ink-300',
    uitleg: 'Op de planning, nog niet begonnen.',
  },
};

export const STATUS_VOLGORDE: Status[] = ['demo', 'inrichten', 'ontwikkeling', 'gepland'];
