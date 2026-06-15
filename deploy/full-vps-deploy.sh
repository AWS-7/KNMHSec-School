#!/usr/bin/env bash
# Full one-shot deploy on VPS (run as root after code + .env.local are in place)
# Usage: sudo bash deploy/full-vps-deploy.sh YOUR_VPS_IP

set -euo pipefail

VPS_IP="${1:-}"
if [[ -z "$VPS_IP" ]]; then
  echo "Usage: sudo bash deploy/full-vps-deploy.sh YOUR_VPS_IP"
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [[ ! -f ".env.local" ]]; then
  echo "Missing .env.local — add Supabase keys before deploy."
  exit 1
fi

if ! grep -q "^SITE_URL=" .env.local 2>/dev/null; then
  echo "SITE_URL=http://${VPS_IP}" >> .env.local
fi

echo "==> Step 1/4: VPS packages (Node, nginx, PM2)..."
bash deploy/setup-vps.sh

echo "==> Step 2/4: Build and start app..."
bash deploy/deploy.sh

echo "==> Step 3/4: Nginx reverse proxy..."
bash deploy/install-nginx.sh "$VPS_IP"

echo "==> Step 4/4: Verify deployment..."
SITE_URL="http://${VPS_IP}" bash deploy/verify-deployment.sh

echo ""
echo "Deploy complete."
echo "  Public:  http://${VPS_IP}/"
echo "  Admin:   http://${VPS_IP}/admin/login"
