#!/usr/bin/env bash
# Plesk Git deployment hook. Pad in Plesk:
#   Websites & Domeinen → sindzo.nl → Git → "Acties uitvoeren na deployment":
#     bash deploy/post-deploy.sh
#
# Defensief geschreven: Plesk's deploy-shell heeft soms (vrijwel) lege PATH,
# dus we (a) zetten PATH expliciet met alle gangbare Linux-locaties + Plesk
# node-paden, en (b) gebruiken bash-builtins i.p.v. externe coreutils waar
# mogelijk (geen `dirname`, geen `du`, geen externe `find` om af te tellen).

# (1) Bullet-proof PATH — dek alle gangbare locaties op een Plesk-host.
export PATH="/opt/plesk/node/24/bin:/opt/plesk/node/22/bin:/opt/plesk/node/20/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:${PATH:-}"

# (2) Strict mode pas NA path-setup zodat een onset $PATH ons niet meteen kelderen.
set -euo pipefail

# (3) Naar project-root. Plesk's default deploy-action draait vanuit
#     <deploy-dir> en doet `bash deploy/post-deploy.sh`, dus we zijn vaak
#     al goed. Anders één map omhoog vanaf script-locatie.
if [ ! -f package.json ]; then
    # Bash parameter expansion ${var%/*} = `dirname` zonder externe call.
    SCRIPT_DIR="${BASH_SOURCE[0]%/*}"
    [ "$SCRIPT_DIR" = "${BASH_SOURCE[0]}" ] && SCRIPT_DIR="."
    cd "$SCRIPT_DIR/.." 2>/dev/null || true
fi

if [ ! -f package.json ]; then
    echo "✗ FOUT: package.json niet gevonden in $(pwd)"
    exit 1
fi

echo "▶ Working dir : $(pwd)"
echo "▶ PATH        : $PATH"
echo "▶ Node        : $(command -v node || echo 'NOT FOUND')  $(node --version 2>/dev/null || true)"
echo "▶ npm         : $(command -v npm  || echo 'NOT FOUND')  $(npm  --version 2>/dev/null || true)"

if ! command -v npm >/dev/null 2>&1; then
    echo "✗ FOUT: npm niet gevonden in PATH."
    echo "        Check in Plesk welke node-versie geselecteerd is en pas indien"
    echo "        nodig de export op regel 14 van dit script aan."
    exit 1
fi

# (4) Reproduceerbaar installeren als lockfile bestaat.
if [ -f package-lock.json ]; then
    echo "▶ npm ci (lockfile-aware)..."
    npm ci --no-audit --no-fund
else
    echo "▶ npm install..."
    npm install --no-audit --no-fund
fi

echo "▶ Bouwen (astro build)..."
npm run build

# (5) Sanity-check: dist/index.html moet bestaan.
if [ ! -f dist/index.html ]; then
    echo "✗ FOUT: dist/index.html ontbreekt na build."
    exit 1
fi

echo "✓ Build OK — dist/ klaar voor serving"
echo "  Plesk document-root moet wijzen naar: $(pwd)/dist"
