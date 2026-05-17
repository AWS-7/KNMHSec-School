import AdminListPage from "@/components/admin/AdminListPage";

export default function NoticesPage() {
  return (
    <AdminListPage
      table="notice_board"
      title="Notice Board"
      description="Manage school notices, circulars, and announcements."
      fields={[
        { key: "title", label: "Title", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "pdf_url", label: "PDF URL", type: "text" },
        { key: "is_important", label: "Important", type: "select", options: ["true", "false"] },
        { key: "expiry_date", label: "Expiry Date", type: "text" },
      ]}
      defaultValues={{ title: "", description: "", pdf_url: "", is_important: "false", expiry_date: "" }}
    />
  );
}
