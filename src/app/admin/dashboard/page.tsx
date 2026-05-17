import Link from "next/link";
import {
  Image as ImageIcon,
  Info,
  GraduationCap,
  Building2,
  Trophy,
  Megaphone,
  Phone,
} from "lucide-react";

const cards = [
  { href: "/admin/hero", label: "Hero Section", icon: ImageIcon, desc: "Manage banner, tagline, and CTAs" },
  { href: "/admin/about", label: "About", icon: Info, desc: "Update history, mission, and vision" },
  { href: "/admin/academics", label: "Academics", icon: GraduationCap, desc: "Manage classes and descriptions" },
  { href: "/admin/facilities", label: "Facilities", icon: Building2, desc: "Update facility listings" },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon, desc: "Upload and manage photos" },
  { href: "/admin/achievements", label: "Achievements", icon: Trophy, desc: "Add student and school awards" },
  { href: "/admin/announcements", label: "Announcements", icon: Megaphone, desc: "Post news and updates" },
  { href: "/admin/contact", label: "Contact", icon: Phone, desc: "Update address and map" },
];

export default function DashboardPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Dashboard</h1>
      <p className="text-muted-foreground mb-8">
        Manage your school website content from one place.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-secondary/50 hover:shadow-sm"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-secondary/10 group-hover:text-secondary transition-colors">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
                {card.label}
              </h3>
              <p className="text-sm text-muted-foreground">{card.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
