// Exporteer de volledige marketingsite naar één PDF.
// Start astro preview, print elke pagina via Edge-headless, merge met pdf-lib.
import { spawn, spawnSync } from 'node:child_process';
import { mkdirSync, rmSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import PDFMerger from 'pdf-merger-js';

const root = resolve(fileURLToPath(import.meta.url), '..', '..');
const tmpDir = join(root, '.pdf-tmp');
const edgeProfile = join(tmpDir, 'edge-profile');
const outPath = join(root, 'dist', 'coheza-marketingsite.pdf');
const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const port = 4322;

// Volgorde = beoogde leesroute van de PDF.
const routes = [
  '/',
  '/oplossing',
  '/integraties',
  '/trust',
  '/prijzen',
  '/voor/vvt',
  '/voor/ghz',
  '/voor/ggz',
  '/voor/huisartsen',
  '/cases',
  '/over',
  '/implementatie',
  '/procurement',
  '/demo',
  '/contact',
  '/privacy',
  '/cookies',
  '/voorwaarden',
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForServer(url, timeoutMs = 30_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {}
    await sleep(250);
  }
  throw new Error(`Server kwam niet online op ${url}`);
}

function slugify(route) {
  return route === '/' ? 'home' : route.replace(/^\//, '').replace(/\//g, '-');
}

async function main() {
  if (!existsSync(edge)) {
    throw new Error(`Edge niet gevonden op ${edge}`);
  }
  rmSync(tmpDir, { recursive: true, force: true });
  mkdirSync(tmpDir, { recursive: true });

  console.log('▶ astro preview starten…');
  const preview = spawn('npx', ['astro', 'preview', '--port', String(port)], {
    cwd: root,
    shell: true,
    stdio: ['ignore', 'pipe', 'inherit'],
  });
  preview.stdout.on('data', (d) => process.stdout.write(`  ${d}`));

  try {
    await waitForServer(`http://localhost:${port}/`);
    console.log('✓ server actief\n');

    const files = [];
    for (const route of routes) {
      const url = `http://localhost:${port}${route}`;
      const file = join(tmpDir, `${slugify(route)}.pdf`);
      console.log(`▶ ${route}`);
      const res = spawnSync(
        edge,
        [
          '--headless=new',
          '--disable-gpu',
          '--no-sandbox',
          `--user-data-dir=${edgeProfile}`,
          '--no-pdf-header-footer',
          '--virtual-time-budget=8000',
          `--print-to-pdf=${file}`,
          url,
        ],
        { encoding: 'utf8' },
      );
      if (res.status !== 0) {
        console.error('  stdout:', res.stdout?.slice(0, 500));
        console.error('  stderr:', res.stderr?.slice(0, 500));
        throw new Error(`Edge exit ${res.status} voor ${route}`);
      }
      // Edge flusht de PDF soms na exit van het parent-process; kort pollen.
      const deadline = Date.now() + 10_000;
      while (!existsSync(file) && Date.now() < deadline) await sleep(150);
      if (!existsSync(file)) {
        throw new Error(`PDF nooit verschenen voor ${route}`);
      }
      files.push(file);
    }

    console.log('\n▶ samenvoegen…');
    const merger = new PDFMerger();
    for (const f of files) await merger.add(f);
    await merger.setMetadata({
      title: 'Coheza — marketingsite (volledig)',
      author: 'Coheza',
      subject: 'Volledige export van de Coheza marketingsite',
      producer: 'Edge headless + pdf-merger-js',
    });
    await merger.save(outPath);
    console.log(`✓ klaar → ${outPath}`);
  } finally {
    preview.kill();
    rmSync(tmpDir, { recursive: true, force: true });
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
