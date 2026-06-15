# Cloudinary Setup

Image uploads from the admin panel go to Cloudinary via `POST /api/upload`.

## 1. Create account

1. Go to [cloudinary.com](https://cloudinary.com) and sign up (free tier is enough for a school site).
2. Confirm your email and open the **Dashboard**.

## 2. Copy credentials

From **Dashboard** → **API Keys** (or Product environment credentials):

| Dashboard field | `.env.local` variable |
|-----------------|----------------------|
| Cloud name | `CLOUDINARY_CLOUD_NAME` |
| API Key | `CLOUDINARY_API_KEY` |
| API Secret | `CLOUDINARY_API_SECRET` |

Add to `.env.local`:

```env
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=your-api-secret
```

## 3. Verify locally (optional)

```bash
npm run dev
```

1. Open `http://localhost:3000/admin/login` and sign in.
2. Go to **Gallery** or **Hero** and upload an image.
3. If upload succeeds, the image URL is stored in Supabase and shown on the public site.

## 4. VPS note

`CLOUDINARY_*` variables are **server-only** (used by `/api/upload`). After changing them on the VPS, rebuild and restart:

```bash
bash deploy/deploy.sh
```

`NEXT_PUBLIC_*` Supabase vars are embedded at build time — rebuild after changing those too.
