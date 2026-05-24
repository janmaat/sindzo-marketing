# Deployment — Sindzo marketingsite

De marketingsite is een **puur statische Astro-build**. Productie draait op
**Cloudflare Pages** — auto-build bij elke push naar `main`, gratis CDN, auto-HTTPS,
geen onderhoud op een server.

`app.sindzo.nl` (de Sindzo-applicatie) blijft op de eigen infrastructuur draaien —
dit document gaat alleen over de marketingsite (`sindzo.nl`).

---

## Snelpad: Cloudflare Pages (productie)

### Eenmalige setup

1. **Cloudflare-account** aanmaken op <https://dash.cloudflare.com/sign-up>
   (gratis, e-mail volstaat).
2. **Workers & Pages → Create application → Pages → Connect to Git**.
3. **GitHub authoriseren** voor je Cloudflare-account; selecteer
   `janmaat/sindzo-marketing`.
4. **Build-settings** invullen:

   | Veld | Waarde |
   | --- | --- |
   | Production branch | `main` |
   | Framework preset | Astro |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Root directory | _(leeg)_ |
   | Node version | `20` (gelezen uit `.node-version` in repo) |

5. **Save and Deploy**. Binnen ~2 minuten staat de site op
   `sindzo-marketing.pages.dev`.

### Custom domain `sindzo.nl` koppelen

1. In Cloudflare Pages-project → **Custom domains → Set up a custom domain** →
   `sindzo.nl` (en optioneel `www.sindzo.nl` met redirect).
2. Cloudflare toont **twee nameservers** (bv. `alice.ns.cloudflare.com`,
   `bob.ns.cloudflare.com`).
3. Bij je registrar (Strato of waar `sindzo.nl` is geregistreerd): vervang
   de nameservers door de twee Cloudflare-nameservers.
4. DNS-propagatie: meestal binnen 5–30 minuten, soms tot 24 uur. Cloudflare
   regelt automatisch een HTTPS-certificaat zodra propagatie compleet is.
5. `app.sindzo.nl` blijft als A-record naar het server-IP wijzen (apart record
   in Cloudflare DNS).

### Wat er automatisch gebeurt

- **Bij elke `git push origin main`**: Cloudflare detecteert via webhook,
  bouwt `npm ci && npm run build`, deployt `dist/` naar het CDN. Doorlooptijd
  meestal 1–2 minuten.
- **Pull request previews**: elke PR krijgt eigen preview-URL voor review.
- **Rollback**: één klik naar elke eerdere deploy in de Cloudflare-dashboard.

### Cache + headers via repo

- [`public/_headers`](public/_headers) — security-headers (HSTS, X-Frame-Options,
  Referrer-Policy) en cache-control per pad (`_astro/*` immutable, HTML
  no-cache).
- [`public/_redirects`](public/_redirects) — gereserveerd voor toekomstige
  URL-redirects. Astro's static output handelt extensionless URLs en
  trailing-slash al af.
- [`.node-version`](.node-version) — pint Node 20 in Cloudflare-build.

---

## Onderhoud

| Taak | Wat |
| --- | --- |
| Content-update | Wijziging + `git push origin main` → live binnen ~2 min |
| Build-failure | Cloudflare-dashboard → Deployments → bekijk build-log |
| Rollback | Eén klik op een eerdere deploy in dashboard |
| Cache flushen na deploy | Niet nodig — HTML is no-cache, assets fingerprinted |
| Cert-rotatie | Automatisch (Cloudflare beheert) |
| Node-versie verhogen | Wijzig `.node-version` en push |

---

## Alternatief: Plesk + Apache (fallback, niet aanbevolen)

Tijdens een eerste opzet is geprobeerd om de site via Plesk Git-deploy op
Strato te hosten. Dat werkte structureel niet (lege deploy-shell PATH,
clone-state-corruptie, hangende npm-installs op shared compute). De daarvoor
gemaakte artefacten zijn behouden als fallback voor toekomstige IIS-/Plesk-
scenarios:

- [`public/.htaccess`](public/.htaccess) — Apache-fallback met HTTPS-redirect,
  extensionless URLs, cache, compressie, security headers.
- [`deploy/nginx-plesk.conf`](deploy/nginx-plesk.conf) — nginx-snippet voor
  Plesk's "Aanvullende nginx-instructies".
- [`deploy/post-deploy.sh`](deploy/post-deploy.sh) — Git-deploy-script
  (bulletproof PATH, geen externe coreutils).

Voor productie gebruiken we Cloudflare Pages.
