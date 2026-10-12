import { Metadata } from "next";
import { AdminRouteGuard } from "@/components/admin/AdminRouteGuard";
import { AdminCommunicationsContent } from "@/components/admin/AdminCommunicationsContent";

export const metadata: Metadata = {
  title: "Admin Communications & Announcements | Next Job Track",
  description: "Send in-app broadcast alerts and bulk email campaigns to platform users.",
};

export default function AdminCommunicationsPage() {
  return (
    <AdminRouteGuard>
      <AdminCommunicationsContent />
    </AdminRouteGuard>
  );
}
