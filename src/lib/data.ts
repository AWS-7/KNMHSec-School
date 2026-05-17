import { createClient } from "@/lib/supabase/server";
import type {
  HeroSection,
  AboutSection,
  AcademicLevel,
  Facility,
  GalleryImage,
  Achievement,
  Announcement,
  NoticeBoard,
  ContactDetails,
} from "@/types";

export async function getHeroSection(): Promise<HeroSection | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("hero_section")
      .select("*")
      .maybeSingle();
    return data;
  } catch {
    return null;
  }
}

export async function getAboutSection(): Promise<AboutSection | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("about_section")
      .select("*")
      .maybeSingle();
    return data;
  } catch {
    return null;
  }
}

export async function getAcademicLevels(): Promise<AcademicLevel[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("academics")
      .select("*")
      .order("order_index", { ascending: true });
    return data || [];
  } catch {
    return [];
  }
}

export async function getFacilities(): Promise<Facility[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("facilities")
      .select("*")
      .order("order_index", { ascending: true });
    return data || [];
  } catch {
    return [];
  }
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("gallery_images")
      .select("*")
      .order("order_index", { ascending: true });
    return data || [];
  } catch {
    return [];
  }
}

export async function getAchievements(): Promise<Achievement[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("achievements")
      .select("*")
      .order("order_index", { ascending: true });
    return data || [];
  } catch {
    return [];
  }
}

export async function getAnnouncements(): Promise<Announcement[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("announcements")
      .select("*")
      .eq("is_active", true)
      .order("priority", { ascending: false })
      .order("created_at", { ascending: false });
    return data || [];
  } catch {
    return [];
  }
}

export async function getNotices(): Promise<NoticeBoard[]> {
  try {
    const supabase = await createClient();
    const today = new Date().toISOString().split("T")[0];
    const { data } = await supabase
      .from("notice_board")
      .select("*")
      .or(`expiry_date.is.null,expiry_date.gte.${today}`)
      .order("is_important", { ascending: false })
      .order("created_at", { ascending: false });
    return data || [];
  } catch {
    return [];
  }
}

export async function getContactDetails(): Promise<ContactDetails | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("contact_details")
      .select("*")
      .maybeSingle();
    return data;
  } catch {
    return null;
  }
}
