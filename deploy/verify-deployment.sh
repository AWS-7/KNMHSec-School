#!/usr/bin/env bash
# Post-deploy smoke test — public site + admin login page reachable
# Usage:
#   SITE_URL=http://YOUR_VPS_IP bash deploy/verify-deployment.sh

set -euo pipefail

SITE_URL="${SITE_URL:-}"
if [[ -z "$SITE_URL" ]]; then
  if [[ -f ".env.local" ]]; then
    SITE_URL="$(grep -E '^SITE_URL=' .env.local | cut -d= -f2- | tr -d '"' | tr -d "'")"
  fi
fi

if [[ -z "$SITE_URL" ]]; then
  echo "Set SITE_URL, e.g.: SITE_URL=http://203.0.113.10 bash deploy/verify-deployment.sh"
  exit 1
fi

SITE_URL="${SITE_URL%/}"
PASS=0
FAIL=0

check_url() {
  local path="$1"
  local label="$2"
  local code
  code="$(curl -s -o /dev/null -w "%{http_code}" "${SITE_URL}${path}" || echo "000")"
  if [[ "$code" == "200" || "$code" == "307" || "$code" == "308" ]]; then
    echo "[OK]   $label (${code}) — ${SITE_URL}${path}"
    PASS=$((PASS + 1))
  else
    echo "[FAIL] $label (${code}) — ${SITE_URL}${path}"
    FAIL=$((FAIL + 1))
  fi
}

echo "Verifying deployment at $SITE_URL"
echo ""

check_url "/" "/ public homepage"
check_url "/admin/login" "/admin/login admin login page"
check_url "/admin/dashboard" "/admin/dashboard (should redirect if not logged in)"

echo ""
if [[ "$FAIL" -gt 0 ]]; then
  echo "Verification failed: $FAIL check(s) failed."
  echo "Check: pm2 status | nginx -t | pm2 logs knmh-school"
  exit 1
fi

echo "All $PASS checks passed."
echo ""
echo "Manual admin ↔ public connection test:"
echo "  1. Open ${SITE_URL}/admin/login and sign in with your Supabase admin user"
echo "  2. Edit Hero section title in admin"
echo "  3. Refresh ${SITE_URL}/ and confirm the title updated"
echo "  4. Upload a gallery image and confirm it appears on the public site"
