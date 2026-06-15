#!/usr/bin/env bash
# Build and start the Next.js app with PM2 (standalone output)
# Run from project root on the VPS:
#   bash deploy/deploy.sh

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [[ ! -f ".env.local" ]]; then
  echo "Missing .env.local — copy from .env.example and add your credentials."
  exit 1
fi

echo "==> Checking environment variables..."
node deploy/check-env.js

echo "==> Installing dependencies..."
npm ci 2>/dev/null || npm install

echo "==> Building production app..."
npm run build

echo "==> Preparing standalone bundle..."
mkdir -p .next/standalone/.next
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public
mkdir -p logs

echo "==> Starting with PM2..."
if pm2 describe knmh-school &>/dev/null; then
  pm2 restart ecosystem.config.js --update-env
else
  pm2 start ecosystem.config.js
fi

pm2 save

if command -v pm2 &>/dev/null; then
  pm2 startup systemd -u "${SUDO_USER:-root}" --hp "$(eval echo ~"${SUDO_USER:-root}")" 2>/dev/null || \
    echo "Tip: run 'pm2 startup' and execute the printed command for auto-restart on reboot."
fi

echo ""
echo "App running at http://127.0.0.1:3000"
echo "Configure nginx: bash deploy/install-nginx.sh YOUR_VPS_IP"
