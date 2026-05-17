import AdminListPage from "@/components/admin/AdminListPage";

export default function AchievementsPage() {
  return (
    <AdminListPage
      table="achievements"
      title="Achievements"
      description="Add and manage student and school achievements."
      fields={[
        { key: "title", label: "Title", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "category", label: "Category", type: "select", options: ["Academic", "Sports", "Institution"] },
        { key: "year", label: "Year", type: "text" },
        { key: "order_index", label: "Order", type: "number" },
      ]}
      defaultValues={{ title: "", description: "", category: "Academic", year: "2024", order_index: 0 }}
    />
  );
}
