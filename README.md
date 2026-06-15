# Chatriya Nadar Matriculation Higher Secondary School Website

A modern, professional, and production-ready school website built with Next.js, Supabase, and Cloudinary.

## Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion
- **Backend:** Supabase (PostgreSQL + Auth)
- **Images:** Cloudinary
- **Icons:** Lucide React
- **Toasts:** Sonner

## Features

### Public Website
- Responsive single-page layout with smooth scroll navigation
- Hero, About, Academics, Facilities, Gallery, Achievements, Admissions, and Contact sections
- Framer Motion animations (subtle and professional)
- SEO-optimized metadata
- Lazy-loaded images with Next.js Image component

### Admin Dashboard
- Secure login via Supabase Auth
- Sidebar navigation with protected routes
- Content management for all website sections
- Image upload to Cloudinary with direct URL storage in Supabase
- Clean card-based UI with form validation and toast notifications

## Project Structure

```
src/
  app/
    page.tsx              # Public homepage
    layout.tsx            # Root layout with fonts & metadata
    globals.css           # Tailwind v4 theme & custom colors
    admin/
      layout.tsx          # Admin layout with sidebar
      login/page.tsx      # Admin login
      dashboard/page.tsx  # Admin overview
      hero/page.tsx       # Manage hero section
      about/page.tsx      # Manage about section
      academics/page.tsx  # Manage academic levels
      facilities/page.tsx # Manage facilities
      gallery/page.tsx    # Manage gallery images
      achievements/page.tsx # Manage achievements
      announcements/page.tsx # Manage announcements
      contact/page.tsx    # Manage contact details
    api/upload/route.ts   # Cloudinary upload API
  components/
    public/               # Public website sections
    admin/                # Admin reusable components
  lib/
    data.ts               # Server-side data fetching
    supabase/             # Client & server Supabase clients
    cloudinary.ts         # Cloudinary SDK config
  types/
    index.ts              # TypeScript types
```

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## Database Setup

1. Create a new Supabase project.
2. Go to the SQL Editor and run the contents of `supabase-schema.sql`.
3. Enable Email provider in Authentication > Providers (no confirmation required for admin-only use).
4. Create an admin user manually via Supabase Auth dashboard or invite.

## Cloudinary Setup

1. Create a Cloudinary account.
2. Note your Cloud Name, API Key, and API Secret from the Dashboard.
3. Add these to your `.env.local`.

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site.
Open [http://localhost:3000/admin/login](http://localhost:3000/admin/login) for the admin panel.

## Deployment

### Hostinger VPS (recommended for self-hosting)

Public site and admin panel deploy together as one app. See **[deploy/DEPLOY.md](deploy/DEPLOY.md)** for the full guide.

Quick overview:

1. [VPS purchase checklist](deploy/VPS_PURCHASE_CHECKLIST.md) — buy Hostinger VPS
2. [Supabase setup](deploy/SUPABASE_SETUP.md) — required
3. Copy [`.env.example`](.env.example) → `.env.local` (Supabase keys; Cloudinary optional)
4. On VPS: `sudo bash deploy/full-vps-deploy.sh YOUR_VPS_IP`

From Windows: [deploy/FROM_WINDOWS.md](deploy/FROM_WINDOWS.md)

| Page | URL |
|------|-----|
| Public website | `http://YOUR_VPS_IP/` |
| Admin login | `http://YOUR_VPS_IP/admin/login` |

### Vercel (alternative)
1. Push your code to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Add all environment variables from `.env.local` in Project Settings > Environment Variables.
4. Deploy.

### Supabase (Backend)
Already hosted on Supabase. Ensure Row Level Security policies are active and your project URL + anon key are configured in Vercel env vars.

### Cloudinary (Images)
Already hosted on Cloudinary. Images are uploaded to the `school-website` folder.

## Row Level Security

All content tables have RLS enabled:
- **Public read:** Anyone can read (for the website)
- **Admin write:** Only authenticated users can write (protected by middleware)

## License

Proprietary - Chatriya Nadar Matriculation Higher Secondary School
