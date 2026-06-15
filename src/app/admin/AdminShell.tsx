"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  if (isLogin) {
    return <div className="min-h-full bg-muted">{children}</div>;
  }

  return (
    <div className="min-h-full bg-muted">
      <AdminSidebar />
      <div className="md:pl-64">
        <main className="p-6 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
