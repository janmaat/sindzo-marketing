#!/usr/bin/env bash
# Plesk Git deployment hook — wordt door Plesk uitgevoerd na elke
# git pull. Pad in Plesk:
#   Websites & Domeinen → sindzo.nl → Git → "Acties uitvoeren na deployment":
#     bash deploy/post-deploy.sh
#
# Vereisten op de Plesk-server:
#   - NodeJS-extensie geïnstalleerd
#   - Node 20+ geselecteerd in domein-instellingen
#   - npm in PATH voor de domein-gebruiker
#
# Document-root moet wijzen naar <deployment-dir>/dist/

# Plesk's deploy-shell heeft beperkte PATH; explicit Node-locatie toevoegen
# zodat npm/node vindbaar zijn. Pas /opt/plesk/node/24 aan op de versie die
# je in de Plesk NodeJS-extensie hebt geselecteerd.
export PATH=/opt/plesk/node/24/bin:/usr/local/bin:/usr/bin:/bin:$PATH

set -euo pipefail

cd "$(dirname "$0")/.."
echo "▶ Working dir: $(pwd)"
echo "▶ Node: $(node --version 2>/dev/null || echo 'NOT FOUND')"
echo "▶ npm:  $(npm --version 2>/dev/null || echo 'NOT FOUND')"

# Gebruik npm ci als lockfile bestaat (reproduceerbare install).
if [ -f package-lock.json ]; then
    echo "▶ npm ci (lockfile-aware)..."
    npm ci --no-audit --no-fund
else
    echo "▶ npm install..."
    npm install --no-audit --no-fund
fi

echo "▶ Bouwen (astro build)..."
npm run build

# Sanity-check: dist/index.html moet bestaan
if [ ! -f dist/index.html ]; then
    echo "✗ FOUT: dist/index.html ontbreekt na build."
    exit 1
fi

PAGES=$(find dist -name 'index.html' | wc -l)
SIZE=$(du -sh dist | cut -f1)
echo "✓ Build OK — $PAGES pagina's, $SIZE in dist/"
echo "  Plesk document-root moet wijzen naar: $(pwd)/dist"
