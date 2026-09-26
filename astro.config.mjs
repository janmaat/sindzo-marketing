import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Marketing-site config. Doel: snel, statisch, edge-cacheable.
// Hosting: Plesk op de STRATO-server (Apache achter nginx) — zie deploy/ en public/.htaccess.
// Geen runtime-dependency op de Blazor-monolith.
export default defineConfig({
  site: 'https://curanta.nl',
  trailingSlash: 'never',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    mdx(),
    sitemap({
      // Hint aan crawlers welke pagina's prioriteit hebben. Transactionele
      // pagina's (bedankt, demo-form-result) sluiten we uit; legal-pagina's
      // krijgen lage prio. Productpagina's en kennisbank-artikelen tussen
      // 0.7-1.0.
      // /kennisbank staat op noindex zolang er geen artikelen zijn (25-09-2026); dan hoort hij
      // ook niet in de sitemap.
      filter: (page) => !page.includes('/bedankt') && !page.includes('/login') && !page.includes('/kennisbank'),
      serialize(item) {
        const url = new URL(item.url);
        const path = url.pathname;
        let priority = 0.7;
        let changefreq = 'monthly';
        if (path === '/' || path === '') {
          priority = 1.0;
          changefreq = 'weekly';
        } else if (['/oplossing', '/vergelijking', '/prijzen', '/integraties', '/trust',
                    // Toegevoegd 2026-08-17: de open demo-omgeving en de overstap-pagina
                    // zijn onze twee sterkste conversiemiddelen, dus dezelfde prioriteit
                    // als de productpagina's.
                    '/demo-omgeving', '/overstappen', '/cases'].includes(path)) {
          priority = 0.9;
          changefreq = 'weekly';
        } else if (path.startsWith('/voor/') || path === '/voor') {
          priority = 0.8;
          changefreq = 'monthly';
        } else if (path.startsWith('/kennisbank/')) {
          priority = 0.7;
          changefreq = 'monthly';
        } else if (['/privacy', '/voorwaarden', '/cookies'].includes(path)) {
          priority = 0.3;
          changefreq = 'yearly';
        }
        return { ...item, priority, changefreq };
      },
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    server: {
      watch: {
        // Atomic-write race op Windows: Vite/chokidar firet 'add' op een tmp-
        // bestand dat al verwijderd is voor de stat → ENOENT in manifest-builder.
        // awaitWriteFinish wacht tot het bestand stable is.
        awaitWriteFinish: {
          stabilityThreshold: 80,
          pollInterval: 20,
        },
      },
    },
  },
});
