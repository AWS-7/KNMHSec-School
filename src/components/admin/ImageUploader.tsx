"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUploader({ value, onChange, label = "Image" }: Props) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      toast.error("Only JPG, PNG, WebP, and GIF files are allowed");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        onChange(data.url);
        const sizeKB = data.bytes ? Math.round(data.bytes / 1024) : "?";
        toast.success(`Image uploaded & optimized (${sizeKB} KB, ${data.format?.toUpperCase() || "auto"})`);
      } else {
        toast.error(data.error || "Upload failed");
      }
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-2">{label}</label>
      {value ? (
        <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-lg border border-border bg-muted">
          <Image src={value} alt="Preview" fill className="object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white hover:bg-black/70"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex h-40 w-full max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted text-muted-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
        >
          {uploading ? (
            <Loader2 className="h-8 w-8 animate-spin" />
          ) : (
            <>
              <Upload className="h-8 w-8 mb-2" />
              <span className="text-sm font-medium">Click to upload</span>
              <span className="text-xs">PNG, JPG up to 5MB</span>
            </>
          )}
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
