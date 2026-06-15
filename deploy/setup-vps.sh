#!/usr/bin/env bash
# One-time Hostinger VPS setup: Node.js 20, nginx, PM2, firewall
# Run as root on Ubuntu 22.04 / 24.04:
#   curl -fsSL https://raw.githubusercontent.com/YOUR_REPO/main/deploy/setup-vps.sh | bash
# Or after cloning:
#   sudo bash deploy/setup-vps.sh

set -euo pipefail

if [[ "${EUID:-0}" -ne 0 ]]; then
  echo "Run as root: sudo bash deploy/setup-vps.sh"
  exit 1
fi

echo "==> Updating system packages..."
apt update && apt upgrade -y

echo "==> Installing Node.js 20 LTS..."
if ! command -v node &>/dev/null || [[ "$(node -v | cut -d. -f1 | tr -d v)" -lt 20 ]]; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt install -y nodejs
fi

echo "==> Installing git, nginx, curl..."
apt install -y git nginx curl

echo "==> Installing PM2..."
npm install -g pm2

echo "==> Creating app directory..."
mkdir -p /var/www/knmh-school
mkdir -p /var/www/knmh-school/logs

echo "==> Configuring firewall..."
ufw allow OpenSSH || true
ufw allow 80/tcp || true
ufw allow 443/tcp || true
ufw --force enable || true

echo "==> Removing default nginx site..."
rm -f /etc/nginx/sites-enabled/default

echo ""
echo "VPS setup complete."
echo "Next steps:"
echo "  1. Clone or upload the project to /var/www/knmh-school"
echo "  2. Copy .env.local from .env.example and fill in credentials"
echo "  3. Run: cd /var/www/knmh-school && bash deploy/deploy.sh"
echo "  4. Run: bash deploy/install-nginx.sh YOUR_VPS_IP"
