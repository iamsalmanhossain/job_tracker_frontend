"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { ShieldAlert, Loader2 } from "lucide-react";

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

export function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if user is authenticated and is an ADMIN
    if (!isAuthenticated) {
      router.replace("/auth/admin/login");
      return;
    }

    if (user && user.role !== "ADMIN") {
      router.replace("/dashboard");
      return;
    }

    setIsChecking(false);
  }, [user, isAuthenticated, router]);

  if (isChecking) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 rounded-2xl bg-[#1C3627]/10 dark:bg-[#A3B18A]/10 border border-[#1C3627]/20 flex items-center justify-center text-[#1C3627] dark:text-[#A3B18A] mb-4 animate-pulse">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <p className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-[#1C3627] dark:text-[#A3B18A]" />
          Verifying administrative authorization...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
