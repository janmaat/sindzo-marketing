# Controlelijst claims — herinrichting curanta.nl (8 oktober 2026)

> **Uitgangspunt (Jan, 08-10-2026):** vóór de eerste organisatie met Curanta begint, zijn uitgevoerd: de
> uitrol naar app.curanta.nl met een nieuwe gouden toestand van de demo, de merge van
> `feat/homepage-herinrichting` en van de Ponscura-branch `docs/helpteksten-2026-10-08`, de bevestiging van de
> ADR's die op "ter bevestiging" stonden, en de aanvullingen op het feitenblad
> (`docs/feitenblad-voorstel-2026-10-08.md`). De site gaat daarvan uit en maakt er geen voorbehoud meer over.
> Wat in de app zelf nog niet af is (Zvw, Mollie-betaallink, pentest, FG, NEN 7510-audit, versleuteling
> van de hele database), blijft op de site staan zoals het is.

Branch `feat/homepage-herinrichting`. Deze lijst staat buiten de website (de map `docs/` wordt niet
gebouwd). Hij bevat wat nog bevestigd moet worden, wat in de code en bij officiële bronnen is
nagelopen, en wat buiten de site hoort te veranderen. Een punt dat hier openstaat, is op de site
niet sterker geformuleerd dan het feitenblad toelaat; waar twijfel was, is het weggelaten.

## A. Te bevestigen door Jan

| # | Claim | Waar op de site | Waarom bevestigen |
|---|---|---|---|
| A1 | Partnerprogramma (tot 21-10-2026 "founding partner"): maximaal **drie** plekken, **36 maanden** vaste prijs, meepraten over de roadmap | /cases#partner, /trust (banner en homepagekaart weg sinds 21-10-2026) | Feitenblad [besluit Jan 24-09]. Nog actueel? Zijn er nog drie plekken vrij? Zo niet: banner en teksten aanpassen. |
| A2 | NEN 7510: externe audit "gepland" | homepage, /trust, /vergelijking | Feitenblad: "Q4 2026 [te bevestigen]". Q4 is nu begonnen. De site noemt daarom geen kwartaal meer. Datum en auditor bevestigen, of "gepland" vervangen. |
| A3 | ISO 27001: audit gepland 2027 | /trust, /vergelijking | Feitenblad: [te bevestigen]. |
| A4 | /vergelijking: controledatum **8 oktober 2026** in plaats van peildatum 29-05-2026 | /vergelijking | Feitenblad zegt "peildatum 29-05-2026". De vergelijking is opnieuw nagelopen met bronnen (zie D3); het feitenblad moet mee. |
| A5 | Inbegrepen bij de implementatie: "training van 5–10 sleutelgebruikers", "begeleiding op locatie waar dat nodig is", "proefperiode met één team naast het oude systeem" | /implementatie (ongewijzigd); homepage noemt alleen "eerst sleutelgebruikers, daarna de andere medewerkers" | Staat niet in het feitenblad. Klopt dit als toezegging, ook financieel (twee systemen naast elkaar)? |
| A6 | Demotoegang: "iedere bezoeker krijgt een eigen toegang" | /demo-omgeving, homepage ("Vraag demo-toegang aan") | In `appsettings.Demo.json` staat `Demotoegang:Ingeschakeld=false`; een app-poolvariabele kan dat overschrijven. Op de server nagaan wat live geldt. |
| A7 | Knopteksten gewijzigd: "Vraag demo-toegang aan" en "Vraag een demonstratie aan" | `src/config/demo.ts` (overal) | Op `feat/proefomgeving-08-aanmelden` staat een eigen `demo.ts` (andere bestemmingen). Bij de merge: de nieuwe labels overnemen, de bestemmingen van de 08-branch houden. |
| A8 | Ondersteuning: "vanaf Compliance Pro telefonisch 09:00–17:00" | homepage (overstappen), /trust | Feitenblad: "telefonisch 09:00–17:00 bij Compliance Pro". Geldt dat ook voor Totaalzorg Plus en Enterprise? De site zegt "vanaf". |
| A9 | Facturering per medewerker | homepage, /prijzen | Feitenblad: de code rekent nog per organisatie (€199/€499/€999); voorwaarde vóór de eerste factuur. Geen sitetekst gewijzigd, wel een open voorwaarde. |

## B. Nog onbevestigde uitspraken die al op de site stonden (niet sterker gemaakt)

| # | Uitspraak | Pagina | Opmerking |
|---|---|---|---|
| B1 | "NEN 7512: uitgangspunt bij het bouwen van de koppelingen; nog niet extern getoetst" | /trust | Was "Toegepast op FHIR-/LSP-koppelingen" (LSP is in ontwikkeling). Afgezwakt; bron in de code ontbreekt. |
| B2 | "Pseudonimiseren bij een verzoek tot verwijdering, met een vastlegging in het logboek" | /trust | Was "Recht op vergetelheid: pseudonimisering + audit-trail". Niet in het feitenblad. |
| B3 | Microsoft Entra ID (SSO): "de instellingen zijn er; inloggen via SSO nog niet" | /integraties | Niet in het feitenblad. |
| B4 | "Stuurt u uw beveiligingsvragenlijst (CAIQ, SIG, BSI C5), dan vullen wij die in" | /trust | Feitenblad: inkoopdocumenten "op aanvraag opgesteld". Een ingevulde vragenlijst is een toezegging. |
| B5 | Marktbandbreedte (Heldy, april 2026) en de prijzentabel met Octaaf, Karify, Curasoft, Ecare (nagetrokken 17-08-2026) | /prijzen | Ouder dan twee maanden; opnieuw nagaan vóór een campagne. "Vaak nacalculatie" bij migratie is weggehaald (geen bron). |
| B6 | Kennisassistent "met verwijzing naar de bron" | /oplossing | Feitenblad noemt de kennisassistent; de bronverwijzing staat in de README van het campagnemateriaal, niet in het feitenblad. |
| B7 | "Geen overdracht: wie u spreekt in de aanloop, blijft uw aanspreekpunt" | /over (ongewijzigd) | Een toezegging over bemensing; feitenblad: geen teamgrootte noemen. |
| B8 | Sectorcijfers ActiZ Branchemonitor 2024 | /oplossing | Feitenblad: nog niet gecontroleerd; zo vermeld op de site. |

## C. In de code nagelopen (D:\Repos\Ponscura, 8 oktober 2026)

| Claim op de homepage of /oplossing | Oordeel | Bewijs |
|---|---|---|
| SOEP-voorstel (E en P) alleen op verzoek, niets vanzelf opgeslagen | klopt | `Ponscura.AI.SoepCoach/UI/CoachSuggestiePanel.razor:23-100` ("Adviserend — u beslist zelf wat u overneemt. Niets wordt automatisch opgeslagen."); `Soep.razor:279-290` |
| Samenvatting zorgplan in gewone taal: zorgverlener schrijft of bewerkt, eventueel met AI-voorstel, en zet hem zelf zichtbaar | klopt | `Curanta.Host/Components/Zorgplan/LekentaalAssistentDialog.razor`; `Pages/Ecd/Zorgplan.razor:698-745` |
| Document delen met cliënt en mantelzorgers met leesrecht | klopt | `Pages/Portaal/PortaalContact.razor:152-158`; `Shared/PortaalDocumentDelenDialog.razor:18-19` |
| Open diensten: aanmelden geeft de dienst direct, na controle op overlap en cao; ruil keurt de planner goed | klopt (oude tekst "planner keurt goed" was onjuist) | `ShiftService.cs:706-741`; `DienstWissel.razor:419` |
| Retourberichten: zelf inlezen (XML plakken), afkeuringen per oorzaak in de retourtriage; automatisch ophalen nog niet | klopt | `RetourInlezenDialog.razor`; `RetourTriage.razor`; `OndersteuntInbox => false` |
| Roostertoets blokkeert harde overtredingen bij publiceren, alleen met gekozen cao | klopt | `ShiftService.cs:631-670`; `Planbord.razor:99-106` |
| Alle modules aan in de demo; koppelingen in de demo niet live | klopt | `SubscriptionFeatureGate.cs` (Subscriptions:Enabled standaard false); `IwmoModule.cs:42-53`, `ZorgMailModule.cs:47-55` e.a. |
| Risico's in het zorgplan met vaste rekenregels, overnemen met "Voeg toe aan plan" | klopt | `OndervoedingRisicoEvaluator.cs:10-18`; `RisicoprofielSuggesties.razor:24-30` |
| Vijf talen cliëntportaal, PL en UK uit | klopt | `Curanta.Portaal/Program.cs:75-87` |
| Planhulp: rekenmodel, geen taalmodel | klopt | `RittenplannerOptimalisatieEngine.cs:10-26` — zie E1 |

## D. Bij officiële bronnen nagelopen (8 oktober 2026)

| # | Onderwerp | Uitkomst | Gevolg op de site |
|---|---|---|---|
| D1 | Cyberbeveiligingswet | In werking sinds 15-08-2026 (Stb. 2026, 187 en 189). Zorg: vanaf 50 fte, of jaaromzet én balanstotaal ≥ €10 mln. Registratie bij het NCSC; meldingen 24 uur, 72 uur, één maand. | /trust: doelgroep en registratie toegevoegd. Nooit "Cbw-ready". |
| D2 | Wtta | Geldt vanaf 1-1-2027, maar 2027 is een overgangsjaar; pas vanaf **1-1-2028** alleen inlenen van toegelaten uitleners. Register raadpleegbaar vanaf 1-7-2027 (toelatinguitleenmarkt.nl). | **Gecorrigeerd**: de oude homepage zei dat inleners vanaf 1-1-2027 alleen van toegelaten uitleners mogen inlenen. Feitenblad aanvullen. |
| D3 | AI-verordening, hoog risico | Bijlage III vanaf 2-12-2027 (Verordening (EU) 2026/1744, in werking 27-7-2026). | /trust. |
| D4 | Jaarverantwoording (Wtza, art. 40a Wmg) | Vóór 1 juni, via DigiMV; voor aanbieders met Zvw- of Wlz-zorg of VWS-subsidie; solisten uitgezonderd. | /trust en /oplossing: "vóór 1 juni" in plaats van "31 mei"; doelgroep gecorrigeerd ("toelatingsverplichte zorgaanbieders" was te breed). |
| D5 | Wmcz 2018 | Cliëntenraad bij "in de regel meer dan tien" zorgverleners; voor eerstelijnszorg zonder verblijf meer dan 25. | /oplossing: "in de regel" toegevoegd. De uitzondering van 25 staat er niet. |
| D6 | Wet bescherming klokkenluiders | 50 of meer werknemers. | Ongewijzigd. |
| D7 | WPM | Verplicht vanaf 100 werknemers; rapportage vóór 1 juli. Voornemen IenW: grens naar 250, met terugwerkende kracht tot 1-1-2026; nog niet vastgesteld. | **Open**: als het besluit doorgaat, /oplossing en /prijzen aanpassen. |
| D8 | NEN 7510:2024 | Certificaathouders vóór 20-02-2027 over naar de nieuwe norm. | Niet op de site (Curanta is niet gecertificeerd). |
| D9 | Wegiz | Geen AMvB eOverdracht in werking; planning Q1 2028. Medicatieoverdracht 2029/2031. | Niet op de site. **Brochure-README noemt "AMvB eOverdracht 2026" en "medicatieoverdracht medio 2026": verouderd.** Kennisbankartikelen nalopen. |
| D10 | Wkkgz | Calamiteit "onverwijld" melden; interne procedure voor het melden van incidenten (Uitvoeringsbesluit art. 6.1). "VIM" is geen wettelijke term. | /oplossing: VIM uitgelegd als "de interne procedure voor het melden van incidenten die de Wkkgz vraagt". |

Bronnen: zoek.officielebekendmakingen.nl/stb-2026-187 en -189; ncsc.nl; igj.nl; toelatinguitleenmarkt.nl;
eur-lex.europa.eu/eli/reg/2026/1744/oj en de AI Act Service Desk; wetten.overheid.nl (BWBR0020078,
BWBR0042294, BWBR0037852, BWBR0037173, BWBR0037262); jaarverantwoordingzorg.nl; rvo.nl/onderwerpen/rapportage-wpm;
nen.nl; Kamerbrief VWS 29-4-2026 (Wegiz-planning).

### D3. Concurrentievergelijking: correcties

Opnieuw nagelopen in publieke bronnen; elke cel op /vergelijking heeft nu een URL.

- "PinkRoccade myNeva" bestaat niet. myneva is een ander bedrijf (myneva Nederland B.V., voorheen Regas). Het VVT-dossier van PinkRoccade is mijnCaress.
- Nedap Caren biedt Nederlands en Engels. Op de oude pagina stond "NL-only".
- Spraakgestuurd rapporteren werkt bij Nedap en Pluriform via Attendi en Tell James. Op de oude pagina stond "nee" of "deels".
- Pluriform Zorg wordt geleverd door Adapcare; de ISO 27001- en NEN 7510-certificaten zijn van Adapcare.
- Cura en Plancare 2 zijn sinds 2020 samen Fierit (Tenzinger). "Cura (PinkRoccade)" was onjuist.
- Carit Care en Famped/Famedio zijn niet als zorgsoftware teruggevonden. Ze zijn weggehaald.
- Voor de aantallen interventiesjablonen (Nedap ~187, Pluriform ~140) is geen bron gevonden. Ze zijn weggehaald.
- mijncaress.nl gaf op 8-10-2026 een 403/404. De mijnCaress-cellen steunen daarom op bronnen van derden of staan op "niet gevonden".
- De uitspraak "geen andere VVT-leverancier biedt een meertalig portaal" is van de homepage, /voor/vvt, /voor/ghz en /over gehaald. Caren heeft Engels.

## E. Buiten de site (product en materiaal)

| # | Punt | Waar |
|---|---|---|
| E1 | Het scherm Planhulp heet "Planning - AI assistentie", maar Planhulp gebruikt geen taalmodel (feitenblad: "geen AI"). | `Curanta.Host/.../Planhulp.razor:20` |
| E2 | Het cliëntportaal laat niet zien dat een samenvatting met AI is opgesteld; de backoffice wel. Overweeg een vermelding voor de cliënt. | `Curanta.Portaal/Components/Pages/Zorgplan.razor:131-142` |
| E3 | De retourberichtenpagina toont "Beschikbaar vanaf 01-12-2026": een datumbelofte in de app. | `IwmoBerichten.razor:80-91` |
| E4 | ✅ Opgelost 08-10: verse opnames (zie beeldbronnen.md). Eerder: de schermafbeeldingen op de site kwamen uit `docs/campagne/materiaal/schermen` (opgenomen in september 2026). Sindsdien is de interface op veel punten gewijzigd: demobanner, dossier, zorgplan, planbord en dienstdetail. Maak bo-zorgplan, bo-planbord, bo-productie, bo-vim, mw-soep/mw-bezoek/mw-rooster en pc-zorgplan/pc-samenzorgen opnieuw, met de skill `instructievideo` (hosts 7080/7230/7081). Vervang daarna de bestanden in `src/assets/schermen/`; de bijschriften noemen "Opname september 2026". | — |
| E5 | Het planbord toont Engelse woorden: "Shifts deze week", "Visits", "Today", "Resources". | Planbord |
| E6 | Het feitenblad aanvullen: Wtta-overgangsjaar (D2), controledatum vergelijking (A4), open diensten zonder goedkeuring (C), WPM-voornemen (D7). | feitenblad |

## F. Ontwerp en beeldrechten

- **Canopy (Medium Rare)** is een Webflow-sjabloon. Het kost $79 en heeft een Webflow Single-Use License. Er is geen Tailwind- of Astro-bron; exporteren vraagt een betaald Webflow-abonnement. Het is **niet gekocht en niet gebruikt**. Alleen de compositieprincipes zijn overgenomen: tekst links, groot beeld, wisselende lichte vlakken, één donkere band, ronde knoppen met een tekstlink. Code, beelden, iconen en lettertypen zijn niet overgenomen, dus een licentie is niet nodig. Kies je later toch voor het sjabloon, let dan op: de bijgeleverde Icons8-iconen vragen een naamsvermelding.
- De **foto's** staan in `docs/beeldbronnen.md`: Unsplash- en Pexels-licentie, met de fotograaf en de bronpagina.
- De **iconen** zijn Lucide-vormen (ISC-licentie). De licentietekst staat in `src/components/Icon.astro`.

## G. Niet herzien in deze ronde

De kennisbankartikelen, /procurement, /adr, /implementatie, /overstappen (alleen enkele zinnen
aangepast), /contact, /demo, /demo-omgeving, /privacy, /voorwaarden en /cookies. Loop vooral de
kennisbankartikelen na op wetsdata (zie D9). Gebruik daarvoor de skill `site-inhoudscontrole`.

## H. Aanvulling 8 oktober 2026: functies van de week van 1–7 oktober

Opgenomen op de site (homepage, /oplossing, /integraties, /voor/ghz, /voor/ggz, nieuw /voor/kraamzorg en
/voor/jeugdzorg) en als voorstel voor het feitenblad uitgeschreven in `docs/feitenblad-voorstel-2026-10-08.md`,
met de bron in de code per rij. Belangrijkste punten:

- **Demo:** de functies van 1–7 oktober staan als "te zien in de demo"; zie het uitgangspunt bovenaan.
- **Teruggedraaid (08-10):** een correctie die zei dat de maanddeclaratie onder Wmo en Jeugdwet geen scherm had,
  was onjuist: die bewering kwam uit verouderde helpteksten (iwmo.md:40, ijw.md:41). De knop **Declaratie opstellen**
  op iWmo- en iJw-berichten stelt de Wmo323/Jw323 op uit goedgekeurde productie. De site zegt weer dat u onder
  Wmo, Jeugdwet en Wlz declareert; versturen vraagt het Vecozo-certificaat.
- **Planregel Basic:** ongewijzigd "1 declaratiemodule (Wmo, Jeugdwet óf Wlz)"; de aanpassing van 08-10 is teruggedraaid
  omdat de aanleiding (geen Wmo-declaratiescherm) niet klopte.
- **Gecorrigeerd:** het Wzd-overzicht wordt nu gevalideerd tegen de XSD van de IGJ (was "niet getoetst").

## I. Omaha (8 oktober 2026, middag)

- Omaha-teksten afgezwakt op /oplossing, /voor/vvt en /api: "opgebouwd rond de 42 problemen van het Omaha System,
  met KBS-scores" en "geen keurmerk". Nooit "100%", "volledig" of "de enige" (vergelijkende reclame, art. 6:194a BW).
- /vergelijking: rij "Omaha-keurmerk" met de lijst van de stichting als bron (08-10-2026).
- Product: één tussenmeting per probleem (ZorgPlanConfigurations.cs:110) breekt het KBS-verloop; los op, ook zonder keurmerk.
- Open, ter beslissing: Cloud Act-regel en mijnCaress op /overstappen (tekstvoorstel in het feitenbladvoorstel);
  financiële continuïteit (controleverklaring, verzekering) wacht op gegevens van Jan.
