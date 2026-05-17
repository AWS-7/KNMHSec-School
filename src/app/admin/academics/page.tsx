import AdminListPage from "@/components/admin/AdminListPage";

export default function AcademicsPage() {
  return (
    <AdminListPage
      table="academics"
      title="Academics"
      description="Manage academic levels and descriptions."
      fields={[
        { key: "title", label: "Title", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "order_index", label: "Order", type: "number" },
      ]}
      defaultValues={{ title: "", description: "", order_index: 0 }}
    />
  );
}
