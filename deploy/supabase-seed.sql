-- Optional seed data for KNMH School website
-- Run in Supabase SQL Editor AFTER supabase-schema.sql

INSERT INTO hero_section (title, subtitle, tagline)
SELECT
  'Chatriya Nadar Matriculation Higher Secondary School',
  'Nurturing young minds with quality education.',
  'Excellence in Education, Character, and Service'
WHERE NOT EXISTS (SELECT 1 FROM hero_section LIMIT 1);

INSERT INTO about_section (history, mission, vision, principal_name, principal_message)
SELECT
  'Our school has been serving the community with dedication and excellence.',
  'To provide quality education that develops character, knowledge, and skills.',
  'To be a leading institution nurturing future-ready citizens.',
  'Principal',
  'Welcome to our school. We are committed to holistic development of every student.'
WHERE NOT EXISTS (SELECT 1 FROM about_section LIMIT 1);

INSERT INTO contact_details (address, phone, email)
SELECT
  'School Address, City, Tamil Nadu',
  '+91 XXXXXXXXXX',
  'info@school.edu'
WHERE NOT EXISTS (SELECT 1 FROM contact_details LIMIT 1);
