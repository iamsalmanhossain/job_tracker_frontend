"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Bell,
  CheckCheck,
  Trash2,
  Calendar,
  Clock,
  Info,
  CheckCircle2,
  AlertTriangle,
  Radio,
  ExternalLink,
  Loader2,
  Filter,
  Check,
  Search,
} from "lucide-react";
import { NotificationService } from "@/services/notification.service";
import { NotificationItem } from "@/types/notification.types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

function getNotificationVisuals(type?: string) {
  switch (type) {
    case "INTERVIEW":
      return {
        icon: Calendar,
        bg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
        label: "Interview",
      };
    case "FOLLOW_UP":
      return {
        icon: Clock,
        bg: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
        label: "Follow-Up",
      };
    case "SYSTEM":
    case "BROADCAST":
      return {
        icon: Radio,
        bg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
        label: "Announcement",
      };
    case "SUCCESS":
      return {
        icon: CheckCircle2,
        bg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
        label: "Success",
      };
    case "WARNING":
    case "ALERT":
      return {
        icon: AlertTriangle,
        bg: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
        label: "Notice",
      };
    default:
      return {
        icon: Info,
        bg: "bg-[#1C3627]/10 text-[#1C3627] dark:text-[#A3B18A] border-[#1C3627]/20",
        label: "Update",
      };
  }
}

export function NotificationsContent() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [activeFilter, setActiveFilter] = useState<"ALL" | "UNREAD" | "READ">("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: res, isLoading } = useQuery({
    queryKey: ["notifications", "page"],
    queryFn: () => NotificationService.getAll(),
  });

  const rawNotifications: NotificationItem[] = res?.data?.notifications || [];
  const unreadCount = res?.data?.unreadCount ?? rawNotifications.filter((n) => !n.isRead).length;

  // Mark single as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: NotificationService.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: () => toast.error("Failed to mark as read"),
  });

  // Mark all as read mutation
  const markAllMutation = useMutation({
    mutationFn: NotificationService.markAllAsRead,
    onSuccess: () => {
      toast.success("All notifications marked as read");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: () => toast.error("Failed to mark all as read"),
  });

  // Delete notification mutation
  const deleteMutation = useMutation({
    mutationFn: NotificationService.delete,
    onSuccess: () => {
      toast.success("Notification removed");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: () => toast.error("Failed to delete notification"),
  });

  const filteredNotifications = rawNotifications.filter((item) => {
    if (activeFilter === "UNREAD" && item.isRead) return false;
    if (activeFilter === "READ" && !item.isRead) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchTitle = item.title?.toLowerCase().includes(q);
      const matchMsg = item.message?.toLowerCase().includes(q);
      return matchTitle || matchMsg;
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#1C3627]/10 dark:bg-[#A3B18A]/10 text-[#1C3627] dark:text-[#A3B18A] uppercase tracking-wider flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5" />
              Notifications Center
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Activity & Announcements
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Review your interview reminders, follow-up alerts, and system-wide announcements.
          </p>
        </div>

        {/* Mark All Read Button */}
        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => markAllMutation.mutate()}
            disabled={markAllMutation.isPending}
            className="rounded-xl text-xs h-9 border-[#1C3627]/20 hover:border-[#1C3627]/40 w-fit"
          >
            {markAllMutation.isPending ? (
              <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
            ) : (
              <CheckCheck className="w-3.5 h-3.5 mr-1.5 text-[#1C3627] dark:text-[#A3B18A]" />
            )}
            Mark all ({unreadCount}) as read
          </Button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#111D15] p-4 rounded-2xl border border-border/20 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        {/* Tabs */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {(["ALL", "UNREAD", "READ"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeFilter === filter
                  ? "bg-[#1C3627] text-white dark:bg-[#A3B18A] dark:text-[#1C3627]"
                  : "text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground"
              }`}
            >
              {filter === "ALL" && `All (${rawNotifications.length})`}
              {filter === "UNREAD" && `Unread (${unreadCount})`}
              {filter === "READ" && `Read (${rawNotifications.length - unreadCount})`}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search notifications..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-black/5 dark:bg-black/20 border border-border/20 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[#1C3627] dark:focus:ring-[#A3B18A]"
          />
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center text-muted-foreground gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#1C3627] dark:text-[#A3B18A]" />
            <p className="text-xs">Loading all notifications...</p>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="py-16 rounded-2xl border-2 border-dashed border-border/30 bg-white/40 dark:bg-[#111D15]/40 text-center flex flex-col items-center justify-center p-6">
            <Bell className="w-10 h-10 text-muted-foreground/40 mb-3" />
            <h3 className="text-base font-bold text-foreground">No notifications found</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm">
              {searchTerm
                ? "No notifications match your current search query."
                : activeFilter === "UNREAD"
                ? "You have caught up with all your notifications!"
                : "Your notifications inbox is completely clear."}
            </p>
          </div>
        ) : (
          filteredNotifications.map((item) => {
            const visual = getNotificationVisuals(item.type);
            const Icon = visual.icon;
            const formattedDate = new Date(item.createdAt).toLocaleString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (!item.isRead) markAsReadMutation.mutate(item.id);
                  if (item.link) router.push(item.link);
                }}
                className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  !item.isRead
                    ? "bg-white dark:bg-[#111D15] border-[#1C3627]/30 dark:border-[#A3B18A]/30 shadow-sm"
                    : "bg-white/60 dark:bg-[#111D15]/60 border-border/15 hover:border-border/30 opacity-90"
                }`}
              >
                {/* Left: Icon & Content */}
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${visual.bg}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${visual.bg}`}
                      >
                        {visual.label}
                      </span>
                      <h3
                        className={`text-sm font-bold truncate ${
                          !item.isRead ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {item.title}
                      </h3>
                      {!item.isRead && (
                        <span className="w-2 h-2 rounded-full bg-[#1C3627] dark:bg-[#A3B18A] shrink-0" />
                      )}
                    </div>

                    <p className="text-xs text-foreground/80 leading-relaxed whitespace-pre-wrap">
                      {item.message}
                    </p>

                    <div className="text-[11px] text-muted-foreground flex items-center gap-1 pt-1">
                      <Clock className="w-3 h-3 text-muted-foreground/70" />
                      {formattedDate}
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  {item.link && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!item.isRead) markAsReadMutation.mutate(item.id);
                        router.push(item.link!);
                      }}
                      className="h-8 px-2.5 text-xs text-[#1C3627] dark:text-[#A3B18A] hover:bg-[#1C3627]/10 dark:hover:bg-[#A3B18A]/10 rounded-xl gap-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      View
                    </Button>
                  )}

                  {!item.isRead && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsReadMutation.mutate(item.id);
                      }}
                      disabled={markAsReadMutation.isPending}
                      className="h-8 px-2.5 text-xs text-muted-foreground hover:text-foreground rounded-xl"
                      title="Mark as read"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </Button>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteMutation.mutate(item.id);
                    }}
                    disabled={deleteMutation.isPending}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-red-500 rounded-xl"
                    title="Delete notification"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
