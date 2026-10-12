import { Metadata } from "next";
import { AdminRouteGuard } from "@/components/admin/AdminRouteGuard";
import { AdminUsersContent } from "@/components/admin/AdminUsersContent";

export const metadata: Metadata = {
  title: "Admin User Management | Next Job Track",
  description: "Manage registered users, moderate accounts, roles, and export CSV.",
};

export default function AdminUsersPage() {
  return (
    <AdminRouteGuard>
      <AdminUsersContent />
    </AdminRouteGuard>
  );
}
