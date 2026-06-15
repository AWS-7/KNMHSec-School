# Hostinger VPS Deployment Guide

Deploy the school website (public + admin) on a single Hostinger VPS. Both `/` and `/admin/*` run from one Next.js app and connect through Supabase.

## Architecture

```
Browser → Nginx (port 80) → Next.js PM2 (port 3000)
                                ├── /           public site (reads Supabase)
                                └── /admin/*    admin panel (writes Supabase)
Supabase (cloud) ← shared database
Cloudinary (cloud) ← image uploads via /api/upload
```

## Prerequisites

Complete these **before** VPS deploy:

1. [Supabase setup](SUPABASE_SETUP.md) — schema, admin user, API keys (required)
2. [VPS purchase checklist](VPS_PURCHASE_CHECKLIST.md) — buy Hostinger VPS, note IP + SSH
3. `.env.local` with Supabase keys (copy from [`.env.example`](../.env.example))
4. [Cloudinary setup](CLOUDINARY_SETUP.md) — optional; skip if text-only (no image upload)

## Step 1 — Buy and access VPS

- Hostinger **KVM VPS**, minimum **2 GB RAM**
- OS: **Ubuntu 22.04** or **24.04**
- Note the **VPS IP address**
- SSH: `ssh root@YOUR_VPS_IP`

## Step 2 — One-time server setup

On the VPS as root:

```bash
cd /var/www
git clone YOUR_GITHUB_REPO_URL knmh-school
cd knmh-school
bash deploy/setup-vps.sh
```

Or upload the project with WinSCP/FileZilla to `/var/www/knmh-school`, then run `setup-vps.sh`.

## Step 3 — Environment file

On the VPS:

```bash
cd /var/www/knmh-school
cp .env.example .env.local
nano .env.local   # paste Supabase + Cloudinary values
```

Add optional verify URL:

```env
SITE_URL=http://YOUR_VPS_IP
```

## Step 4 — Build and start app

```bash
cd /var/www/knmh-school
node deploy/check-env.js   # Supabase required; Cloudinary optional
bash deploy/deploy.sh
```

Or one-shot (setup + deploy + nginx + verify):

```bash
sudo bash deploy/full-vps-deploy.sh YOUR_VPS_IP
```

This runs `npm run build`, prepares the standalone bundle, and starts PM2 as `knmh-school`.

## Step 5 — Nginx reverse proxy

```bash
sudo bash deploy/install-nginx.sh YOUR_VPS_IP
```

When you add a domain later:

```bash
sudo bash deploy/install-nginx.sh yourschool.com
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourschool.com
```

## Step 6 — Verify deployment

```bash
SITE_URL=http://YOUR_VPS_IP bash deploy/verify-deployment.sh
```

### Manual admin ↔ public test

1. `http://YOUR_VPS_IP/admin/login` — log in with Supabase admin user
2. Edit **Hero** section (change title)
3. Open `http://YOUR_VPS_IP/` — confirm title updated
4. Image upload — only if Cloudinary is configured in `.env.local`

## URLs

| Page | URL |
|------|-----|
| Public website | `http://YOUR_VPS_IP/` |
| Admin login | `http://YOUR_VPS_IP/admin/login` |
| Admin dashboard | `http://YOUR_VPS_IP/admin/dashboard` |

## Useful commands

```bash
pm2 status
pm2 logs knmh-school
pm2 restart knmh-school

# After code or env changes
cd /var/www/knmh-school && git pull && bash deploy/deploy.sh
```

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Admin login fails | Create user in Supabase Auth; enable Email provider |
| Public site empty | Run `deploy/supabase-seed.sql` or add content in admin |
| Image upload fails | Check `CLOUDINARY_*` in `.env.local`, then `bash deploy/deploy.sh` |
| 502 Bad Gateway | `pm2 status` — ensure `knmh-school` is online |
| Env change not applied | Rebuild: `bash deploy/deploy.sh` (`NEXT_PUBLIC_*` needs rebuild) |

## Files in this folder

| File | Purpose |
|------|---------|
| `setup-vps.sh` | Install Node.js, nginx, PM2, firewall |
| `deploy.sh` | Build standalone app and start PM2 |
| `install-nginx.sh` | Configure nginx reverse proxy |
| `nginx.conf` | Nginx site template |
| `check-env.js` | Validate `.env.local` before build |
| `verify-deployment.sh` | HTTP smoke tests after deploy |
| `full-vps-deploy.sh` | One-shot setup + deploy + nginx + verify |
| `VPS_PURCHASE_CHECKLIST.md` | Hostinger VPS purchase steps |
| `SUPABASE_SETUP.md` | Database + admin auth setup |
| `CLOUDINARY_SETUP.md` | Image hosting setup |
| `supabase-seed.sql` | Optional starter content |
