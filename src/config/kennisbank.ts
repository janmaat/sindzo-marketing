// Kaartjes voor kruislinks naar de kennisbank (RelatedArticles), zodat elke pagina die naar een artikel
// verwijst dezelfde titel en samenvatting toont.
//
// Waarom kruislinks (22-10-2026): Search Console meldde het artikel over de Cyberbeveiligingswet als
// "Gecrawld, momenteel niet geïndexeerd". Het kreeg één interne link, alleen vanaf /kennisbank. Een pagina
// waar de site zelf weinig naar verwijst, weegt voor Google licht. Plaats een kaartje alleen waar het
// onderwerp op de pagina al aan bod komt.

export interface KennisbankArtikel { eyebrow: string; title: string; body: string; href: string; }

export const CYBERBEVEILIGINGSWET: KennisbankArtikel = {
  eyebrow: 'Wet- en regelgeving',
  title: 'De Cyberbeveiligingswet: wat het bestuur moet vaststellen',
  body: 'Voor wie de wet geldt, wat het bestuur zelf goedkeurt en bijhoudt, wat de wet over leveranciers zegt, en wanneer u een incident meldt.',
  href: '/kennisbank/cyberbeveiligingswet-bestuur-zorg',
};

export const DOORBRAAKMIDDELEN: KennisbankArtikel = {
  eyebrow: 'Financiering',
  title: 'Doorbraakmiddelen: wat het modelplan van uw software vraagt',
  body: 'Wie de middelen voor spraakgestuurd rapporteren en capaciteitsplanning kan aanvragen, wanneer en voor hoeveel.',
  href: '/kennisbank/doorbraakmiddelen-modelplan-software',
};

export const MEERTALIG_PORTAAL: KennisbankArtikel = {
  eyebrow: 'Cliëntportaal',
  title: 'Een cliëntportaal in de taal van de cliënt: wat de wet vraagt, en wat niet',
  body: 'Begrijpelijke informatie en inzage volgens Wgbo, Wkkgz, AVG en Wabvpz, en CBS-cijfers over oudere migranten.',
  href: '/kennisbank/meertalig-clientportaal-nl-zorg',
};

export const PEER_SUPPORT: KennisbankArtikel = {
  eyebrow: 'Medewerkers',
  title: 'Peer-support voor zorgmedewerkers: wat het onderzoek zegt, en wat niet',
  body: 'Het onderzoek, de AZW-cijfers en de privacyregels op een rij, met de vragen voor HR en FG.',
  href: '/kennisbank/peer-support-zorgmedewerkers',
};
