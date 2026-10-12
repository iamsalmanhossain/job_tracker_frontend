"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ShieldAlert,
  Search,
  Filter,
  Calendar,
  Globe,
  Monitor,
  User as UserIcon,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Activity,
  History,
  Lock,
  RefreshCw,
} from "lucide-react";
import { AdminService } from "@/services/admin.service";
import { Button } from "@/components/ui/button";

const ACTION_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  LOGIN: { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500/20" },
  LOGOUT: { bg: "bg-zinc-500/10", text: "text-zinc-600 dark:text-zinc-400", border: "border-zinc-500/20" },
  CREATE: { bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400", border: "border-blue-500/20" },
  UPDATE: { bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400", border: "border-amber-500/20" },
  DELETE: { bg: "bg-red-500/10", text: "text-red-600 dark:text-red-400", border: "border-red-500/20" },
  CHANGE_STATUS: { bg: "bg-red-500/10", text: "text-red-600 dark:text-red-400", border: "border-red-500/20" },
  CHANGE_ROLE: { bg: "bg-purple-500/10", text: "text-purple-600 dark:text-purple-400", border: "border-purple-500/20" },
  BROADCAST: { bg: "bg-indigo-500/10", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-500/20" },
};

export function AdminAuditLogsContent() {
  const [page, setPage] = useState(1);
  const [actionFilter, setActionFilter] = useState("ALL");
  const [entityFilter, setEntityFilter] = useState("ALL");

  const {
    data: logsRes,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["admin-audit-logs", page, actionFilter, entityFilter],
    queryFn: () =>
      AdminService.getAuditLogs({
        page,
        limit: 20,
        action: actionFilter,
        entity: entityFilter,
      }),
  });

  const logs = logsRes?.data || [];
  const meta = logsRes?.meta || { page: 1, limit: 20, total: 0, totalPages: 1 };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#1C3627]/10 dark:bg-[#A3B18A]/10 text-[#1C3627] dark:text-[#A3B18A] uppercase tracking-wider flex items-center gap-1.5">
              <History className="w-3.5 h-3.5" />
              Compliance & Security
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Security Audit Trail
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Immutable log of administrative operations, logins, status updates, and critical system events.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isLoading || isRefetching}
          className="rounded-xl text-xs h-9 w-fit"
        >
          <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isRefetching ? "animate-spin" : ""}`} />
          Refresh Audit Feed
        </Button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white dark:bg-[#111D15] p-4 rounded-2xl border border-border/20 flex flex-wrap items-center gap-3 shadow-sm">
        {/* Action Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground">Action:</span>
          <select
            value={actionFilter}
            onChange={(e) => {
              setActionFilter(e.target.value);
              setPage(1);
            }}
            className="h-9 px-3 rounded-xl border border-border/20 bg-background text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-[#1C3627] dark:focus:ring-[#A3B18A]"
          >
            <option value="ALL">All Actions</option>
            <option value="LOGIN">LOGIN</option>
            <option value="LOGOUT">LOGOUT</option>
            <option value="CHANGE_STATUS">CHANGE_STATUS</option>
            <option value="CHANGE_ROLE">CHANGE_ROLE</option>
            <option value="CREATE">CREATE</option>
            <option value="UPDATE">UPDATE</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>

        {/* Entity Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground">Entity:</span>
          <select
            value={entityFilter}
            onChange={(e) => {
              setEntityFilter(e.target.value);
              setPage(1);
            }}
            className="h-9 px-3 rounded-xl border border-border/20 bg-background text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-[#1C3627] dark:focus:ring-[#A3B18A]"
          >
            <option value="ALL">All Entities</option>
            <option value="USER">USER</option>
            <option value="APPLICATION">APPLICATION</option>
            <option value="INTERVIEW">INTERVIEW</option>
            <option value="SYSTEM">SYSTEM</option>
          </select>
        </div>

        <div className="ml-auto text-xs text-muted-foreground">
          Total Recorded: <strong>{meta.total} events</strong>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white dark:bg-[#111D15] border border-border/20 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-black/[0.02] dark:bg-black/20 border-b border-border/10 text-muted-foreground font-semibold">
              <tr>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Actor / User</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Entity</th>
                <th className="py-3 px-4">IP Address</th>
                <th className="py-3 px-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/10">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted-foreground">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#1C3627] dark:text-[#A3B18A]" />
                    Loading security audit trail...
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted-foreground">
                    No audit logs recorded for the selected criteria.
                  </td>
                </tr>
              ) : (
                logs.map((log) => {
                  const actionStyle = ACTION_COLORS[log.action] || {
                    bg: "bg-muted",
                    text: "text-foreground",
                    border: "border-border/20",
                  };

                  return (
                    <tr key={log.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors">
                      {/* Action Tag */}
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${actionStyle.bg} ${actionStyle.text} ${actionStyle.border}`}
                        >
                          {log.action}
                        </span>
                      </td>

                      {/* Actor User */}
                      <td className="py-3 px-4">
                        {log.user ? (
                          <div>
                            <div className="font-semibold text-foreground flex items-center gap-1">
                              <UserIcon className="w-3 h-3 text-[#A3B18A]" />
                              {log.user.name}
                            </div>
                            <div className="text-[10px] text-muted-foreground">{log.user.email}</div>
                          </div>
                        ) : (
                          <span className="text-muted-foreground italic">System / Anonymous</span>
                        )}
                      </td>

                      {/* Description */}
                      <td className="py-3 px-4 font-medium text-foreground/90 max-w-xs sm:max-w-md truncate">
                        {log.description}
                      </td>

                      {/* Entity */}
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-black/5 dark:bg-white/5 border border-border/10 text-muted-foreground">
                          {log.entity}
                        </span>
                      </td>

                      {/* IP Address */}
                      <td className="py-3 px-4 text-muted-foreground">
                        <div className="flex items-center gap-1 font-mono text-[11px]">
                          <Globe className="w-3 h-3 text-muted-foreground/70" />
                          {log.ipAddress || "—"}
                        </div>
                      </td>

                      {/* Timestamp */}
                      <td className="py-3 px-4 text-muted-foreground whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-muted-foreground/70" />
                          {new Date(log.createdAt).toLocaleString(undefined, {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
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
              Showing page <strong>{meta.page}</strong> of <strong>{meta.totalPages}</strong> ({meta.total} records)
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
    </div>
  );
}
