# Deploy from Windows (before VPS is configured)

Use this when you have **VPS IP + SSH password** but deploy from your Windows PC.

## 1. Buy VPS

Follow [VPS_PURCHASE_CHECKLIST.md](VPS_PURCHASE_CHECKLIST.md).

## 2. Prepare `.env.local`

Must have real Supabase values (not placeholders from `.env.example`):

```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

Validate locally:

```powershell
node deploy/check-env.js
```

## 3. Upload project to VPS

### Option A — Git (if repo is on GitHub)

SSH into VPS:

```powershell
ssh root@YOUR_VPS_IP
```

On VPS:

```bash
mkdir -p /var/www
cd /var/www
git clone YOUR_GITHUB_REPO_URL knmh-school
cd knmh-school
```

Copy `.env.local` from your PC using WinSCP or:

```powershell
scp .env.local root@YOUR_VPS_IP:/var/www/knmh-school/.env.local
```

### Option B — WinSCP / FileZilla

1. Connect: host = VPS IP, user = `root`, password from Hostinger
2. Upload entire project folder to `/var/www/knmh-school`
3. Ensure `.env.local` is included (hidden file)

## 4. Run full deploy on VPS

```powershell
ssh root@YOUR_VPS_IP
cd /var/www/knmh-school
sudo bash deploy/full-vps-deploy.sh YOUR_VPS_IP
```

## 5. Open in browser

- Public: `http://YOUR_VPS_IP/`
- Admin: `http://YOUR_VPS_IP/admin/login`

## PowerShell helper

From project root (replace IP):

```powershell
.\deploy\upload-env.ps1 -VpsIp YOUR_VPS_IP
```

Then SSH and run `full-vps-deploy.sh` as above.
