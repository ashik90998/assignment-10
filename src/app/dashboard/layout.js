"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import { DashboardSidebarPage } from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) return null;
  if (!user) return null;

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <DashboardSidebarPage />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </ProtectedRoute>
  );
}
