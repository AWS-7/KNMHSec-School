import AdminSinglePage from "@/components/admin/AdminSinglePage";

export default function AboutPage() {
  return (
    <AdminSinglePage
      table="about_section"
      title="About Section"
      description="Update school history, mission, vision, and principal message."
      fields={[
        { key: "principal_image_url", label: "Principal / School Image", type: "image" },
        { key: "history", label: "History", type: "textarea" },
        { key: "mission", label: "Mission", type: "textarea" },
        { key: "vision", label: "Vision", type: "textarea" },
        { key: "principal_name", label: "Principal Name", type: "text" },
        { key: "principal_message", label: "Principal Message", type: "textarea" },
      ]}
    />
  );
}
