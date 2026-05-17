import { createClient } from "@/lib/supabase/server";
import type {
  HeroSection,
  AboutSection,
  AcademicLevel,
  Facility,
  GalleryImage,
  Achievement,
  Announcement,
  ContactDetails,
} from "@/types";

export async function getHeroSection(): Promise<HeroSection | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("hero_section")
    .select("*")
    .maybeSingle();
  return data;
}

export async function getAboutSection(): Promise<AboutSection | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("about_section")
    .select("*")
    .maybeSingle();
  return data;
}

export async function getAcademicLevels(): Promise<AcademicLevel[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("academics")
    .select("*")
    .order("order_index", { ascending: true });
  return data || [];
}

export async function getFacilities(): Promise<Facility[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("facilities")
    .select("*")
    .order("order_index", { ascending: true });
  return data || [];
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("gallery_images")
    .select("*")
    .order("order_index", { ascending: true });
  return data || [];
}

export async function getAchievements(): Promise<Achievement[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("achievements")
    .select("*")
    .order("order_index", { ascending: true });
  return data || [];
}

export async function getAnnouncements(): Promise<Announcement[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("announcements")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });
  return data || [];
}

export async function getContactDetails(): Promise<ContactDetails | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("contact_details")
    .select("*")
    .maybeSingle();
  return data;
}
