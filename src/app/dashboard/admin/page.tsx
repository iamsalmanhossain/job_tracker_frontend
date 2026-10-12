import { Metadata } from "next";
import { AdminRouteGuard } from "@/components/admin/AdminRouteGuard";
import { AdminDashboardOverview } from "@/components/admin/AdminDashboardOverview";

export const metadata: Metadata = {
  title: "Admin Dashboard | Next Job Track",
  description: "Global platform intelligence, user management, and operational controls.",
};

export default function AdminDashboardPage() {
  return (
    <AdminRouteGuard>
      <AdminDashboardOverview />
    </AdminRouteGuard>
  );
}
