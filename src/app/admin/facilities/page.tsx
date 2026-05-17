import AdminListPage from "@/components/admin/AdminListPage";

export default function FacilitiesPage() {
  return (
    <AdminListPage
      table="facilities"
      title="Facilities"
      description="Update facility listings and icons."
      fields={[
        { key: "title", label: "Title", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "icon_name", label: "Icon Name", type: "text" },
        { key: "order_index", label: "Order", type: "number" },
      ]}
      defaultValues={{ title: "", description: "", icon_name: "Monitor", order_index: 0 }}
    />
  );
}
