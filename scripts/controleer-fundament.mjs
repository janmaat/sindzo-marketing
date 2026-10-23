// Legt de .NET-versie die curanta.nl noemt (src/config/fundament.ts) naast de TargetFramework van Curanta.Host in
// de Ponscura-repo, en faalt als ze verschillen.
//
// Waarom (prompt site-houdbaarheid 01, 23-10-2026): Curanta stapt elk jaar in november over op de nieuwe .NET-versie
// (besluit Jan 23-10-2026). Zonder deze controle blijft /trust na de overstap stil ".NET 10" zeggen.
// In Curanta.Host.csproj staat `net10.0` rechtstreeks; er is geen centrale eigenschap.
//
// Gebruik:  npm run controleer:fundament
//           (PONSCURA_REPO=<pad> als de Ponscura-repo niet naast deze repo staat)
// Na een build controleert hij ook of de gebouwde /trust de versie noemt.
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const hier = dirname(fileURLToPath(import.meta.url));
const site = resolve(hier, '..');
const ponscura = process.env.PONSCURA_REPO ?? resolve(site, '..', 'Ponscura');
const csproj = resolve(ponscura, 'src', 'Host', 'Curanta.Host', 'Curanta.Host.csproj');

const fundament = readFileSync(resolve(site, 'src', 'config', 'fundament.ts'), 'utf8');
const opSite = fundament.match(/framework:\s*'([^']+)'/)?.[1];
const versieOpSite = fundament.match(/versie:\s*'([^']+)'/)?.[1];
if (!opSite || !versieOpSite) {
  console.error('fundament.ts: framework of versie niet gevonden.');
  process.exit(1);
}

if (!existsSync(csproj)) {
  console.error(`Curanta.Host.csproj niet gevonden op ${csproj}. Zet PONSCURA_REPO.`);
  process.exit(1);
}
const inCode = readFileSync(csproj, 'utf8').match(/<TargetFramework>([^<]+)<\/TargetFramework>/)?.[1];

const fouten = [];
if (inCode !== opSite) {
  fouten.push(`De site zegt ${opSite} (${versieOpSite}), Curanta.Host draait op ${inCode}. ` +
    'Werk src/config/fundament.ts bij (versie, framework, einddatum van de updates), en het feitenblad (rij Fundament).');
}

const trust = resolve(site, 'dist', 'trust', 'index.html');
if (existsSync(trust) && !readFileSync(trust, 'utf8').includes(versieOpSite)) {
  fouten.push(`De gebouwde /trust noemt "${versieOpSite}" niet. Is de build van vóór de wijziging?`);
}

if (fouten.length) {
  for (const f of fouten) console.error(`✗ ${f}`);
  process.exit(1);
}
console.log(`✓ Site en code noemen dezelfde versie: ${versieOpSite} (${inCode}).`);
