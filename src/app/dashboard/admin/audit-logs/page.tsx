import { Metadata } from "next";
import { AdminRouteGuard } from "@/components/admin/AdminRouteGuard";
import { AdminAuditLogsContent } from "@/components/admin/AdminAuditLogsContent";

export const metadata: Metadata = {
  title: "Admin Security Audit Logs | Next Job Track",
  description: "View system audit trail, logins, status modifications, and security events.",
};

export default function AdminAuditLogsPage() {
  return (
    <AdminRouteGuard>
      <AdminAuditLogsContent />
    </AdminRouteGuard>
  );
}
