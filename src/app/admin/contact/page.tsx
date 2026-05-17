import AdminSinglePage from "@/components/admin/AdminSinglePage";

export default function ContactPage() {
  return (
    <AdminSinglePage
      table="contact_details"
      title="Contact Details"
      description="Update school address, phone, email, and map embed."
      fields={[
        { key: "address", label: "Address", type: "textarea" },
        { key: "phone", label: "Phone", type: "text" },
        { key: "email", label: "Email", type: "text" },
        { key: "map_embed_url", label: "Map Embed URL", type: "text" },
      ]}
    />
  );
}
