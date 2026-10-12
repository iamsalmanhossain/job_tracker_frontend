"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Users,
  Search,
  Filter,
  UserCheck,
  UserX,
  Shield,
  ShieldAlert,
  Download,
  Loader2,
  Calendar,
  Briefcase,
  MoreVertical,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { AdminService } from "@/services/admin.service";
import { AdminUserListItem, AdminUserRole, AdminUserStatus } from "@/types/admin.types";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AdminUsersContent() {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [isExporting, setIsExporting] = useState(false);

  // Confirmation Modal state
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    type: "STATUS" | "ROLE";
    user: AdminUserListItem | null;
    targetValue: string;
  }>({
    isOpen: false,
    type: "STATUS",
    user: null,
    targetValue: "",
  });

  // Debounce search term
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch users query
  const { data: usersRes, isLoading, isPlaceholderData } = useQuery({
    queryKey: ["admin-users", page, debouncedSearch, statusFilter, roleFilter],
    queryFn: () =>
      AdminService.getUsers({
        page,
        limit: 10,
        searchTerm: debouncedSearch,
        status: statusFilter,
        role: roleFilter,
      }),
  });

  const users = usersRes?.data || [];
  const meta = usersRes?.meta || { page: 1, limit: 10, total: 0, totalPages: 1 };

  // Status mutation
  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: AdminUserStatus }) =>
      AdminService.updateUserStatus(id, status),
    onSuccess: (_, variables) => {
      toast.success(
        variables.status === "SUSPENDED"
          ? "User suspended and sessions terminated"
          : "User account reactivated successfully"
      );
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-dashboard-stats"] });
      setConfirmModal((prev) => ({ ...prev, isOpen: false }));
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || err.message || "Failed to update user status");
    },
  });

  // Role mutation
  const roleMutation = useMutation({
    mutationFn: ({ id, role }: { id: string; role: AdminUserRole }) =>
      AdminService.updateUserRole(id, role),
    onSuccess: (_, variables) => {
      toast.success(`User role changed to ${variables.role}`);
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      setConfirmModal((prev) => ({ ...prev, isOpen: false }));
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || err.message || "Failed to update user role");
    },
  });

  const handleExportCsv = async () => {
    try {
      setIsExporting(true);
      await AdminService.exportUsersCsv();
      toast.success("User list downloaded as CSV!");
    } catch (err: any) {
      toast.error(err.message || "Export failed");
    } finally {
      setIsExporting(false);
    }
  };

  const handleConfirmAction = () => {
    if (!confirmModal.user) return;
    if (confirmModal.type === "STATUS") {
      statusMutation.mutate({
        id: confirmModal.user.id,
        status: confirmModal.targetValue as AdminUserStatus,
      });
    } else {
      roleMutation.mutate({
        id: confirmModal.user.id,
        role: confirmModal.targetValue as AdminUserRole,
      });
    }
  };

  const isActionPending = statusMutation.isPending || roleMutation.isPending;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">User Management</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400">
              {meta.total} Registered
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Search, filter, promote roles, and moderate user account access.
          </p>
        </div>

        <Button
          onClick={handleExportCsv}
          disabled={isExporting}
          variant="outline"
          size="sm"
          className="rounded-xl text-xs h-9 border-[#1C3627]/20 hover:border-[#1C3627]/40 w-fit"
        >
          {isExporting ? (
            <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
          ) : (
            <Download className="w-3.5 h-3.5 mr-1.5 text-emerald-600 dark:text-emerald-400" />
          )}
          Export Users (CSV)
        </Button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white dark:bg-[#111D15] p-4 rounded-2xl border border-border/20 flex flex-col md:flex-row items-center gap-3 shadow-sm">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by user name or email address..."
            className="pl-9 h-10 rounded-xl text-xs bg-black/5 dark:bg-black/20 border-border/20"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="h-10 px-3 rounded-xl border border-border/20 bg-background text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-[#1C3627] dark:focus:ring-[#A3B18A] flex-1 md:flex-initial"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active Users</option>
            <option value="SUSPENDED">Suspended Users</option>
          </select>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setPage(1);
            }}
            className="h-10 px-3 rounded-xl border border-border/20 bg-background text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-[#1C3627] dark:focus:ring-[#A3B18A] flex-1 md:flex-initial"
          >
            <option value="ALL">All Roles</option>
            <option value="USER">User (Standard)</option>
            <option value="ADMIN">Admin (Privileged)</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-[#111D15] border border-border/20 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-black/[0.02] dark:bg-black/20 border-b border-border/10 text-muted-foreground font-semibold">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Applications</th>
                <th className="py-3 px-4">Joined Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/10">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted-foreground">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#1C3627] dark:text-[#A3B18A]" />
                    Loading users list...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted-foreground">
                    No users found matching current filters.
                  </td>
                </tr>
              ) : (
                users.map((u) => {
                  const isSuspended = u.status === "SUSPENDED";
                  const isAdmin = u.role === "ADMIN";

                  return (
                    <tr key={u.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                      {/* User Info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1C3627]/20 to-[#A3B18A]/20 text-[#1C3627] dark:text-[#A3B18A] flex items-center justify-center font-bold text-xs uppercase border border-border/20 shrink-0">
                            {u.profileImage ? (
                              <img
                                src={u.profileImage}
                                alt={u.name}
                                className="w-full h-full object-cover rounded-full"
                              />
                            ) : (
                              u.name?.slice(0, 2) || "U"
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-foreground flex items-center gap-1.5">
                              {u.name}
                              {isAdmin && (
                                <Shield className="w-3.5 h-3.5 text-[#1C3627] dark:text-[#A3B18A]" />
                              )}
                            </div>
                            <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                              <Mail className="w-3 h-3 text-muted-foreground/70" />
                              {u.email}
                            </div>
                            {u.profile?.location && (
                              <div className="text-[10px] text-muted-foreground/80 flex items-center gap-1 mt-0.5">
                                <MapPin className="w-2.5 h-2.5" />
                                {u.profile.location}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            isAdmin
                              ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
                              : "bg-black/5 dark:bg-white/5 text-muted-foreground border-border/20"
                          }`}
                        >
                          {isAdmin ? "ADMIN" : "USER"}
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            isSuspended
                              ? "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20"
                              : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isSuspended ? "bg-red-500" : "bg-emerald-500"
                            }`}
                          />
                          {isSuspended ? "Suspended" : "Active"}
                        </span>
                      </td>

                      {/* Applications Count */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center gap-1 font-semibold text-foreground">
                          <Briefcase className="w-3 h-3 text-muted-foreground" />
                          {u._count?.jobApplications ?? 0}
                        </span>
                      </td>

                      {/* Created Date */}
                      <td className="py-3.5 px-4 text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-muted-foreground/70" />
                          {new Date(u.createdAt).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </td>

                      {/* Action Menu / Buttons */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Role Toggle Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setConfirmModal({
                                isOpen: true,
                                type: "ROLE",
                                user: u,
                                targetValue: isAdmin ? "USER" : "ADMIN",
                              })
                            }
                            className="h-8 px-2 text-[11px] rounded-lg text-muted-foreground hover:text-foreground"
                            title={isAdmin ? "Demote to User" : "Promote to Admin"}
                          >
                            {isAdmin ? "Demote" : "Make Admin"}
                          </Button>

                          {/* Status Toggle Button */}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setConfirmModal({
                                isOpen: true,
                                type: "STATUS",
                                user: u,
                                targetValue: isSuspended ? "ACTIVE" : "SUSPENDED",
                              })
                            }
                            className={`h-8 px-2.5 text-[11px] font-semibold rounded-lg ${
                              isSuspended
                                ? "text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/10"
                                : "text-red-600 dark:text-red-400 border-red-500/20 hover:bg-red-500/10"
                            }`}
                          >
                            {isSuspended ? "Unblock" : "Suspend"}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {meta.totalPages > 1 && (
          <div className="p-4 border-t border-border/10 flex items-center justify-between text-xs text-muted-foreground">
            <div>
              Showing page <strong>{meta.page}</strong> of <strong>{meta.totalPages}</strong> ({meta.total} users)
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="h-8 rounded-lg text-xs"
              >
                <ChevronLeft className="w-3.5 h-3.5 mr-1" /> Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
                disabled={page >= meta.totalPages}
                className="h-8 rounded-lg text-xs"
              >
                Next <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Dialog Modal */}
      {confirmModal.isOpen && confirmModal.user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#111D15] border border-border/20 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  confirmModal.targetValue === "SUSPENDED"
                    ? "bg-red-500/10 text-red-600 dark:text-red-400"
                    : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                }`}
              >
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">
                  {confirmModal.type === "STATUS"
                    ? confirmModal.targetValue === "SUSPENDED"
                      ? "Suspend User Account?"
                      : "Reactivate User Account?"
                    : `Change Role to ${confirmModal.targetValue}?`}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  User: <strong>{confirmModal.user.name}</strong> ({confirmModal.user.email})
                </p>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  {confirmModal.type === "STATUS" && confirmModal.targetValue === "SUSPENDED"
                    ? "Suspending this user will immediately revoke all their active JWT sessions and block access to the application."
                    : confirmModal.type === "STATUS"
                    ? "Reactivating this user will restore their ability to login and track jobs."
                    : `This will grant or remove administrative privileges for ${confirmModal.user.name}.`}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
                disabled={isActionPending}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleConfirmAction}
                disabled={isActionPending}
                className={`rounded-xl font-semibold text-white ${
                  confirmModal.targetValue === "SUSPENDED"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-[#1C3627] hover:bg-[#1C3627]/90 dark:bg-[#A3B18A] dark:hover:bg-[#A3B18A]/90 dark:text-[#1C3627]"
                }`}
              >
                {isActionPending ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                    Executing...
                  </>
                ) : (
                  "Confirm & Execute"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
