import { api } from "@/lib/api";
import {
  AdminDashboardStats,
  AdminUsersQueryParams,
  AdminUsersResponse,
  AdminUserStatus,
  AdminUserRole,
  AdminSupportTicketsQueryParams,
  AdminAuditLogsQueryParams,
  AdminAuditLogsResponse,
  BroadcastNotificationDTO,
  BulkEmailDTO,
} from "@/types/admin.types";
import { SupportTicketsResponse, TicketStatus, SupportTicket } from "@/types/support-ticket.types";
import { SingleResponse } from "@/types/job-application.types";

export const AdminService = {
  /**
   * 1. Global Platform Statistics
   * GET /api/v1/admin/dashboard/stats
   */
  getDashboardStats: async (): Promise<SingleResponse<AdminDashboardStats>> => {
    return (await api.get("/admin/dashboard/stats")) as SingleResponse<AdminDashboardStats>;
  },

  /**
   * 2. User Management
   * GET /api/v1/admin/users
   */
  getUsers: async (params?: AdminUsersQueryParams): Promise<AdminUsersResponse> => {
    const query = new URLSearchParams();
    if (params?.page) query.append("page", String(params.page));
    if (params?.limit) query.append("limit", String(params.limit));
    if (params?.searchTerm) query.append("searchTerm", params.searchTerm);
    if (params?.status && params.status !== "ALL") query.append("status", params.status);
    if (params?.role && params.role !== "ALL") query.append("role", params.role);
    if (params?.isDeleted !== undefined) query.append("isDeleted", String(params.isDeleted));

    const queryString = query.toString() ? `?${query.toString()}` : "";
    return (await api.get(`/admin/users${queryString}`)) as AdminUsersResponse;
  },

  /**
   * Change User Status (Block / Unblock)
   * PATCH /api/v1/admin/users/:id/status
   */
  updateUserStatus: async (id: string, status: AdminUserStatus) => {
    return await api.patch(`/admin/users/${id}/status`, { status });
  },

  /**
   * Change User Role (Promote to Admin / Demote)
   * PATCH /api/v1/admin/users/:id/role
   */
  updateUserRole: async (id: string, role: AdminUserRole) => {
    return await api.patch(`/admin/users/${id}/role`, { role });
  },

  /**
   * Export Users to CSV
   * GET /api/v1/admin/export/users
   * Streams text/csv and triggers file download in browser
   */
  exportUsersCsv: async () => {
    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
    // We can fetch with Bearer token and trigger download
    const { useAuthStore } = await import("@/store/auth.store");
    const token = useAuthStore.getState().token;

    const res = await fetch(`${BASE_URL}/admin/export/users`, {
      method: "GET",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!res.ok) {
      throw new Error(`Export failed with status: ${res.status}`);
    }

    const blob = await res.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `users_export_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);
    return true;
  },

  /**
   * 3. Support Tickets Management
   * GET /api/v1/admin/support-tickets
   */
  getSupportTickets: async (params?: AdminSupportTicketsQueryParams): Promise<SupportTicketsResponse> => {
    const query = new URLSearchParams();
    if (params?.page) query.append("page", String(params.page));
    if (params?.limit) query.append("limit", String(params.limit));
    if (params?.status && params.status !== "ALL") query.append("status", params.status);

    const queryString = query.toString() ? `?${query.toString()}` : "";
    return (await api.get(`/admin/support-tickets${queryString}`)) as SupportTicketsResponse;
  },

  /**
   * Update Ticket Status
   * PATCH /api/v1/admin/support-tickets/:id/status
   */
  updateTicketStatus: async (id: string, status: TicketStatus): Promise<SingleResponse<SupportTicket>> => {
    return (await api.patch(`/admin/support-tickets/${id}/status`, { status })) as SingleResponse<SupportTicket>;
  },

  /**
   * 4. Announcements & Bulk Communications
   * POST /api/v1/admin/notifications/broadcast
   */
  broadcastNotification: async (payload: BroadcastNotificationDTO) => {
    return await api.post("/admin/notifications/broadcast", {
      ...payload,
      type: payload.type || "SYSTEM",
    });
  },

  /**
   * POST /api/v1/admin/emails/bulk
   */
  sendBulkEmail: async (payload: BulkEmailDTO) => {
    return await api.post("/admin/emails/bulk", payload);
  },

  /**
   * 5. Security Audit Logs
   * GET /api/v1/admin/audit-logs
   */
  getAuditLogs: async (params?: AdminAuditLogsQueryParams): Promise<AdminAuditLogsResponse> => {
    const query = new URLSearchParams();
    if (params?.page) query.append("page", String(params.page));
    if (params?.limit) query.append("limit", String(params.limit));
    if (params?.action && params.action !== "ALL") query.append("action", params.action);
    if (params?.entity && params.entity !== "ALL") query.append("entity", params.entity);
    if (params?.userId) query.append("userId", params.userId);

    const queryString = query.toString() ? `?${query.toString()}` : "";
    return (await api.get(`/admin/audit-logs${queryString}`)) as AdminAuditLogsResponse;
  },
};
