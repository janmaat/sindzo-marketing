/**
 * Genereert de OG-deelafbeeldingen (1200×630) voor curanta.nl.
 *
 * Waarom een script en geen handwerk: de afbeeldingen liepen twee merkgeneraties
 * achter (de pagina-varianten stonden nog op "Sindzo", de standaard op "Coheza").
 * Zo is opnieuw genereren na een merk- of copy-wijziging één commando in plaats
 * van negen keer een ontwerpprogramma openen.
 *
 * Vereist een lopende preview-server met de gebouwde site, zodat het echte
 * merk-font (self-hosted Plus Jakarta Sans) en het echte logo geladen worden:
 *
 *   npm run build && npm run preview          # http://localhost:4321
 *   node scripts/genereer-og-afbeeldingen.mjs
 *
 * Playwright staat **bewust niet** in package.json. De Plesk-deploy-hook draait
 * `npm ci`, en dan zou elke uitrol van de site een browser-toolkit meeslepen die
 * er niets te zoeken heeft — de PNG's zijn immers gecommitte artefacten, die
 * hoeven niet op de server gebouwd te worden. Installeer hem dus alleen als je
 * de afbeeldingen daadwerkelijk opnieuw genereert:
 *
 *   npm i --no-save playwright && npx playwright install chromium
 *
 * en verwijder hem daarna weer (`npm uninstall --no-save playwright`) zodat de
 * lockfile schoon blijft.
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const ORIGIN = process.env.OG_ORIGIN ?? 'http://localhost:4321';
const OUT = 'public';
const W = 1200;
const H = 630;

/**
 * eyebrow = kleine mint-bovenregel, hero = de kop, sub = mint onderregel.
 *
 * 21-10-2026 herschreven (positionering "volwaardig product", besluit Jan). De vorige teksten beweerden dingen die
 * niet in het feitenblad staan of niet kloppen: "aantoonbaar veilig" (pentest en NEN 7510-audit volgen nog),
 * "NL-hosting" (IONOS Cloud, Berlijn), "jaarlijkse indexering vooraf bekend", "MedMij", "XIS-keurmerk",
 * "Blended care" (e-health is gepland), en "Klein team" (geen teamgrootte, feitenblad rij Wie). Elke regel hieronder
 * staat in het feitenblad of op de pagina zelf. Een plaatje wordt overal gedeeld waar een link naartoe gaat.
 */
const IMAGES = [
  {
    file: 'og.png',
    hero: 'Zorgsoftware waarvan u de prijs al weet.',
    sub: 'Dossier · planning · declaratie · kwaliteit, in één systeem.',
  },
  {
    file: 'og/oplossing.png',
    eyebrow: 'Product',
    hero: 'Alle onderdelen, in één systeem.',
    sub: 'Van cliëntdossier en planning tot declaratie, kwaliteit en HRM.',
  },
  {
    file: 'og/integraties.png',
    eyebrow: 'Koppelingen',
    hero: 'De gebouwde koppelingen zitten in het abonnement.',
    sub: 'ZorgMail · ZorgDomein · Medimo · FHIR-API · Nmbrs.',
  },
  {
    file: 'og/prijzen.png',
    eyebrow: 'Prijzen',
    hero: 'De prijs staat gewoon op de site.',
    sub: '€19 tot €39 per actieve medewerker per maand · cliëntportaal gratis.',
  },
  {
    file: 'og/trust.png',
    eyebrow: 'Trust Centre',
    hero: 'Beveiliging en privacy, met de stand per onderwerp.',
    sub: 'Gegevens in de EU · BSN versleuteld · NEN 7513-logboek.',
  },
  {
    file: 'og/over.png',
    eyebrow: 'Over Curanta',
    hero: 'Gebouwd voor de Nederlandse zorg.',
    sub: 'Door ondernemers in software en zorg.',
  },
  {
    file: 'og/voor-vvt.png',
    eyebrow: 'Voor de VVT',
    hero: 'Wijkverpleging, thuiszorg en verpleeghuizen in één systeem.',
    sub: 'Routes · rapportage onderweg · declareren onder Wmo, Wlz en Zvw.',
  },
  {
    file: 'og/voor-ghz.png',
    eyebrow: 'Voor de gehandicaptenzorg',
    hero: 'Ondersteuningsplan, dagbesteding en verwanten in één dossier.',
    sub: 'Signaleringsplan · verblijf en logeren onder de Wlz · Wzd.',
  },
  {
    file: 'og/voor-ggz.png',
    eyebrow: 'Voor de GGZ',
    hero: 'Trajecten volgens het zorgprestatiemodel, in één dossier.',
    sub: 'Declareren volgens Vektis · afscherming per cliënt · ROM.',
  },
  {
    file: 'og/voor-huisartsen.png',
    eyebrow: 'Voor de eerstelijn',
    hero: 'Huisartsen en Curanta: samenwerking, geen HIS.',
    sub: 'Voor VVT, gehandicaptenzorg, GGZ, kraamzorg en jeugdzorg.',
  },
];

const esc = (s) =>
  String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

/**
 * De kop krimpt mee met zijn lengte: lange koppen (GHZ, huisartsen) zouden
 * anders uit het kader lopen of moeten afbreken op een rare plek.
 */
const heroSize = (hero) => (hero.length > 62 ? 54 : hero.length > 46 ? 62 : 72);

const template = ({ eyebrow, hero, sub }) => `<!doctype html>
<meta charset="utf-8">
<link rel="stylesheet" href="${ORIGIN}/_astro/${cssChunk}">
<style>
  *{ margin:0; padding:0; box-sizing:border-box; }
  html,body{ width:${W}px; height:${H}px; }
  body{
    background:#0E4F57; color:#fff; overflow:hidden; position:relative;
    font-family:'Plus Jakarta Sans', system-ui, sans-serif;
    display:flex; flex-direction:column; justify-content:center;
    /* Zonder flex-start rekt/centreert elk kind zich over de volle breedte —
       dan staat het logo midden in beeld in plaats van links. */
    align-items:flex-start;
    padding:0 96px;
  }
  /* Beeldmerk groot en vaag rechts — zelfde compositie als de vorige set.
     Bewust de variant mét buitencirkel: de compacte versie mist die ring en
     leest op 7% dekking als een paar losse vlekken. */
  .watermark{
    position:absolute; right:-150px; top:50%; transform:translateY(-50%);
    width:560px; opacity:.09; pointer-events:none;
    /* Het icoon is petrol-op-transparant; op een petrol vlak zou het onzichtbaar
       zijn. Dit maakt elke lijn wit, waarna de dekking het watermerk maakt. */
    filter:brightness(0) invert(1);
  }
  .logo{ height:60px; width:auto; margin-bottom:40px; }
  .eyebrow{
    font-size:22px; font-weight:700; letter-spacing:.14em; text-transform:uppercase;
    color:#21C7A8; margin-bottom:22px;
  }
  .rule{ width:152px; height:5px; background:#21C7A8; border-radius:3px; margin-bottom:30px; }
  .hero{
    font-size:${heroSize(hero)}px; font-weight:800; line-height:1.1;
    letter-spacing:-.02em; max-width:930px;
  }
  .sub{ margin-top:24px; font-size:30px; font-weight:600; color:#7FC6BB; max-width:900px; }
  .domain{
    position:absolute; left:96px; bottom:56px;
    font-size:26px; font-weight:600; color:#B0DDD5;
  }
</style>
<img class="watermark" src="${ORIGIN}/logo/curanta-icon.svg" alt="">
<img class="logo" src="${ORIGIN}/logo/curanta-logo-dark.svg" alt="Curanta">
${eyebrow ? `<div class="eyebrow">${esc(eyebrow)}</div>` : '<div class="rule"></div>'}
<div class="hero">${esc(hero)}</div>
<div class="sub">${esc(sub)}</div>
<div class="domain">curanta.nl</div>
`;

// De site bundelt zijn CSS in één chunk met een hash in de naam; daarin zitten
// de @font-face-regels voor Plus Jakarta Sans. Zonder die chunk valt de render
// terug op een systeemfont en wijkt het woordmerk-font af van de site.
let cssChunk;
try {
  cssChunk = fs.readdirSync('dist/_astro').find((f) => f.endsWith('.css'));
} catch {
  console.error('dist/_astro niet gevonden — draai eerst `npm run build`.');
  process.exit(1);
}
if (!cssChunk) {
  console.error('Geen CSS-chunk in dist/_astro gevonden.');
  process.exit(1);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
// Eerst naar de preview, zodat setContent dezelfde herkomst heeft: vanaf about:blank weigert Chromium het lettertype
// van localhost (CORS, net::ERR_FAILED) en valt de render ongemerkt terug op een systeemletter (gezien 21-10-2026).
await page.goto(ORIGIN);

for (const img of IMAGES) {
  await page.setContent(template(img), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const merkletter = await page.evaluate(() =>
    [...document.fonts].some((f) => f.family.includes('Plus Jakarta Sans') && f.status === 'loaded'),
  );
  if (!merkletter) {
    console.error(`Plus Jakarta Sans niet geladen voor ${img.file}; de render zou een systeemletter tonen.`);
    process.exit(1);
  }
  const dest = path.join(OUT, img.file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  await page.screenshot({ path: dest, type: 'png' });
  console.log('✓', dest, `(${(fs.statSync(dest).size / 1024).toFixed(0)} kB)`);
}

await browser.close();
console.log(`\n${IMAGES.length} OG-afbeeldingen gegenereerd op ${W}×${H}.`);
