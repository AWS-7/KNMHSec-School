# Supabase Setup

Admin panel and public website share one Supabase database. Complete these steps before deploying to VPS.

## 1. Create project

1. Go to [supabase.com](https://supabase.com) and sign up / log in.
2. **New project** → choose a name (e.g. `knmh-school`).
3. Set a strong database password and save it securely.
4. Region: **South Asia (Mumbai)** or **Southeast Asia (Singapore)** for lowest latency in India.

## 2. Run database schema

1. Open **SQL Editor** in the Supabase dashboard.
2. Copy the full contents of [`supabase-schema.sql`](../supabase-schema.sql) from this repo.
3. Paste and **Run**. This creates all tables and Row Level Security policies.

## 3. Seed starter content (optional but recommended)

Run [`deploy/supabase-seed.sql`](supabase-seed.sql) in the SQL Editor so the public site has initial hero/about/contact rows.

## 4. Enable email authentication

1. **Authentication** → **Providers** → **Email**
2. Enable Email provider.
3. For admin-only use, you can disable **Confirm email** so login works immediately.

## 5. Create admin user

1. **Authentication** → **Users** → **Add user** → **Create new user**
2. Email: e.g. `admin@yourschool.edu`
3. Password: use a strong password (not `admin123`)
4. Save the credentials — you will use them at `/admin/login` on the VPS.

> Production does **not** use the dev fallback (`admin@school.edu` / `admin123`). Only real Supabase users can edit content when env vars are configured.

## 6. Copy API keys to `.env.local`

1. **Project Settings** → **API**
2. Copy into `.env.local` (see [`.env.example`](../.env.example)):

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 7. Verify

From project root (with `.env.local` filled in):

```bash
node deploy/check-env.js
```

## How admin connects to public site

| Action | Where | Result |
|--------|-------|--------|
| Admin edits hero | `/admin/hero` | Writes to `hero_section` table |
| Visitor opens site | `/` | Reads same `hero_section` via `src/lib/data.ts` |

No extra wiring is needed — both routes use the same Supabase project URL and anon key.
