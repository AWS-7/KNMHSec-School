import AdminListPage from "@/components/admin/AdminListPage";

export default function AnnouncementsPage() {
  return (
    <AdminListPage
      table="announcements"
      title="Announcements"
      description="Post news and updates for the school community."
      fields={[
        { key: "title", label: "Title", type: "text" },
        { key: "content", label: "Content", type: "textarea" },
        { key: "priority", label: "Priority", type: "select", options: ["High", "Medium", "Low"] },
        { key: "is_active", label: "Status", type: "select", options: ["true", "false"] },
      ]}
      defaultValues={{ title: "", content: "", priority: "Medium", is_active: "true" }}
    />
  );
}
