// Alle onderdelen van Curanta, gegroepeerd zoals de backoffice. Eén bron voor /oplossing (de modulekaart) en
// de homepage (het overzicht "Alles in één systeem"), zodat het aantal en de groepen op beide gelijk blijven.
// De toelichting bij de statussen staat in ./status.ts; de feiten per onderdeel komen uit het feitenblad.
import type { Status } from './status';
import dossierBeeld from '../assets/schermen/bo-zorgplan.jpg';
import verblijfBeeld from '../assets/schermen/bo-verblijf.jpg';
import bezoekBeeld from '../assets/schermen/mw-bezoek.jpg';
import wzdBeeld from '../assets/schermen/bo-wzd.jpg';
import kraamBeeld from '../assets/schermen/bo-kraamzorg.jpg';
import portaalBeeld from '../assets/schermen/pc-start.jpg';

export interface ModuleEntry {
  title: string;
  body: string;
  features?: string[];
  status: Status;
  noot?: string;
}

export interface ModuleGroup {
  id: string;
  group: string;
  kort: string;
  wie: string;
  beeld?: { src: ImageMetadata; alt: string; adres: string; bijschrift: string };
  modules: ModuleEntry[];
}

export const groups: ModuleGroup[] = [
  {
    id: 'ecd',
    group: 'Cliëntdossier en zorgplan',
    kort: 'Eén dossier van aanmelding tot overdracht: zorgplan, rapportage, metingen, wonden, medicatie en overleg.',
    wie: 'Wijkverpleegkundigen, verzorgenden, begeleiders, behandelaars en de zorgadministratie.',
    beeld: {
      src: dossierBeeld,
      alt: 'Backoffice: het zorgplan van een verzonnen cliënt, met problemen, SMART-doelen en interventies.',
      adres: 'app.curanta.nl',
      bijschrift: 'Het zorgplan: per probleem een SMART-doel en de interventies. Opname oktober 2026.',
    },
    modules: [
      { title: 'Cliëntdossier', status: 'demo', body: 'Per organisatie gescheiden, met archiefbeleid en een logboek van elke inzage en wijziging. Curanta versleutelt het BSN op veldniveau.',
        features: ['Zorgepisodes', 'Anamnese en allergieën', 'Waarschuwingen, woonsituatie en voedingsadvies; lopende waarschuwingen staan bovenaan het dossier', 'CIZ- en Wmo-indicaties', 'Medicatiegebruik uit Medimo of uit de eigen registratie', 'Per cliënt een EVV\'er of persoonlijk begeleider, met een plaatsvervanger'] },
      { title: 'SOEP-rapportage', status: 'demo', body: 'Rapporteren in SOEP-vorm (subjectief, objectief, evaluatie, plan), gekoppeld aan een probleem uit het zorgplan. In de backoffice kan dat ook met spraak, die het apparaat zelf omzet in tekst.',
        features: ['Correcties blijven bewaard', 'Vastpinnen en afschermen', 'Op verzoek een voorstel voor evaluatie en plan (zie AI)'] },
      { title: 'Zorgplan', status: 'demo', body: 'Problemen, doelen, interventies en versies, opgebouwd rond de 42 problemen van het Omaha System. Met scores voor kennis, gedrag en status (KBS). Curanta heeft geen Omaha-keurmerk. De woorden van cliënt en mantelzorger staan naast de professionele formulering. Doelen zijn SMART, met een streefdatum. Risico\'s (val, decubitus, ondervoeding, delier) leidt Curanta met vaste rekenregels af uit metingen en vragenlijsten. De zorgverlener beslist of een risico in het plan komt. Een interventie hoort bij een dagdeel of bij een vast bezoek; de zorgmedewerker ziet bij het bezoek alleen wat daarbij hoort. Staat het eerste zorgplan na zes weken nog niet vast, dan geeft Curanta een signaal.' },
      { title: 'Vragenlijsten', status: 'demo', body: 'Vragenlijsten zoals de PREM (over de ervaring van de cliënt), met schalen en publieke links. Curanta telt de respons vanzelf.' },
      { title: 'Groepszorg en dagbesteding', status: 'demo', body: 'Activiteiten, aanwezigheid, foto\'s en rapportages voor dagbesteding en dagbehandeling.' },
      { title: 'MDO en cliëntlogistiek', status: 'demo', body: 'Multidisciplinair overleg met agendasjablonen en actiepunten; een besluit uit het MDO gaat naar het zorgplan of het OPP. Aanmelding, intake en wachtlijst. In het verpleeghuis legt u bij de opname de afdeling, de kamer en het bed vast. Wie in het team van een afdeling werkt, kan dan vanzelf bij de dossiers van de bewoners van die afdeling.' },
      { title: 'Wondregistratie', status: 'demo', body: 'Wondclassificatie (EPUAP, TIME), metingen, foto\'s en de wondgeschiedenis per cliënt.' },
      { title: 'Anamnese en InterRAI', status: 'demo', body: 'Gestructureerde anamnese per sector, en InterRAI-scores met een indicatieve signalering. Dat zijn niet de gevalideerde interRAI-CAP\'s.' },
      { title: 'Ondersteuningsplan (OPP)', status: 'demo', body: 'Het ondersteuningsplan van de gehandicaptenzorg, met persoonlijke doelen per levensdomein en een methodiek (SRV, PBS, SOVA of vrij). De begeleider rapporteert op de doelen; het verslag begeleiding (AVB) toont per doel hoeveel rapportages er zijn. Wie de methodiek wijzigt, geeft een reden op; die komt in het logboek.' },
      { title: 'Signaleringsplan', status: 'demo', body: 'Bij het OPP: per fase (rust, spanning, crisis) de signalen en de afspraken, en een crisiscontact. Het plan heeft versies. De gedragsdeskundige, persoonlijk begeleider of coördinator stelt het vast. Incidenten sinds de vaststelling staan erbij, met de vraag of het plan herzien moet worden.' },
      { title: 'CIZ-zorgprofiel', status: 'demo', body: 'Bij de intake het CIZ-zorgprofiel van de gehandicaptenzorg (VG, LVG, SGLVG, LG, ZG). Bij de Wlz-toewijzing staat het profiel ernaast, met een waarschuwing als het afwijkt. Het is een waarschuwing: declareren gaat gewoon door.' },
      { title: 'Interventietaken en Vandaag', status: 'demo', body: 'Uitvoertaken die volgen uit de lopende interventies in het zorgplan, zichtbaar bij het bezoek. Op het startscherm Vandaag staan per cliënt de taken van de dag en de taken die te laat zijn. U rondt ze af met een notitie.' },
      { title: 'Medicatie', status: 'demo', body: 'Toedienlijst met dubbele controle. Het medicatieoverzicht komt uit Medimo of uit de eigen registratie (naam en ATC-code, geen G-Standaard); medicatieafspraken alleen via Medimo.' },
      { title: 'Behandeldienst', status: 'demo', body: 'Fysiotherapie, ergotherapie, logopedie en diëtetiek als eigen behandeldienst naast de VVT, de gehandicaptenzorg of een GGZ-instelling: een behandelaarsdossier met behandelplan, evaluatie en eindverslag, metingen en de behandelagenda. Een collega vraagt een behandeling aan; de behandeldienst neemt de aanvraag aan of wijst hem af. Groepsbehandeling kan, met 2 tot 30 deelnemers. Met het overzicht van de behandeluren (CSV, Excel of pdf) verantwoordt u ze, bijvoorbeeld aan het zorgkantoor.',
        features: ['Curanta declareert de behandeling niet: niet bij de zorgverzekeraar en niet als Wlz-behandelprestatie', 'Niet voor de zelfstandige paramedische praktijk, en niet voor oefentherapie of podotherapie', 'De behandelagenda zit in Praktijk, Totaalzorg Plus en Enterprise'] },
      { title: 'Noodoverzicht bij uitval', status: 'demo', body: 'Voor als Curanta niet bereikbaar is: elke dag een pdf voor uw eigen bezoeken of voor een team. Per cliënt de contactgegevens, waarschuwingen, allergieën en wilsverklaringen, en de medicatie van die dag met een vak om af te tekenen. De pdf is versleuteld met een wachtwoord dat u zelf kiest. U maakt hem alleen voor cliënten met wie u een zorgrelatie hebt; elke cliënt komt in het logboek.',
        features: ['Geen BSN, rapportages of metingen in het overzicht', 'In het medewerkerportaal staat daarnaast een kopie op het toestel, zonder medicatie'] },
    ],
  },
  {
    id: 'planning',
    group: 'Planning en medewerkerportaal',
    kort: 'Van dienst tot route, met een roostertoets bij publiceren en een portaal voor de zorgmedewerker onderweg.',
    wie: 'Planners, coördinatoren en zorgmedewerkers.',
    beeld: {
      src: bezoekBeeld,
      alt: 'Medewerkerportaal: de details van een bezoek aan een verzonnen cliënt, met de knop Meld aankomst, een takenlijst uit het zorgplan, medicatieoverzicht en metingen.',
      adres: 'medewerker.curanta.nl',
      bijschrift: 'Medewerkerportaal: een bezoek met de taken uit het zorgplan. Opname oktober 2026.',
    },
    modules: [
      { title: 'Diensten en bezoeken', status: 'demo', body: 'Diensten, pauzes, ruilverzoeken en compensatiesaldi, op een planbord per week. Slaap- en bereikbaarheidsdiensten plant u als eigen soort dienst, ook volgens de cao Jeugdzorg. Per team en dagdeel stelt u een minimale bezetting in; zakt het rooster daaronder, dan ziet u dat meteen.' },
      { title: 'Roostertoets', status: 'demo', body: 'Bij publiceren toetst Curanta aan de Arbeidstijdenwet: rust tussen diensten, maximaal 12 uur per dienst en 60 uur per week, en pauzes. Daarnaast toetst hij aan de grenzen van de cao die u kiest. Bij elke toets staat het artikel. Curanta publiceert geen harde overtreding.',
        features: ['Nog niet: weekrust, gemiddelden over 4 of 16 weken, rust na nachtdiensten', 'Zonder gekozen cao alleen de wettelijke grenzen'] },
      { title: 'Routeplanning', status: 'demo', body: 'Wijkroutes met reistijd, en een vaste zorgverlener per cliënt voor de continuïteit. Per bezoek legt u vast hoeveel speling er rond de afgesproken tijd is; de route en de planhulp houden daar rekening mee.' },
      { title: 'Zelfroosteren', status: 'demo', body: 'Medewerkers kiezen diensten binnen de kaders die u stelt; de planner keurt goed.' },
      { title: 'Tijdregistratie', status: 'demo', body: 'Uren verantwoorden in de backoffice en in het medewerkerportaal, ook zonder bereik.' },
      { title: 'Medewerkerportaal', status: 'demo', body: 'Voor de zorgmedewerker op de telefoon, in de browser: rooster, bezoeken met taken en SOEP-rapportage, zorgplan en overdracht, uren, verlof, beschikbaarheid, open diensten, ruilen, kilometers en ziek melden. Een open dienst krijgt de medewerker direct, na een controle op overlap en cao; een ruil keurt de planner goed. Wijzigt of vervalt een dienst die al gepubliceerd is, of gaat hij naar een collega, dan krijgt de medewerker een melding.',
        features: ['Zonder bereik: rooster van 7 dagen en bezoeken van vandaag en morgen inzien, aankomst en vertrek melden, taken afvinken, ritten vastleggen', 'Onverzonden werk blijft versleuteld op het toestel tot dezelfde medewerker weer inlogt', 'Lopende waarschuwingen per cliënt, zoals MRSA of valrisico, staan ook zonder bereik op het toestel', 'Medicatie aftekenen vraagt verbinding', 'In de gehandicaptenzorg ook de Wzd vastleggen en de aanwezigheid bij de dagbesteding aftekenen; in de kraamzorg het kraambezoek'] },
      { title: 'Planhulp', status: 'demo', body: 'Planvoorstellen per periode op continuïteit, werkdruk en reistijd, met een rekenmodel, geen taalmodel. De planner neemt elk voorstel over of wijst het af.' },
      { title: 'Formatieplanning', status: 'demo', body: 'Bezetting per fte, team en afdeling, los van het rooster, voor budget en HR.' },
      { title: 'Salarisexport', status: 'demo', body: 'Per maand of vier weken: goedgekeurde gewerkte uren, toeslaguren volgens de cao die u kiest (VVT, gehandicaptenzorg of GGZ), verlof en verzuim, in één CSV-bestand zonder BSN.' },
    ],
  },
  {
    id: 'declaratie',
    group: 'Declaratie, financiering en verblijf',
    kort: 'Wmo, Jeugdwet, Wlz en de Zvw voor de wijkverpleging in één systeem, van productie tot declaratie, met verblijf, logeren en het volledig pakket thuis. De declaratiebestanden levert u zelf aan.',
    wie: 'De zorgadministratie, declaratiemedewerkers en controllers.',
    beeld: {
      src: verblijfBeeld,
      alt: 'Backoffice: het verblijfsoverzicht met een cliënt in een woonvorm en zijn zorgzwaartepakket, een logeerperiode met het aantal nachten van de 156, en de knop om de maandproductie te maken.',
      adres: 'app.curanta.nl',
      bijschrift: 'Verblijf, logeren en de maandproductie voor de Wlz. Opname oktober 2026.',
    },
    modules: [
      { title: 'iWmo en iJw', status: 'demo', noot: 'met de hand of rechtstreeks via VECOZO', body: 'Productcodes per gemeente, toewijzingen en de berichten bij start en stop van de zorg, volgens iStandaard 3.2 en getoetst aan het officiële schema. Curanta stelt de maanddeclaratie (Wmo323, Jw323) op uit goedgekeurde productie. Een retourbericht leest u in; Curanta zet de afkeuringen per oorzaak bij elkaar. Rechtstreeks aanleveren via VECOZO is ingericht; wij beproeven het per organisatie in de testomgeving van VECOZO, vóór uw eerste declaratiemaand.' },
      { title: 'iWlz en eigen bijdrage', status: 'demo', noot: 'aanleveren bij het zorgkantoor, route per zorgkantoor af te stemmen', body: 'Berichten aan het zorgkantoor over het begin en het einde van de Wlz-zorg, volgens iStandaard 2.4.3 en getoetst aan het officiële schema. Daaruit stelt het CAK de eigen bijdrage vast; u levert zelf niets aan het CAK. Retourberichten leest u zelf in.' },
      { title: 'Productie en budget', status: 'demo', body: 'Productie per cliënt, met de bron van elke regel; financieringsmix, budgetreserveringen en signalen.' },
      { title: 'Facturatie en pgb', status: 'demo', body: 'Facturen, betalingen, sjablonen en pgb-afrekeningen.' },
      { title: 'Cliëntkas en bewindvoering', status: 'demo', body: 'Zakgeld en kas per cliënt, uitgaven vastleggen en een overzicht voor de bewindvoerder.' },
      { title: 'Wlz in de gehandicaptenzorg', status: 'demo', noot: 'aanleveren bij het zorgkantoor, route per zorgkantoor af te stemmen', body: 'Productie per uur of dagdeel bij een modulair pakket thuis, automatisch gekoppeld aan de juiste Wlz-toewijzing. Een afgeronde dagbestedingsactiviteit wordt per aanwezige cliënt een conceptregel. Toeslagen en meerzorg legt u vast met het kenmerk van het zorgkantoor, en het vervoer naar de dagbesteding per aanwezigheidsdag. Regels die niet kunnen, staan er met de reden bij.',
        features: ['Nog niet: meerzorg bij ggz-wonen en ggz-b, en toeslagen voor dagbesteding van een kind per dagdeel'] },
      { title: 'Verblijf met een zzp', status: 'demo', body: 'Opname, ontslag en afwezigheid in een woonvorm volgens de regels van de NZa. Met één knop maakt u de maandproductie per etmaal. Een catalogus met de zorgzwaartepakketten (zzp\'s) voor vg, vv, lvg, sglvg, lg en zg (NZa 2026). Deeltijdverblijf met een vast patroon van twee weken, en mutatiedagen.',
        features: ['Nog niet: deeltijdverblijf in de vv, een mutatiedag na een kamerwissel'] },
      { title: 'Logeren', status: 'demo', body: 'Logeerperiodes met de dagen volgens de NZa-definitie en de grens van 156 nachten per jaar, met een signaal in de werkvoorraad.' },
      { title: 'Volledig pakket thuis (vpt)', status: 'demo', noot: 'geen voorbeeld in de demo', body: 'Het vpt als leveringsvorm, met de prestaties van de NZa. Volle logeerdagen tellen vanzelf als afwezigheid.' },
      { title: 'Omzetplafonds', status: 'demo', noot: 'zelf in te richten in de demo', body: 'Een plafond per groep zorgverzekeraars, zorgsoort en jaar, met een prognose tot het jaareinde. Bij 80, 90 en 100 procent volgt een signaal. De aanmeldstop is een registratie; hij houdt een aanmelding niet tegen.' },
      { title: 'Zorginkoop en contracten', status: 'demo', body: 'Contracten met gemeenten onder Wmo en Jeugdwet: looptijden, productafspraken en tarieven.' },
      { title: 'AGB-codes', status: 'inrichten', body: 'AGB-codes valideren en dagelijks synchroniseren met de open dataset van Vektis; de synchronisatie richten wij per klant in.' },
      { title: 'Controle op verzekering (COV)', status: 'inrichten', body: 'Curanta legt per cliënt vast bij welke verzekeraar hij verzekerd is, en waar dat vandaan komt. U neemt het over van de zorgpas of uit de COV-controle in het VECOZO-portaal. De automatische vraag aan VECOZO ronden wij af bij uw aansluiting.' },
      { title: 'Zvw-declaratie wijkverpleging', status: 'inrichten', body: 'Productcodes, tarieven en prestaties zijn er. Curanta maakt per zorgverzekeraar en maand het declaratiebericht (AW319), getoetst aan de recordlayout en de testset van Vektis. U levert het aan in het VECOZO-portaal en leest het antwoord (AW320) in. Rechtstreeks aanleveren via VECOZO is ingericht; wij beproeven het per organisatie in de testomgeving van VECOZO, vóór uw eerste declaratiemaand.' },
    ],
  },
  {
    id: 'kraam-jeugd',
    group: 'Kraamzorg en jeugdzorg',
    kort: 'Een eigen dossier voor de kraamzorg en voor de jeugdzorg, met de kraambezoeken in de planning. De Zvw-declaratie voor de kraamzorg is er nog niet.',
    wie: 'Kraamverzorgenden en leidinggevenden in de kraamzorg; jeugdhulpverleners en de aandachtsfunctionaris.',
    beeld: {
      src: kraamBeeld,
      alt: 'Backoffice: het kraamdossier van een verzonnen cliënt, met indicatie-uren, de overdracht aan de JGZ en grafieken van de temperatuur van moeder en kind en het gewicht van het kind.',
      adres: 'app.curanta.nl',
      bijschrift: 'Het kraamdossier met de controles van de kraamweek. Opname oktober 2026.',
    },
    modules: [
      { title: 'Kraamdossier', status: 'demo', body: 'Controles van moeder en kind per controlemoment, grafieken van temperatuur en gewicht, geboortegegevens en bezoeken die aftellen van de indicatie-uren. De indicatie legt u per onderdeel vast, met herindicatie; bij een meerling staat elk kind apart. Bij het afsluiten legt u de toestemming voor de overdracht aan de jeugdgezondheidszorg (JGZ) vast, en hoe die gaat. Curanta verstuurt die overdracht niet.', features: ['Nog niet: de Zvw-declaratie (KZ301), de indicatie uitrekenen volgens het Landelijk Indicatieprotocol'] },
      { title: 'Kraambezoeken en eigen bijdrage', status: 'demo', body: 'Kraambezoeken plant u op het planbord, en een collega kan een dossier waarnemen. De kraamverzorgende ziet het bezoek in het medewerkerportaal en legt daar de uren per onderdeel en de controles vast. De eigen bijdrage stelt u per verzekeraar in. Int uw organisatie hem, dan maakt Curanta na het afsluiten van het dossier de factuur via de facturatie; een correctie gaat met een creditnota.',
        features: ['Nog niet: een bezoek dat in het medewerkerportaal is afgerond, komt niet vanzelf in het kraamdossier'] },
      { title: 'Jeugddossier', status: 'demo', body: 'Hulpvragen met behandelstappen, een hulpverleningsplan met doelen, evaluatie en instemming, vertegenwoordigers en risico\'s. Alle toewijzingen onder de Jeugdwet staan in één register, met het verbruik; de ingelezen toewijzing van de gemeente is leidend. Het dossier opent alleen voor wie een zorgrelatie heeft, waarneemt met een reden of coördinator is. Curanta geeft een signaal als de jeugdige 18 of 23 wordt. Per traject declareert u per stuk of per bedrag; de declaratie (Jw323) stelt u op bij de iJw-berichten.',
        features: ['Een VIR-signaal legt u met de hand vast; een aansluiting op de Verwijsindex is er nog niet'] },
    ],
  },
  {
    id: 'ggz',
    group: 'GGZ: behandeling en declaratie',
    kort: 'Trajecten en prestaties volgens het zorgprestatiemodel, en declareren volgens de standaard van Vektis. De zorginhoud zien alleen de behandelaars van de cliënt.',
    wie: 'Behandelaars, regiebehandelaars en de administratie van GGZ-praktijken en -instellingen.',
    modules: [
      { title: 'Zorgprestatiemodel', status: 'demo', body: 'Zorgprestaties per traject, met controle op tarief, duur en datum. Opende u per vergissing een traject of legde u een prestatie vast? Dan verwijdert u die met een reden. Dat kan zolang er niets bij een verzekeraar ligt.' },
      { title: 'Declareren bij de zorgverzekeraar (GDS801)', status: 'inrichten', body: 'Het declaratiebericht volgens de standaard van Vektis. Curanta toetst het aan het officiële schema; u downloadt het en levert het aan in het VECOZO-portaal. Een retourbericht (GDS802) leest u in. Een afgewezen prestatie declareert u opnieuw; een toegekende crediteert u en declareert u gecorrigeerd. Tussentijds declareren kan, en per zorgdatum gaat een prestatie naar de verzekeraar van dat moment.', features: ['Rechtstreeks aanleveren via VECOZO is ingericht; wij beproeven het per organisatie in de testomgeving van VECOZO, vóór uw eerste declaratiemaand.'] },
      { title: 'Afscherming per cliënt', status: 'demo', body: 'De GGZ-zorginhoud ziet alleen wie een behandelrelatie met de cliënt heeft. Die relatie volgt uit het rooster, de agenda of het regiebehandelaarschap. Noodtoegang kan, met een reden in het toegangslogboek. De administratie ziet alleen wat zij voor de declaratie nodig heeft.' },
      { title: 'Regiebehandelaar', status: 'demo', body: 'Curanta toetst de regiebehandelaar per traject aan het Landelijk Kwaliteitsstatuut GGZ. Een geschorste BIG-registratie blokkeert.' },
      { title: 'ROM-uitdraai', status: 'demo', body: 'Een uitdraai per periode van de ROM-metingen: de vaste metingen van het behandelresultaat. Zonder vrije tekst, en zonder trajecten waarvoor de cliënt geen toestemming gaf. Elke uitdraai komt in het toegangslogboek. Het is geen bestand in het formaat van Akwa GGZ: u levert zelf aan via het portaal van Akwa; een rechtstreekse aanlevering is er niet.' },
      { title: 'SQ-48 en 4DKL', status: 'ontwikkeling', body: 'Scoring en licentiebeheer zijn er. De vragenlijsten zelf komen pas in het product na schriftelijke toestemming van de rechthebbenden. Voor de 4DKL is ook een licentie per organisatie nodig.' },
      { title: 'Behandeling in de GGZ-instelling', status: 'demo', body: 'Per cliënt een pagina Behandeling met de typering, het behandelplan, het crisisplan en de kosteninformatie. De behandelagenda is de standaard voor de instelling; een bezoek van een FACT-team wordt een voorstel voor een prestatie. De verblijfsdagen volgen uit de opname. Verder het kwaliteitsstatuut, de wachttijden met een CSV-export en de PHQ-9.',
        features: ['Nog niet: een DSM-5-lijst, de HoNOS+ en het typeringsalgoritme (die vragen een licentie), de GAD-7, de wachttijden aanleveren aan een portaal'] },
      { title: 'Nota aan de cliënt zonder contract', status: 'demo', body: 'Voor zorg zonder contract met de verzekeraar: een nota met de gegevens die de NZa voorschrijft, per e-mail als pdf. Een consult staat op één nota of in één declaratie, nooit allebei.' },
    ],
  },
  {
    id: 'financien',
    group: 'Facturatie, betalingen en boekhouding',
    kort: 'Van factuur tot betaling: betalingen uit het bankafschrift herkennen, herinneringen versturen en de boekingen als bestand naar uw boekhoudpakket.',
    wie: 'De financiële administratie en control.',
    modules: [
      { title: 'Facturatie en pgb', status: 'demo', body: 'Facturen, betalingen, sjablonen en pgb-afrekeningen. Curanta verrekent een gedeeltelijke creditfactuur zodra het restant betaald is. Een creditfactuur die te lang in concept staat, wordt een signaal.' },
      { title: 'Bankafschriften en betalingen', status: 'demo', noot: 'met uw eigen bankbestand', body: 'U leest het bankafschrift in (CAMT.053). Curanta stelt voor welke betaling bij welke factuur of declaratie hoort. Noemt de betaling een factuurnummer en is het bedrag precies het openstaande bedrag, dan boekt hij meteen. De rest bevestigt u. Verzamelbetalingen verdeelt u zelf.', features: ['Geen rechtstreekse bankkoppeling', 'Geen MT940'] },
      { title: 'Boekhoudexport', status: 'demo', body: 'Verkoopboekingen en toegekende declaraties als bestand voor Twinfield, SnelStart, AFAS, Exact (journaalposten) of Yuki. Ook kosten met kostenplaatsen, kasmutaties en afschrijvingen. U leest het bestand zelf in uw pakket in.', features: ['Een bestand, geen koppeling', 'Het Yuki-bestand is getoetst aan het schema van Yuki, nog niet in een echte Yuki-administratie ingelezen'] },
      { title: 'Betalingen van cliënten', status: 'demo', body: 'Betaalwijze per betaling en afrekenen aan de balie. Herinneringen kunnen per e-mail. Een aanmaning met veertien dagen gaat alleen naar particulieren, en nooit automatisch. Een geschil zet de herinneringen op pauze.', features: ['De briefteksten zijn nog concept en worden juridisch getoetst'] },
      { title: 'Betaallink via Mollie', status: 'inrichten', noot: 'nog niet te gebruiken', body: 'Een betaallink op de factuur. De cliënt betaalt daarmee op het eigen Mollie-account van uw organisatie; het geld komt nooit bij Curanta. Vraagt een Mollie-account van uw organisatie. Nog niet te gebruiken: de aanmelding van Curanta bij Mollie is nog niet rond.' },
      { title: 'Overdracht aan een incassobureau', status: 'demo', body: 'Een bestand (CSV) met de openstaande vorderingen voor een incassobureau naar keuze. Geen koppeling met een bureau.' },
    ],
  },
  {
    id: 'kwaliteit',
    group: 'Kwaliteit en wet- en regelgeving',
    kort: 'Incidenten, klachten en indicatoren, en de registraties die wetten vragen, met de termijnen erbij.',
    wie: 'Kwaliteitsfunctionarissen, de privacyfunctionaris, de vertrouwenspersoon en het bestuur.',
    beeld: {
      src: wzdBeeld,
      alt: 'Backoffice: de Wzd- en Wvggz-maatregelen, met een melding over naderende termijnen, de juridische titels van het verblijf met hun geldigheid en de knoppen voor verlof en ontslag.',
      adres: 'app.curanta.nl',
      bijschrift: 'Wzd en Wvggz: maatregelen, termijnen en de juridische titel van het verblijf. Opname oktober 2026.',
    },
    modules: [
      { title: 'Incidenten en calamiteiten (VIM)', status: 'demo', body: 'De Wkkgz vraagt een interne procedure om incidenten te melden. Hier legt u incidenten, calamiteiten en datalekken vast, met analyse en leervoorstellen.' },
      { title: 'Klachten (Wkkgz)', status: 'demo', body: 'De klachtenroute, geschilbehandeling en een tijdlijn per klacht. De antwoordbrief noemt de geschilleninstantie die uw organisatie heeft ingesteld.' },
      { title: 'Meldcode', status: 'demo', body: 'De vijf stappen van de meldcode huiselijk geweld en kindermishandeling, bij elke cliënt en in elk vakgebied, met de kindcheck bij een volwassen cliënt. Een afgeronde stap ligt vast, en de meldcode heeft een eigen logboek. In de jeugdzorg ziet de aandachtsfunctionaris alleen de meldcode, de verwijsindex en het logboek. Melden bij Veilig Thuis doet u zelf.', features: ['Een aansluiting op de Verwijsindex is er nog niet'] },
      { title: 'Indicatoren', status: 'demo', body: 'Indicatordefinities met versies, aanleveringen en momentopnamen.' },
      { title: 'Wtza', status: 'demo', body: 'Uw toelating vastleggen en de jaarverantwoording bewaken, met herinneringen. Die verantwoording moet vóór 1 juni in DigiMV staan; de aanlevering zelf doet u in DigiMV.' },
      { title: 'Wtta', status: 'demo', body: 'Uw eigen toelating als uitlener vastleggen. Leent u in, dan legt u per uitlener de controle van zijn toelating vast, met datum, uitkomst en bewijs. Bij elke nieuwe inleenovereenkomst krijgt HR een controletaak. Curanta waarschuwt, maar blokkeert niet. Er is geen koppeling met het register van de NAU.' },
      { title: 'Inzet van zzp\'ers', status: 'demo', body: 'Toets op het uurtarief (rechtsvermoeden van een arbeidsovereenkomst) en op gezag.' },
      { title: 'NEN 7510-zelfbeoordeling', status: 'demo', body: 'Een beoordeling per beheersmaatregel, met bewijs en een auditexport. Dit helpt bij uw eigen NEN 7510-traject; het is geen certificaat.' },
      { title: 'Wet zorg en dwang (Wzd)', status: 'demo', body: 'Volgens de wettekst van 1 juli 2025: de vormen van onvrijwillige zorg, het stappenplan met de termijnen en een zorgverantwoordelijke per cliënt. Bij de juridische titel van het verblijf staat wanneer u een vervolg moet aanvragen. Beslissingen over verlof en ontslag staan erbij, met hun termijnen. Curanta toetst het halfjaarlijkse overzicht voor de IGJ aan het XML-schema van de IGJ. U levert het zelf aan via Mijn IGJ.', features: ['Een echte aanlevering bij de IGJ is er nog niet', 'Het afschrift van een beslissing stelt u zelf op; Curanta legt de datum vast'] },
      { title: 'Wet verplichte ggz (Wvggz)', status: 'demo', body: 'Voor de GGZ-instelling: de zorgkaart, het zorgplan en de beslissing tot verplichte zorg, met de vormen uit de wet en de titel (crisismaatregel, zorgmachtiging). De geneesheer-directeur heeft een eigen werkvoorraad, beslist over onderbreking en beëindiging en wijst de zorgverantwoordelijke aan. Het overzicht voor de IGJ toetst Curanta aan het XML-schema; u levert het zelf aan. Klachten gaan naar de klachtencommissie Wvggz, met de termijnen.',
        features: ['Nog niet: een signaal als een Wvggz-titel afloopt (voor de Wzd wel)', 'Nog niet: de procedure bij de rechter'] },
      { title: 'DPIA en verwerkingsregister', status: 'demo', body: 'Een register volgens artikel 30 AVG, een DPIA-beoordeling per verwerking en een overzicht van subverwerkers.' },
      { title: 'NEN 7513-logboek', status: 'demo', body: 'Een logboek van elke toegang tot cliëntgegevens, met een hash-keten die een wijziging achteraf aantoonbaar maakt. Elke regel zegt wat er gebeurde: ingezien, vastgelegd, gewijzigd of verwijderd. Curanta bewaart een logregel over een cliënt zolang het dossier bestaat, en logregels zonder dossier 7 jaar.' },
      { title: 'Auditlogs naar uw SIEM', status: 'inrichten', body: 'Elke minuut het beveiligingslogboek en de beheeraudit naar het SIEM van uw organisatie: via een webhook, Splunk, Azure Monitor of syslog, altijd versleuteld. Het NEN 7513-logboek alleen als u dat aanzet, en dan zonder naam, BSN, cliëntnummer of vrije tekst. Getest met Splunk, Azure Monitor en een syslog-server; u richt de koppeling in met de gegevens van uw SIEM.' },
      { title: 'Cyberincidenten (NIS2)', status: 'demo', body: 'Cyberincidenten registreren en classificeren, met de meldtermijnen van de Cyberbeveiligingswet: 24 uur, 72 uur en één maand. Curanta meldt niet zelf bij het CSIRT; dat doet uw organisatie.' },
      { title: 'De Cbw voor het bestuur', status: 'demo', body: 'De tien maatregelen van de zorgplicht staan op één plek, met stand, bewijs en eigenaar. Het bestuur stelt ze vast; die vaststelling ligt daarna vast, met opdrachten met een eigenaar en een datum. Een leveranciersregister met beoordelingen, waarin Curanta zelf al staat. De rapportage voor de bestuursvergadering is een pdf, zonder score. Curanta helpt het bestuur de Cbw-cyclus bij te houden; voldoen aan de wet doet uw organisatie zelf.' },
      { title: 'AI-register', status: 'demo', body: 'AI-systemen classificeren en hun risico\'s documenteren volgens de AI-verordening.' },
      { title: 'Klokkenluidersregeling', status: 'demo', body: 'Voor organisaties met 50 of meer werknemers: een vertrouwelijk meldkanaal, behandeltermijnen en bescherming van de melder, gescheiden van de incidentmeldingen.' },
      { title: 'Cliëntenraad (Wmcz 2018)', status: 'demo', body: 'Adviesaanvragen, instemmingsprocedures, jaarverslag en ledenadministratie. Een cliëntenraad is verplicht als in de regel meer dan tien personen zorg verlenen.' },
      { title: 'CO₂-rapportage woon-werkverkeer (WPM)', status: 'demo', body: 'Woon-werkafstand, vervoerwijze en thuiswerken per medewerker, met een schatting van de uitstoot. Met een CSV-overzicht bereidt u de rapportage aan de RVO voor; het is geen RVO-formaat. Verplicht vanaf 100 werknemers.' },
    ],
  },
  {
    id: 'portalen',
    group: 'Cliëntportaal en communicatie',
    kort: 'Wat de cliënt en de mantelzorger zelf kunnen zien en doen, en hoe het zorgteam met hen en met elkaar communiceert.',
    wie: 'Cliënten, mantelzorgers, wettelijk vertegenwoordigers en het zorgteam.',
    beeld: {
      src: portaalBeeld,
      alt: 'Cliëntportaal: de startpagina voor een mantelzorger, met komende afspraken, berichten en knoppen voor een bericht aan het zorgteam of een afspraak aanvragen.',
      adres: 'klant.curanta.nl',
      bijschrift: 'Cliëntportaal: de startpagina van een mantelzorger. Opname oktober 2026.',
    },
    modules: [
      { title: 'Cliëntportaal', status: 'demo', body: 'Een cliënt of mantelzorger leest het zorgplan, ziet de afspraken, stuurt het zorgteam een bericht en vindt de documenten die de zorgverlener deelt. Wat een mantelzorger mag zien, legt de organisatie per persoon vast in een machtiging. Bij minderjarigen volgt Curanta de leeftijdsgrenzen van 12, 16 en 18 jaar; op de achttiende verjaardag staat de toegang van een ander stil tot de cliënt of de organisatie hem bevestigt. Gratis, in elk plan.' },
      { title: 'Uw huisstijl in het cliëntportaal', status: 'demo', noot: 'zelf in te stellen in de demo', body: 'Uw logo, kleuren en inlogachtergrond in het cliëntportaal, en de naam van uw organisatie als afzender van de portaalmails.' },
      { title: 'Uw eigen domein voor het cliëntportaal', status: 'inrichten', body: 'Het cliëntportaal op een adres van uw organisatie, bijvoorbeeld mijn.uworganisatie.nl, in plaats van klant.curanta.nl. U zet twee DNS-records; Curanta controleert ze en plaatst het certificaat. De mails linken dan naar uw eigen adres.' },
      { title: 'Portaal in vijf talen', status: 'demo', body: 'De menu\'s en vaste teksten van het cliëntportaal zijn er in het Nederlands, Engels, Turks, Arabisch en Duits. De gebruiker kiest zelf. Pools en Oekraïens zijn vertaald maar staan nog uit. De backoffice is alleen Nederlands.', features: ['Achtergrond: zie het kennisbankartikel over het meertalige cliëntportaal'] },
      { title: 'Zorgplan in gewone taal', status: 'demo', body: 'De zorgverlener schrijft een samenvatting van het zorgplan voor de cliënt, eventueel met een voorstel van een taalmodel. Daarna maakt de zorgverlener die zelf zichtbaar in het portaal.' },
      { title: 'Afspraakherinneringen per e-mail', status: 'inrichten', noot: 'staat standaard uit', body: 'Een herinnering vóór een bezoek, en een bericht als een bezoek verschuift of niet doorgaat. Uw organisatie zet het aan; daarna kiest de cliënt of naaste zelf. De e-mail noemt alleen dag en tijd. Geen sms.' },
      { title: 'Inloggen met DigiD', status: 'inrichten', body: 'Voor cliënten en mantelzorgers, minimaal niveau Substantieel. Een betaalde optie; de aansluiting bij Logius regelen wij per klant.' },
      { title: 'Berichten', status: 'demo', body: 'Berichten tussen collega\'s, per team of organisatie, met spraakberichten en bijlagen.' },
    ],
  },
  {
    id: 'hrm',
    group: 'Medewerkers en HRM',
    kort: 'Bevoegdheden, scholing en verzuim, en steun tussen collega\'s die gescheiden blijft van HR.',
    wie: 'HR, teamleiders en de medewerkers zelf.',
    modules: [
      { title: 'HRM', status: 'demo', body: 'Bevoegdheden (zoals BIG, SKJ en het Kwaliteitsregister Kraamzorg), contracten, gesprekken, verzuim en termijnen.' },
      { title: 'Opleiding en competenties', status: 'demo', body: 'BIG-herregistratie, bijscholing, e-learning en een competentiematrix per functie, met de termijnen op een rij.' },
      { title: 'Onboarding en teamsignalen', status: 'demo', body: 'Inwerken en uitdiensttreding, 360°-feedback, en per team signalen over uitstroom en verzuim, voor managers en HR. Niet bedoeld om individuele medewerkers te volgen.' },
      { title: 'Vrijwilligers', status: 'demo', body: 'Vrijwilligers registreren, hun VOG bewaken en ze inzetten bij activiteiten.' },
      { title: 'Digitaal ondertekenen', status: 'inrichten', body: 'HR-documenten in het personeelsdossier laten ondertekenen via DocuSign (VS). Vraagt een DocuSign-account van uw organisatie.' },
      { title: 'Collega-netwerk', status: 'demo', body: 'Een zorgmedewerker meldt zich zelf aan voor een buddy bij de start, een intervisie- of sparringpartner, of een buddy die dezelfde taal spreekt. Curanta stelt een collega voor op thema, taal en beschikbaarheid. HR en leidinggevenden zien niet wie met wie praat, en het netwerk zit in geen enkele export.' },
      { title: 'Lotgenoten', status: 'inrichten', noot: 'aan na uw DPIA', body: 'Aanmelden op een thema zoals werkdruk, rouw na een incident of re-integratie, met een besloten gesprek tussen twee collega\'s. De ander ziet eerst alleen een roepnaam en het thema. Een crisissignaal gaat naar de vertrouwenspersoon, nooit naar HR. Staat uit tot uw organisatie een DPIA heeft afgerond.' },
    ],
  },
  {
    id: 'koppelingen',
    group: 'Koppelingen en ketenzorg',
    kort: 'De koppelingen zijn gebouwd; de aansluiting (certificaat, contract met de berichtenpartij) regelen wij per klant. In de demo staan ze uit.',
    wie: 'Functioneel beheer, I&A en de zorgadministratie.',
    modules: [
      { title: 'ZorgMail', status: 'inrichten', body: 'Beveiligde berichten en bijlagen via het ZorgMail-netwerk. Vraagt een ZorgMail-abonnement van uw organisatie.' },
      { title: 'ZorgDomein', status: 'inrichten', body: 'Inkomende verwijzingen met bijlagen. In een praktijk met een behandelagenda zet u een geaccepteerde verwijzing meteen op de wachtlijst. Antwoorden vanuit Curanta kan nog niet.' },
      { title: 'Medimo', status: 'inrichten', body: 'Medicatieoverzicht, voorschriften en toediening uitwisselen met Medimo.' },
      { title: 'Publieke FHIR-API voor de BgZ', status: 'inrichten', body: 'Een API (FHIR R4), alleen om te lezen. Hij levert de Basisgegevensset Zorg (BgZ) van een cliënt als document, getoetst aan de profielen van Nictiz. Beschikbaar voor vooraf geregistreerde systemen; er is geen testomgeving en geen algemene lees- of schrijftoegang.' },
      { title: 'eOverdracht', status: 'inrichten', body: 'Curanta maakt het overdrachtsdocument volgens eOverdracht 4.0, met alle 14 onderdelen van de Minimale eOverdracht, voor zover ze in het dossier staan, en biedt het aan via het eOverdracht-netwerk: de ontvangende organisatie haalt het op en meldt terug of zij de overdracht accepteert. Een binnengekomen overdracht beoordeelt een zorgverlener voordat er iets in het dossier komt. De aansluiting op het netwerk regelen wij bij de implementatie, met het UZI-servercertificaat van uw organisatie; de ketentest met uw ketenpartner hoort daarbij. Getest tussen twee omgevingen, niet door Nictiz gekwalificeerd. Downloaden en zelf meesturen kan ook.' },
      { title: 'MedMij en LSP', status: 'ontwikkeling', body: 'Uitwisseling met persoonlijke gezondheidsomgevingen via MedMij en met het Landelijk Schakelpunt. Registratie, certificaten en aansluittrajecten zijn er nog niet.' },
      { title: 'Ysis (Gerimedica)', status: 'ontwikkeling', body: 'Uitwisseling van het dossier met Ysis. Geen import: overstappen uit Ysis is een migratieproject.' },
      { title: 'Nmbrs', status: 'inrichten', body: 'De goedgekeurde salarisexport rechtstreeks naar Nmbrs. Vraagt een Nmbrs-partnerapp, een sleutel en toestemming van uw organisatie; de test met Nmbrs doen wij bij de implementatie, met uw organisatie.' },
      { title: 'Domotica', status: 'inrichten', body: 'Alarmen en sensormeldingen van onder meer Mextal, Ascom, Sensara, CLB en CarePhone in een eigen overzicht. De dienstdoende zorg krijgt een melding. Aansluiting per leverancier.' },
      { title: 'UZI-pas', status: 'inrichten', body: 'Inloggen met de UZI-pas, de identiteitspas van zorgverleners. Curanta leest de pas uit en controleert de certificaatketen en de intrekking. Beschikbaar zodra wij de UZI-hostnaam op onze server hebben ingericht; dat is nog niet gebeurd. De eindtest met een echte pas doen wij bij de implementatie, met uw organisatie.' },
      { title: 'E-health', status: 'gepland', body: 'Koppelingen met aanbieders van e-health, voor blended zorg: persoonlijk contact en online zorg samen. Vraagt een overeenkomst per aanbieder; die zijn er nog niet.' },
    ],
  },
  {
    id: 'ai',
    group: 'AI en prognoses',
    kort: 'Taalmodellen alleen waar ze een voorstel doen dat de zorgverlener naleest. Prognoses zijn statistiek, geen AI.',
    wie: 'Zorgverleners, planners, P&O en management.',
    modules: [
      { title: 'Voorstel bij de SOEP-rapportage', status: 'demo', noot: 'taalmodel alleen als de AI-functies aan staan', body: 'Op de knop Analyseer stelt een taalmodel een evaluatie en een plan voor. U neemt over wat klopt; Curanta slaat niets vanzelf op. Controleer of het voorstel overeenkomt met wat u zag. Zonder taalmodel valt de functie terug op vaste regels.' },
      { title: 'Rapportageduur per team', status: 'demo', body: 'U ziet per team en per maand hoe lang het schrijven van een rapportage duurt, met en zonder het voorstel van de coach, en hoe vaak het voorstel is overgenomen, aangepast of niet gebruikt. Per team, nooit per medewerker; onder 5 rapportages staat er geen getal. De export bevat de meetmethode.' },
      { title: 'Kennisassistent', status: 'demo', noot: 'taalmodel', body: 'Vragen over protocollen en werkinstructies van uw organisatie, met verwijzing naar de bron. Controleer het antwoord in de bron voordat u ernaar handelt.' },
      { title: 'Cao-assistent', status: 'demo', noot: 'taalmodel', body: 'Antwoorden uit de cao-tekst die uw organisatie zelf inlaadt, met artikel, versie en pagina. Een verlopen tekst geeft geen antwoord. Uitleg, geen besluit: bij twijfel beslist P&O. Curanta levert geen cao-tekst mee.' },
      { title: 'Spraakinvoer', status: 'demo', body: 'Spraak naar tekst op het SOEP-scherm van de backoffice, verwerkt op het apparaat zelf: er gaat geen geluid naar buiten. Kan de browser dat niet, dan is er geen microfoon. In het medewerkerportaal: spraakberichten, geen spraak naar tekst.' },
      { title: 'Prognoses', status: 'demo', body: 'De zorgvraag per team en per week (geïndiceerde uren, geplande bezoeken en de instroom van de wachtlijst) naast de geroosterde uren en de contracturen, met het verschil. Daarnaast de zorgvraag per cliënt naast de uren van de Wmo-beschikking, en de verwachte wachttijd per urgentie. Het scherm zegt waarop elke voorspelling rust. Statistiek, geen taalmodel; wie welke dienst draait, beslist de planner.' },
      { title: 'Signalen bij diensten en ziekmeldingen', status: 'demo', body: 'Vaste regels, geen AI. Curanta signaleert overlap en ongebruikelijk lange diensten, en bij een ziekmelding de diensten die geraakt worden. De planner krijgt een bericht en past het rooster zelf aan.' },
    ],
  },
  {
    id: 'inzicht',
    group: 'Inzicht en uitleg',
    kort: 'Bestuur en management kijken naar dezelfde cijfers, zonder losse exports.',
    wie: 'Bestuur, management en control.',
    modules: [
      { title: 'Uitlegvideo’s in de app', status: 'demo', body: 'Korte schermopnames met Nederlandse uitleg en ondertitels. U vindt ze per scherm in het helppaneel en in een videotheek, met een eigen reeks per vakgebied. De stem is synthetisch; het is geen e-learning.' },
      { title: 'Dashboards', status: 'demo', body: 'Vooraf ingerichte dashboards voor zorg, declaratie, kwaliteit en HR.' },
      { title: 'Sectorcijfers', status: 'demo', noot: 'cijfers nog niet gecontroleerd', body: 'Uw eigen cijfers naast vaste VVT-sectorcijfers uit de ActiZ Branchemonitor 2024. Die cijfers zijn nog niet tegen de publicatie gecontroleerd.' },
    ],
  },
];

/** Het aantal onderdelen over alle groepen. */
export const AANTAL_ONDERDELEN = groups.reduce((n, g) => n + g.modules.length, 0);
