"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import ImageUploader from "./ImageUploader";

interface FieldConfig {
  key: string;
  label: string;
  type: "text" | "textarea" | "image";
}

interface AdminSinglePageProps {
  table: string;
  title: string;
  description: string;
  fields: FieldConfig[];
}

export default function AdminSinglePage({
  table,
  title,
  description,
  fields,
}: AdminSinglePageProps) {
  const supabase = createClient();
  const [data, setData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { data: row } = await supabase
        .from(table)
        .select("*")
        .maybeSingle();
      setData(row || {});
      setLoading(false);
    }
    fetchData();
  }, [supabase, table]);

  const handleSave = async () => {
    setSaving(true);
    if (data.id) {
      const { error } = await supabase.from(table).update(data).eq("id", data.id);
      if (error) toast.error(error.message);
      else toast.success("Updated successfully");
    } else {
      const { error } = await supabase.from(table).insert(data);
      if (error) toast.error(error.message);
      else toast.success("Created successfully");
    }
    setSaving(false);
  };

  if (loading)
    return (
      <div className="flex justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold text-foreground mb-2">{title}</h1>
      <p className="text-muted-foreground mb-8">{description}</p>

      <div className="rounded-xl border border-border bg-card p-6 sm:p-8 space-y-5 max-w-3xl">
        {fields.map((field) => (
          <div key={field.key}>
            {field.type === "image" ? (
              <ImageUploader
                value={data[field.key] || ""}
                onChange={(url) => setData({ ...data, [field.key]: url })}
                label={field.label}
              />
            ) : field.type === "textarea" ? (
              <>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {field.label}
                </label>
                <textarea
                  rows={4}
                  value={data[field.key] || ""}
                  onChange={(e) =>
                    setData({ ...data, [field.key]: e.target.value })
                  }
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                />
              </>
            ) : (
              <>
                <label className="block text-sm font-medium text-foreground mb-1">
                  {field.label}
                </label>
                <input
                  type="text"
                  value={data[field.key] || ""}
                  onChange={(e) =>
                    setData({ ...data, [field.key]: e.target.value })
                  }
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </>
            )}
          </div>
        ))}
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          <Save className="h-4 w-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
}
