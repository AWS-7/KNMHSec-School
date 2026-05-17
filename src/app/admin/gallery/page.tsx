import AdminListPage from "@/components/admin/AdminListPage";

export default function GalleryPage() {
  return (
    <AdminListPage
      table="gallery_images"
      title="Gallery"
      description="Upload and manage gallery photos."
      fields={[
        { key: "title", label: "Title", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "image_url", label: "Image", type: "image" },
        { key: "category", label: "Category", type: "text" },
        { key: "order_index", label: "Order", type: "number" },
      ]}
      defaultValues={{ title: "", description: "", image_url: "", category: "General", order_index: 0 }}
    />
  );
}
