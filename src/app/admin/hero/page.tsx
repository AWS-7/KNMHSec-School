import AdminSinglePage from "@/components/admin/AdminSinglePage";

export default function HeroPage() {
  return (
    <AdminSinglePage
      table="hero_section"
      title="Hero Section"
      description="Manage the homepage banner and call-to-action content."
      fields={[
        { key: "banner_image_url", label: "Banner Image", type: "image" },
        { key: "title", label: "Title", type: "text" },
        { key: "subtitle", label: "Subtitle", type: "text" },
        { key: "tagline", label: "Tagline", type: "text" },
        { key: "cta_primary", label: "Primary CTA Text", type: "text" },
        { key: "cta_secondary", label: "Secondary CTA Text", type: "text" },
      ]}
    />
  );
}
