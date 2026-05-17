export interface HeroSection {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  cta_primary: string;
  cta_secondary: string;
  banner_image_url: string;
  created_at?: string;
  updated_at?: string;
}

export interface AboutSection {
  id: string;
  history: string;
  mission: string;
  vision: string;
  principal_name: string;
  principal_message: string;
  principal_image_url: string;
  created_at?: string;
  updated_at?: string;
}

export interface AcademicLevel {
  id: string;
  title: string;
  description: string;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface Facility {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  year: string;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ContactDetails {
  id: string;
  address: string;
  phone: string;
  email: string;
  map_embed_url: string;
  created_at?: string;
  updated_at?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: string;
  created_at?: string;
}
