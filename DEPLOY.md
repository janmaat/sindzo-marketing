# Deployment — Sindzo marketingsite

De marketingsite is een **puur statische Astro-build**. Geen Node-runtime nodig
op de server; alleen `dist/` hoeft beschikbaar te zijn voor de webserver.

Doel-omgeving: **Plesk + nginx op Linux** (aanbevolen). Alternatief: IIS op
Windows — zie sectie onderaan.

---

## Snelpad: Plesk + Git-deploy

### 1. Pre-requisites in Plesk

- **NodeJS-extensie** geïnstalleerd (Plesk → Extensies → "Node.js")
- **Node 20+** beschikbaar via die extensie
- Domein/subscription aangemaakt voor `sindzo.nl`

### 2. Git-repository koppelen

In Plesk: **Websites & Domeinen → sindzo.nl → Git → Repository toevoegen**.

| Veld | Waarde |
|---|---|
| Repository-URL | `git@github.com:<org>/sindzo-marketing.git` (of HTTPS-URL) |
| Te volgen branch | `main` |
| Deployment-pad | `/httpdocs/sindzo-marketing` (bijv.) |
| Deployment-modus | Automatisch (webhook op push) |
| Acties uitvoeren na deployment | `bash deploy/post-deploy.sh` |

Plesk genereert na koppelen een SSH-public-key en een webhook-URL —
beide toevoegen in GitHub (deploy key + webhook).

### 3. Document-root verleggen naar dist/

In Plesk: **Hosting-instellingen → Document-root** →
`/httpdocs/sindzo-marketing/dist`

(`dist/` ontstaat zodra `post-deploy.sh` voor het eerst gedraaid heeft.)

### 4. nginx-snippet plakken

In Plesk: **Apache & nginx-instellingen → Aanvullende nginx-instructies**.
Kopieer de inhoud van [`deploy/nginx-plesk.conf`](deploy/nginx-plesk.conf).

Dit regelt:
- Extensionless URLs (`/trust` → `/trust/index.html`)
- Canonical-redirect van trailing slash
- Far-future caching voor `_astro/*` en fonts
- No-cache voor HTML
- gzip + brotli compressie
- Security headers (HSTS, X-Frame-Options, etc.)

### 5. HTTPS via Let's Encrypt

In Plesk: **SSL/TLS-certificaten → "Let's Encrypt installeren"**.
Aanvinken: hoofddomein + `www`. Auto-renewal staat default aan.

### 6. Eerste deploy triggeren

Druk in Plesk → Git op **"Deploy now"**. Watch de logs onder
"Display deployment log" — je ziet `npm ci → astro build → dist/ OK`.

### 7. Smoke-test

Verwacht status 200 voor alle:

```bash
for path in / /trust /prijzen /integraties /oplossing /voor/vvt /api; do
    code=$(curl -s -o /dev/null -w "%{http_code}" "https://sindzo.nl$path")
    echo "$code $path"
done
```

Daarna één deploy triggeren door een commit te pushen — Plesk neemt 'm
op binnen ~30s.

---

## Onderhoud

| Taak | Wat |
|---|---|
| Code-update | `git push origin main` → Plesk pakt het op |
| Node-versie verhogen | Plesk → NodeJS-extensie → Node-versie kiezen |
| Cache flushen na deploy | Niet nodig — HTML staat op no-cache, assets zijn fingerprinted |
| Cert-rotatie | Automatisch via Let's Encrypt |
| Logs bekijken | Plesk → Statistieken → Webserver-logs |

---

## Alternatief: IIS op Windows

Voor IIS is dezelfde `dist/`-output bruikbaar, maar de URL Rewrite Module
+ web.config-tuning is meer werk dan de Plesk-flow hierboven. Als het toch
de keuze wordt, schrijf ik een `public/web.config` met:

- URL Rewrite voor extensionless URLs
- MIME-mappings (`.webmanifest`, `.woff2`)
- Cache-control per pad (immutable voor `_astro/`, no-cache voor HTML)
- Static + dynamic compression
- HSTS + standaard security headers

Vraag dan om die `web.config` los te leveren.
