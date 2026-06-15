#!/usr/bin/env node
/**
 * Validates environment variables before deploy.
 * Supabase is required. Cloudinary is optional (text-only deploy).
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const envPath = path.join(root, ".env.local");

if (!fs.existsSync(envPath)) {
  console.error("Missing .env.local — copy from .env.example and add Supabase keys.");
  process.exit(1);
}

const content = fs.readFileSync(envPath, "utf8");
for (const line of content.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eq = trimmed.indexOf("=");
  if (eq === -1) continue;
  const key = trimmed.slice(0, eq).trim();
  let value = trimmed.slice(eq + 1).trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }
  if (!process.env[key]) process.env[key] = value;
}

const required = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
];

const cloudinaryKeys = [
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

const placeholders = ["your-", "placeholder", "xxxxx", "example"];
let ok = true;

function isPlaceholder(value) {
  const lower = value.toLowerCase();
  return placeholders.some((p) => lower.includes(p));
}

function isValidSupabaseUrl(url) {
  return /^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(url);
}

for (const key of required) {
  const value = process.env[key];
  if (!value) {
    console.error(`Missing: ${key}`);
    ok = false;
    continue;
  }
  if (isPlaceholder(value)) {
    console.error(`${key} still has placeholder value — update .env.local`);
    ok = false;
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (supabaseUrl && !isPlaceholder(supabaseUrl) && !isValidSupabaseUrl(supabaseUrl)) {
  console.warn(
    "Warning: NEXT_PUBLIC_SUPABASE_URL does not look like a Supabase project URL."
  );
}

const cloudinaryValues = cloudinaryKeys.map((key) => process.env[key] || "");
const cloudinaryConfigured = cloudinaryValues.every(
  (value) => value && !isPlaceholder(value)
);
const cloudinaryPartial = cloudinaryValues.some((value) => value);

if (cloudinaryPartial && !cloudinaryConfigured) {
  console.warn(
    "Warning: Cloudinary vars are incomplete — image upload will not work until all three are set."
  );
}

if (!cloudinaryConfigured) {
  console.warn(
    "Cloudinary not configured — text-only deploy OK; admin image upload disabled."
  );
}

if (!ok) process.exit(1);
console.log("Environment variables OK (Supabase ready for deploy).");
