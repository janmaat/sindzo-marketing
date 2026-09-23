# Deployment — Curanta marketingsite

De marketingsite is een **puur statische Astro-build**. Productie draait op
**Cloudflare Pages** — auto-build bij elke push naar `main`, gratis CDN, auto-HTTPS,
geen onderhoud op een server.

`app.curanta.nl` (de Curanta-applicatie) blijft op de eigen infrastructuur draaien —
dit document gaat alleen over de marketingsite (`curanta.nl`).

---

## Snelpad: Cloudflare Pages (productie)

### Vóór de eenmalige setup — twee dingen die nog niet kloppen

Op 2026-08-17 vastgesteld, en geen van beide kan een script voor je doen:

1. **De GitHub-repo heet nog `janmaat/sindzo-marketing`.** Dit document noemt
   hieronder `janmaat/curanta-marketing`; die bestaat nog niet. Hernoem de repo op
   GitHub (Settings → Repository name) en werk daarna je `origin` bij met
   `git remote set-url origin https://github.com/janmaat/curanta-marketing.git`.
   De map op schijf heet sinds 23-09-2026 `D:\Repos\Curanta.Marketing`;
   `D:\Repos\Sindzo.Marketing` is een junction ernaartoe, zodat oude paden blijven werken.
   Ook de Azure DevOps-repo (remote `azure`) heet nog `Sindzo.Marketing`: hernoem hem in
   Project settings → Repositories en werk de remote bij met
   `git remote set-url azure https://maat-software.visualstudio.com/Maat/_git/Curanta.Marketing`.
2. **`curanta.nl` serveert nu een Plesk-standaardpagina** en `www.curanta.nl` heeft
   geen geldig certificaat. Het domein wijst dus al naar de eigen server. Dat maakt
   stap 3 van "Custom domain" hieronder risicovoller dan hij klinkt — zie de
   waarschuwing daar.

### Eenmalige setup

1. **Cloudflare-account** aanmaken op <https://dash.cloudflare.com/sign-up>
   (gratis, e-mail volstaat).
2. **Workers & Pages → Create application → Pages → Connect to Git**.
3. **GitHub authoriseren** voor je Cloudflare-account; selecteer
   `janmaat/curanta-marketing`.
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
   `curanta-marketing.pages.dev`.

### Custom domain `curanta.nl` koppelen

1. In Cloudflare Pages-project → **Custom domains → Set up a custom domain** →
   `curanta.nl` (en optioneel `www.curanta.nl` met redirect).
2. Cloudflare toont **twee nameservers** (bv. `alice.ns.cloudflare.com`,
   `bob.ns.cloudflare.com`).
3. Bij je registrar (Strato of waar `curanta.nl` is geregistreerd): vervang
   de nameservers door de twee Cloudflare-nameservers.

   > **Doe eerst stap 5, dan pas stap 3.** Nameservers verplaatsen betekent dat
   > Cloudflare de héle zone overneemt. Elk record dat op dat moment nog niet in
   > Cloudflare staat, bestaat vanaf dat moment niet meer. Dat raakt niet alleen
   > `app`, `klant` en `medewerker`, maar ook **MX en SPF/DKIM/DMARC** — mail naar
   > `@curanta.nl` valt dan stil, en dat merk je pas als iemand niet antwoordt.
   >
   > Exporteer daarom eerst de bestaande zone bij de registrar (of noteer elk
   > record), zet ze allemaal in Cloudflare, en verzet de nameservers daarna.

4. DNS-propagatie: meestal binnen 5–30 minuten, soms tot 24 uur. Cloudflare
   regelt automatisch een HTTPS-certificaat zodra propagatie compleet is.
5. Records die mee moeten naar Cloudflare DNS voordat je de nameservers verzet:
   `app`, `klant` en `medewerker` als A-record naar het server-IP (proxy **uit** —
   Blazor Server heeft WebSockets nodig en de hosts vertrouwen `X-Forwarded-*`
   alleen van loopback), plus de volledige mailconfiguratie (MX, SPF, DKIM, DMARC).

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
