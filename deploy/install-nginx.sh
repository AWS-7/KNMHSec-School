#!/usr/bin/env bash
# Install nginx site config for IP or domain
# Usage: sudo bash deploy/install-nginx.sh 203.0.113.10
#    or: sudo bash deploy/install-nginx.sh yourschool.com

set -euo pipefail

if [[ "${EUID:-0}" -ne 0 ]]; then
  echo "Run as root: sudo bash deploy/install-nginx.sh YOUR_VPS_IP"
  exit 1
fi

SERVER_NAME="${1:-}"
if [[ -z "$SERVER_NAME" ]]; then
  echo "Usage: sudo bash deploy/install-nginx.sh YOUR_VPS_IP_OR_DOMAIN"
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET="/etc/nginx/sites-available/knmh-school"

sed "s/YOUR_VPS_IP/${SERVER_NAME}/g" "$ROOT_DIR/deploy/nginx.conf" > "$TARGET"
ln -sf "$TARGET" /etc/nginx/sites-enabled/knmh-school

nginx -t
systemctl restart nginx
systemctl enable nginx

echo "Nginx configured for server_name: $SERVER_NAME"
echo "Public site:  http://${SERVER_NAME}/"
echo "Admin login:  http://${SERVER_NAME}/admin/login"
