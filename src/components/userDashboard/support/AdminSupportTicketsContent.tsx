"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ShieldAlert,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Calendar,
  MessageSquare,
  User as UserIcon,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
  Mail,
} from "lucide-react";
import { AdminService } from "@/services/admin.service";
import { SupportTicket, TicketStatus } from "@/types/support-ticket.types";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const STATUS_BADGES: Record<TicketStatus, { label: string; className: string }> = {
  OPEN: {
    label: "Open",
    className: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  IN_PROGRESS: {
    label: "In Progress",
    className: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  },
  RESOLVED: {
    label: "Resolved",
    className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  CLOSED: {
    label: "Closed",
    className: "bg-muted text-muted-foreground border-border/20",
  },
};

export function AdminSupportTicketsContent() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  // TanStack Query for Admin Support Tickets with Pagination & Status
  const { data: res, isLoading } = useQuery({
    queryKey: ["admin-support-tickets", page, statusFilter],
    queryFn: () => AdminService.getSupportTickets({ page, limit: 15, status: statusFilter }),
  });

  const raw = res?.data;
  const tickets: SupportTicket[] = Array.isArray(raw)
    ? raw
    : Array.isArray((raw as any)?.tickets)
    ? (raw as any).tickets
    : [];
  const meta = res?.meta || { page: 1, limit: 15, total: tickets.length, totalPages: 1 };

  // Update Status mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: TicketStatus }) =>
      AdminService.updateTicketStatus(id, status),
    onSuccess: (_, variables) => {
      toast.success("Ticket status updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["admin-support-tickets"] });
      if (selectedTicket && selectedTicket.id === variables.id) {
        setSelectedTicket((prev) => (prev ? { ...prev, status: variables.status } : null));
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || err?.message || "Failed to update status");
    },
  });

  const openCount = tickets.filter((t) => t.status === "OPEN").length;
  const inProgressCount = tickets.filter((t) => t.status === "IN_PROGRESS").length;
  const resolvedCount = tickets.filter((t) => t.status === "RESOLVED").length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-[#1C3627]/10 dark:bg-[#A3B18A]/15 text-[#1C3627] dark:text-[#A3B18A] text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldAlert className="w-3.5 h-3.5" /> Administrative Operations
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            User Support Tickets
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review user inquiries, inspect reported issues, and update ticket lifecycle.
          </p>
        </div>
      </div>

      {/* Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#111D15] border border-border/20 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Open Tickets
            </p>
            <h3 className="text-2xl font-black text-blue-500 mt-1">{openCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#111D15] border border-border/20 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              In Progress
            </p>
            <h3 className="text-2xl font-black text-purple-500 mt-1">{inProgressCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#111D15] border border-border/20 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Resolved
            </p>
            <h3 className="text-2xl font-black text-emerald-500 mt-1">{resolvedCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-border/10">
        {["ALL", "OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"].map((filter) => (
          <button
            key={filter}
            onClick={() => {
              setStatusFilter(filter);
              setPage(1);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              statusFilter === filter
                ? "bg-[#1C3627] text-white dark:bg-[#A3B18A] dark:text-[#1C3627]"
                : "text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground"
            }`}
          >
            {filter === "ALL"
              ? "All Tickets"
              : filter.replace("_", " ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
          </button>
        ))}
      </div>

      {/* Tickets List */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading support inquiries...</p>
        </div>
      ) : tickets.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-border/40 p-12 text-center flex flex-col items-center justify-center bg-white/40 dark:bg-[#111D15]/40 backdrop-blur-sm">
          <MessageSquare className="w-10 h-10 text-muted-foreground/50 mb-3" />
          <h3 className="text-lg font-bold text-foreground mb-1">No tickets found</h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            All user tickets have been processed or no submissions match the current filter.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => {
            const dateStr = new Date(ticket.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });
            const badge = STATUS_BADGES[ticket.status] || {
              label: ticket.status,
              className: "bg-muted text-foreground border-border/20",
            };

            return (
              <div
                key={ticket.id}
                className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#111D15] border border-border/20 hover:border-border/40 transition-all duration-200 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Left: User & Title */}
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-lg border ${badge.className}`}>
                        {badge.label}
                      </span>
                      {ticket.user && (
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground px-2.5 py-0.5 rounded-lg bg-black/5 dark:bg-white/5 border border-border/10">
                          <UserIcon className="w-3 h-3 text-[#A3B18A]" />
                          {ticket.user.name || ticket.user.email}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {dateStr}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-foreground pt-1">
                      {ticket.subject}
                    </h3>
                  </div>

                  {/* Right: Quick Status Change Dropdown & Details Button */}
                  <div className="flex items-center gap-3 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedTicket(ticket)}
                      className="rounded-xl text-xs h-8 gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                      Details
                    </Button>

                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium text-muted-foreground">Status:</span>
                      <select
                        value={ticket.status}
                        disabled={updateStatusMutation.isPending}
                        onChange={(e) =>
                          updateStatusMutation.mutate({
                            id: ticket.id,
                            status: e.target.value as TicketStatus,
                          })
                        }
                        className="px-3 py-1.5 rounded-xl bg-black/5 dark:bg-black/20 border border-border/20 text-xs font-semibold text-foreground outline-none cursor-pointer hover:border-border/40 transition-colors dark:[color-scheme:dark] [color-scheme:light]"
                      >
                        <option value="OPEN" className="bg-white dark:bg-[#111D15] text-neutral-900 dark:text-neutral-100">Open</option>
                        <option value="IN_PROGRESS" className="bg-white dark:bg-[#111D15] text-neutral-900 dark:text-neutral-100">In Progress</option>
                        <option value="RESOLVED" className="bg-white dark:bg-[#111D15] text-neutral-900 dark:text-neutral-100">Resolved</option>
                        <option value="CLOSED" className="bg-white dark:bg-[#111D15] text-neutral-900 dark:text-neutral-100">Closed</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Description Excerpt */}
                <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-border/10 text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed line-clamp-3">
                  {ticket.description}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Footer */}
      {meta.totalPages > 1 && (
        <div className="p-4 border-t border-border/10 flex items-center justify-between text-xs text-muted-foreground">
          <div>
            Showing page <strong>{meta.page}</strong> of <strong>{meta.totalPages}</strong> ({meta.total} tickets)
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

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#111D15] border border-border/20 rounded-2xl w-full max-w-2xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-border/10 pb-4">
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold px-3 py-1 rounded-xl border ${STATUS_BADGES[selectedTicket.status]?.className}`}>
                  {STATUS_BADGES[selectedTicket.status]?.label || selectedTicket.status}
                </span>
                <span className="text-xs text-muted-foreground">
                  Ticket #{selectedTicket.id.slice(0, 8)}
                </span>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h2 className="text-xl font-bold text-foreground">{selectedTicket.subject}</h2>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                {selectedTicket.user && (
                  <span className="flex items-center gap-1.5 font-medium text-foreground">
                    <UserIcon className="w-3.5 h-3.5 text-[#A3B18A]" />
                    {selectedTicket.user.name || "Anonymous User"} ({selectedTicket.user.email})
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Submitted on {new Date(selectedTicket.createdAt).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Full Inquiry Description:
              </span>
              <div className="p-4 rounded-xl bg-black/5 dark:bg-black/20 border border-border/10 text-sm text-foreground whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                {selectedTicket.description}
              </div>
            </div>

            {/* Quick Status and Actions */}
            <div className="pt-3 border-t border-border/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-muted-foreground">Update Status:</span>
                <select
                  value={selectedTicket.status}
                  disabled={updateStatusMutation.isPending}
                  onChange={(e) =>
                    updateStatusMutation.mutate({
                      id: selectedTicket.id,
                      status: e.target.value as TicketStatus,
                    })
                  }
                  className="px-3 py-1.5 rounded-xl bg-black/5 dark:bg-black/20 border border-border/20 text-xs font-semibold text-foreground outline-none cursor-pointer"
                >
                  <option value="OPEN">Open</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedTicket(null)}
                className="rounded-xl"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
