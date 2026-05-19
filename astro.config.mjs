import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Marketing-site config. Doel: snel, statisch, edge-cacheable.
// Hosting-target: Cloudflare Pages / Vercel static export.
// Geen runtime-dependency op de Blazor-monolith.
export default defineConfig({
  site: 'https://sindzo.nl',
  trailingSlash: 'never',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    mdx(),
    sitemap(),
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
