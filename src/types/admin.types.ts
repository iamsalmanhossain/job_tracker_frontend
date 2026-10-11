import { TicketStatus } from "./support-ticket.types";

export interface AdminDashboardStats {
  users: {
    total: number;
    active: number;
    suspended: number;
  };
  jobApplications: {
    totalTracked: number;
    totalOffers: number;
    successRate: string;
  };
}

export type AdminUserRole = 'USER' | 'ADMIN';
export type AdminUserStatus = 'ACTIVE' | 'SUSPENDED';

export interface AdminUserListItem {
  id: string;
  name: string;
  email: string;
  role: AdminUserRole;
  status: AdminUserStatus;
  isDeleted: boolean;
  createdAt: string;
  lastLoginAt?: string | null;
  profileImage?: string | null;
  profile?: {
    phone?: string;
    location?: string;
  };
  _count?: {
    jobApplications?: number;
  };
}

export interface AdminMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AdminUsersQueryParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: string;
  role?: string;
  isDeleted?: boolean;
}

export interface AdminUsersResponse {
  success: boolean;
  message?: string;
  data: AdminUserListItem[];
  meta: AdminMeta;
}

export interface AdminSupportTicketsQueryParams {
  page?: number;
  limit?: number;
  status?: string;
}

export interface AdminAuditLog {
  id: string;
  userId?: string;
  action: string;
  entity: string;
  entityId?: string;
  description: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface AdminAuditLogsQueryParams {
  page?: number;
  limit?: number;
  action?: string;
  entity?: string;
  userId?: string;
}

export interface AdminAuditLogsResponse {
  success: boolean;
  message?: string;
  data: AdminAuditLog[];
  meta: AdminMeta;
}

export interface BroadcastNotificationDTO {
  title: string;
  message: string;
  type?: string;
}

export interface BulkEmailDTO {
  subject: string;
  message: string;
}
