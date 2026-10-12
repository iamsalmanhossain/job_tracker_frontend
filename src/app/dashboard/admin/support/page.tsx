import { Metadata } from "next";
import { AdminRouteGuard } from "@/components/admin/AdminRouteGuard";
import { AdminSupportTicketsContent } from "@/components/userDashboard/support/AdminSupportTicketsContent";

export const metadata: Metadata = {
  title: "Admin Support Operations | Next Job Track",
  description: "Administrative panel for managing user support tickets.",
};

export default function AdminSupportTicketsPage() {
  return (
    <AdminRouteGuard>
      <AdminSupportTicketsContent />
    </AdminRouteGuard>
  );
}
