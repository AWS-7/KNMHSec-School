"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, Save } from "lucide-react";
import ImageUploader from "./ImageUploader";

interface FieldConfig {
  key: string;
  label: string;
  type: "text" | "textarea" | "number" | "select" | "image";
  options?: string[];
}

interface AdminListPageProps {
  table: string;
  title: string;
  description: string;
  fields: FieldConfig[];
  defaultValues: Record<string, string | number | boolean>;
}

export default function AdminListPage({
  table,
  title,
  description,
  fields,
  defaultValues,
}: AdminListPageProps) {
  const supabase = createClient();
  const [items, setItems] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from(table)
        .select("*")
        .order("order_index", { ascending: true });
      setItems(data || []);
      setLoading(false);
    }
    fetchData();
  }, [supabase, table]);

  const addItem = () => {
    setItems([
      ...items,
      { ...defaultValues, order_index: items.length + 1 },
    ]);
  };

  const updateItem = (index: number, key: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [key]: value };
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems.map((item, i) => ({ ...item, order_index: i + 1 })));
  };

  const handleSave = async () => {
    setSaving(true);
    const { error: delErr } = await supabase
      .from(table)
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");
    if (delErr) {
      toast.error(delErr.message);
      setSaving(false);
      return;
    }
    const toInsert = items.map((item) => {
      const { id, ...rest } = item;
      const cleaned: Record<string, any> = {};
      for (const [key, value] of Object.entries(rest)) {
        if (value === "true") cleaned[key] = true;
        else if (value === "false") cleaned[key] = false;
        else cleaned[key] = value;
      }
      return cleaned;
    });
    const { error: insErr } = await supabase.from(table).insert(toInsert);
    if (insErr) toast.error(insErr.message);
    else toast.success("Saved successfully");
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
      <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
        {title}
      </h1>
      <p className="text-muted-foreground mb-8">{description}</p>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">
                Item {index + 1}
              </span>
              <button
                onClick={() => removeItem(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map((field) => (
                <div key={field.key} className={field.type === "textarea" || field.type === "image" ? "sm:col-span-2" : ""}>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      rows={3}
                      value={item[field.key] || ""}
                      onChange={(e) =>
                        updateItem(index, field.key, e.target.value)
                      }
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                    />
                  ) : field.type === "select" ? (
                    <select
                      value={String(item[field.key] ?? "")}
                      onChange={(e) =>
                        updateItem(index, field.key, e.target.value)
                      }
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    >
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "image" ? (
                    <ImageUploader
                      value={item[field.key] || ""}
                      onChange={(url) => updateItem(index, field.key, url)}
                      label={field.label}
                    />
                  ) : (
                    <input
                      type={field.type === "number" ? "number" : "text"}
                      value={item[field.key] || ""}
                      onChange={(e) =>
                        updateItem(
                          index,
                          field.key,
                          field.type === "number"
                            ? parseInt(e.target.value) || 0
                            : e.target.value
                        )
                      }
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addItem}
        className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
      >
        <Plus className="h-4 w-4" /> Add Item
      </button>

      <div className="mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          <Save className="h-4 w-4" /> Save All Changes
        </button>
      </div>
    </div>
  );
}
