// Zet de hashes van alle inline scripts in de CSP van dist/.htaccess (24-10-2026).
//
// public/.htaccess heeft `script-src 'self' 'unsafe-inline' ...`. Na `astro build` vervangt dit script
// 'unsafe-inline' door een 'sha256-...' per inline script in de gebouwde pagina's. Zo staat de browser alleen
// de scripts toe die wij bouwden; een geïnjecteerd script draait niet (PageSpeed "CSP effectief tegen XSS").
// Omdat het bij elke build opnieuw rekent, hoeft niemand hashes bij te houden.
//
// Het script faalt (exitcode 1) als:
//   - de regel in .htaccess niet gevonden wordt — dan zou de site stil zonder hashes uitgaan;
//   - een pagina een inline handler heeft (onclick="..."): die blokkeert de CSP, ook met hashes.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, relative } from 'node:path';

const DIST = 'dist';
const HTACCESS = join(DIST, '.htaccess');
const JS_TYPES = new Set(['', 'module', 'text/javascript', 'application/javascript']);

function* htmlBestanden(map) {
  for (const naam of readdirSync(map)) {
    const pad = join(map, naam);
    if (statSync(pad).isDirectory()) yield* htmlBestanden(pad);
    else if (naam.endsWith('.html')) yield pad;
  }
}

const hashes = new Set();
const handlers = [];
let paginas = 0;
for (const pad of htmlBestanden(DIST)) {
  paginas++;
  const html = readFileSync(pad, 'utf8');
  for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    const [, attrs, inhoud] = m;
    if (/\ssrc\s*=/i.test(attrs)) continue;
    const type = (attrs.match(/\stype\s*=\s*["']?([^"'\s>]+)/i)?.[1] ?? '').toLowerCase();
    if (!JS_TYPES.has(type)) continue; // application/ld+json e.d. voert de browser niet uit
    // De HTML-parser maakt van CRLF en CR een LF vóór hij hasht.
    const tekst = inhoud.replace(/\r\n?/g, '\n');
    hashes.add(`'sha256-${createHash('sha256').update(tekst, 'utf8').digest('base64')}'`);
  }
  const zonderScripts = html.replace(/<script\b[\s\S]*?<\/script>/gi, '');
  for (const m of zonderScripts.matchAll(/<[a-z][^>]*?\s(on[a-z]+)\s*=/gi)) handlers.push(`${relative(DIST, pad)}: ${m[1]}`);
}

if (handlers.length) {
  console.error(`csp-hashes: inline handlers gevonden; de CSP blokkeert die. Gebruik addEventListener.\n  ${handlers.join('\n  ')}`);
  process.exit(1);
}

const htaccess = readFileSync(HTACCESS, 'utf8');
const oud = "script-src 'self' 'unsafe-inline'";
if (!htaccess.includes(oud)) {
  console.error(`csp-hashes: "${oud}" niet gevonden in ${HTACCESS}; de CSP is niet bijgewerkt.`);
  process.exit(1);
}
const lijst = [...hashes].sort();
writeFileSync(HTACCESS, htaccess.replace(oud, `script-src 'self' ${lijst.join(' ')}`));
console.log(`csp-hashes: ${lijst.length} inline scripts uit ${paginas} pagina's in de CSP van ${HTACCESS}.`);
