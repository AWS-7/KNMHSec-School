"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password: trimmedPassword,
      });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Logged in successfully");
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch {
      // Fallback default admin for local development
      if (trimmedEmail === "admin@school.edu" && trimmedPassword === "admin123") {
        document.cookie = "admin-session=true; path=/; max-age=86400";
        toast.success("Logged in as default admin (dev mode)");
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        toast.error("Invalid credentials. Use: admin@school.edu / admin123");
      }
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-border bg-card p-6 sm:p-8 space-y-5 shadow-sm"
    >
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          placeholder="admin@school.edu"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          placeholder="••••••••"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        Sign In
      </button>
    </form>
  );
}
