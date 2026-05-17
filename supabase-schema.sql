-- ============================================================
-- Chatriya Nadar Matriculation HSS - Supabase Schema
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- HERO SECTION (single row)
-- ============================================================
CREATE TABLE IF NOT EXISTS hero_section (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL DEFAULT 'Chatriya Nadar Matriculation Higher Secondary School',
  subtitle TEXT NOT NULL DEFAULT 'Nurturing young minds with quality education.',
  tagline TEXT NOT NULL DEFAULT 'Excellence in Education, Character, and Service',
  cta_primary TEXT NOT NULL DEFAULT 'Explore Campus',
  cta_secondary TEXT NOT NULL DEFAULT 'Contact School',
  banner_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE hero_section ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON hero_section
  FOR SELECT USING (true);

CREATE POLICY "Allow admin write" ON hero_section
  FOR ALL USING (
    EXISTS (SELECT 1 FROM auth.users WHERE auth.users.id = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM auth.users WHERE auth.users.id = auth.uid())
  );

-- ============================================================
-- ABOUT SECTION (single row)
-- ============================================================
CREATE TABLE IF NOT EXISTS about_section (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  history TEXT NOT NULL DEFAULT '',
  mission TEXT NOT NULL DEFAULT '',
  vision TEXT NOT NULL DEFAULT '',
  principal_name TEXT NOT NULL DEFAULT 'Principal',
  principal_message TEXT NOT NULL DEFAULT '',
  principal_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE about_section ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON about_section
  FOR SELECT USING (true);

CREATE POLICY "Allow admin write" ON about_section
  FOR ALL USING (
    EXISTS (SELECT 1 FROM auth.users WHERE auth.users.id = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM auth.users WHERE auth.users.id = auth.uid())
  );

-- ============================================================
-- ACADEMICS
-- ============================================================
CREATE TABLE IF NOT EXISTS academics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE academics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON academics
  FOR SELECT USING (true);

CREATE POLICY "Allow admin write" ON academics
  FOR ALL USING (
    EXISTS (SELECT 1 FROM auth.users WHERE auth.users.id = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM auth.users WHERE auth.users.id = auth.uid())
  );

-- ============================================================
-- FACILITIES
-- ============================================================
CREATE TABLE IF NOT EXISTS facilities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL DEFAULT 'Monitor',
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON facilities
  FOR SELECT USING (true);

CREATE POLICY "Allow admin write" ON facilities
  FOR ALL USING (
    EXISTS (SELECT 1 FROM auth.users WHERE auth.users.id = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM auth.users WHERE auth.users.id = auth.uid())
  );

-- ============================================================
-- GALLERY IMAGES
-- ============================================================
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON gallery_images
  FOR SELECT USING (true);

CREATE POLICY "Allow admin write" ON gallery_images
  FOR ALL USING (
    EXISTS (SELECT 1 FROM auth.users WHERE auth.users.id = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM auth.users WHERE auth.users.id = auth.uid())
  );

-- ============================================================
-- ACHIEVEMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Academic',
  year TEXT NOT NULL DEFAULT '2024',
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON achievements
  FOR SELECT USING (true);

CREATE POLICY "Allow admin write" ON achievements
  FOR ALL USING (
    EXISTS (SELECT 1 FROM auth.users WHERE auth.users.id = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM auth.users WHERE auth.users.id = auth.uid())
  );

-- ============================================================
-- ANNOUNCEMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON announcements
  FOR SELECT USING (true);

CREATE POLICY "Allow admin write" ON announcements
  FOR ALL USING (
    EXISTS (SELECT 1 FROM auth.users WHERE auth.users.id = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM auth.users WHERE auth.users.id = auth.uid())
  );

-- ============================================================
-- CONTACT DETAILS (single row)
-- ============================================================
CREATE TABLE IF NOT EXISTS contact_details (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  address TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  map_embed_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contact_details ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON contact_details
  FOR SELECT USING (true);

CREATE POLICY "Allow admin write" ON contact_details
  FOR ALL USING (
    EXISTS (SELECT 1 FROM auth.users WHERE auth.users.id = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM auth.users WHERE auth.users.id = auth.uid())
  );
