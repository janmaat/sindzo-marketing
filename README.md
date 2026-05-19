# Sindzo Marketing Site

Publieke marketingsite voor **Sindzo** — zorgsuite voor VVT/GHZ/GGZ in Nederland.
Productie-URL: `https://sindzo.nl`.

Bewust een aparte repo, gescheiden van de Blazor-applicatie (`D:\Repos\Ponscura`):

- **Andere deploy-cadens** — content/pricing-updates dagelijks vs. zorgvuldige app-releases.
- **Andere stack** — Astro/Node vs. .NET 10; geen Node-noise in de zorg-codebase.
- **Andere security-grens** — publieke marketingsite vs. NEN 7510-gescopete app.
- **Andere toegang** — copywriter/agency mag straks deze repo zien, niet de app.

## Stack

- **Astro 5** — statische output, edge-cacheable
- **Tailwind CSS 3** — utility-first, met Sindzo-design-tokens in `tailwind.config.mjs`
- **MDX** — voor content-rijke pagina's (cases, blog, kennisbank)
- **Sitemap** auto-gegenereerd

## Quickstart

```bash
npm install
npm run dev    # http://localhost:4321
npm run build  # → dist/
```

## Structuur

```
src/
├── layouts/Base.astro        # HTML-shell + nav/footer + SEO meta
├── components/               # Hero, Nav, Footer, UspGrid, etc.
├── pages/
│   ├── index.astro          # /
│   └── trust.astro          # /trust — Trust Centre
└── styles/global.css        # Tailwind base + componenten
```

## Deploy

Doel: **Cloudflare Pages** of **Vercel** (static export, geen runtime).
Demo/contact-forms POSTen naar `https://app.sindzo.nl/api/lead` zodat
leads direct in de CRM van de app belanden.
