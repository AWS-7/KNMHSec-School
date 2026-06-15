# Hostinger VPS Purchase Checklist

Complete this before running deploy on the server.

## What to buy

| Item | Recommendation |
|------|----------------|
| Product | Hostinger **KVM VPS** |
| RAM | Minimum **2 GB** |
| OS | **Ubuntu 22.04** or **24.04** |
| Location | India / Singapore (low latency) |

## After purchase — save these

Write down in a safe place (do not commit to git):

- [ ] **VPS IP address** (e.g. `203.0.113.10`)
- [ ] **SSH username** (usually `root`)
- [ ] **SSH password** (from Hostinger panel) or SSH private key

## Hostinger panel steps

1. Log in to [hostinger.com](https://www.hostinger.com)
2. Open **VPS** → your server
3. Copy **IP address**
4. Open **SSH access** → note root password or add SSH key
5. Ensure OS is Ubuntu 22.04/24.04 (reinstall if needed)

## Test SSH from your PC

Windows PowerShell:

```powershell
ssh root@YOUR_VPS_IP
```

First connection may ask to trust fingerprint — type `yes`.

## Next step

Once SSH works, follow [DEPLOY.md](DEPLOY.md) or run on the VPS:

```bash
cd /var/www/knmh-school
bash deploy/setup-vps.sh
bash deploy/deploy.sh
sudo bash deploy/install-nginx.sh YOUR_VPS_IP
SITE_URL=http://YOUR_VPS_IP bash deploy/verify-deployment.sh
```

## What stays in the cloud (not on VPS)

- **Supabase** — database + admin login (already set up)
- **Cloudinary** — optional, only if you enable image upload later

The VPS only runs the Next.js website app (public + admin).
