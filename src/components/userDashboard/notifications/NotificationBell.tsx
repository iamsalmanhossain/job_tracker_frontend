"use client"

import React, { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  Calendar, 
  Clock, 
  Info, 
  CheckCircle2, 
  AlertTriangle,
  X,
  ExternalLink,
  Loader2
} from "lucide-react"
import { NotificationService } from "@/services/notification.service"
import { NotificationItem } from "@/types/notification.types"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

function formatRelativeTime(dateString: string): string {
  try {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return "Just now"
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`

    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  } catch (e) {
    return dateString
  }
}

export function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const [filterUnreadOnly, setFilterUnreadOnly] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const queryClient = useQueryClient()
  const router = useRouter()

  const { data: res, isLoading } = useQuery({
    queryKey: ["notifications", filterUnreadOnly],
    queryFn: () => NotificationService.getAll(filterUnreadOnly ? { isRead: false } : undefined),
    refetchInterval: 30000, // Background poll every 30s
  })

  const notifications: NotificationItem[] = res?.data?.notifications || []
  const unreadCount: number = res?.data?.unreadCount ?? notifications.filter((n) => !n.isRead).length

  // Mark single as read mutation
  const markReadMutation = useMutation({
    mutationFn: (id: string) => NotificationService.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] })
    },
  })

  // Mark all as read mutation
  const markAllMutation = useMutation({
    mutationFn: () => NotificationService.markAllAsRead(),
    onSuccess: () => {
      toast.success("All notifications marked as read")
      queryClient.invalidateQueries({ queryKey: ["notifications"] })
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || err?.message || "Failed to mark all as read")
    },
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => NotificationService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] })
    },
  })

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  const handleNotificationClick = (item: NotificationItem) => {
    if (!item.isRead) {
      markReadMutation.mutate(item.id)
    }
    if (item.link) {
      setIsOpen(false)
      router.push(item.link)
    }
  }

  const getIcon = (type?: string) => {
    switch (type?.toUpperCase()) {
      case "INTERVIEW":
        return <Calendar className="w-4 h-4 text-purple-500" />
      case "FOLLOW_UP":
        return <Clock className="w-4 h-4 text-amber-500" />
      case "SUCCESS":
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />
      case "WARNING":
        return <AlertTriangle className="w-4 h-4 text-amber-500" />
      default:
        return <Info className="w-4 h-4 text-[#A3B18A]" />
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus:outline-none"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-black text-white bg-[#1C3627] dark:bg-[#A3B18A] dark:text-[#1C3627] rounded-full shadow-sm animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Dropdown / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-x-3 top-16 sm:inset-auto sm:absolute sm:right-0 sm:top-full sm:mt-2 w-auto sm:w-[380px] max-w-[calc(100vw-24px)] bg-white dark:bg-[#111D15] border border-border/20 rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col max-h-[75vh]"
          >
            {/* Header */}
            <div className="p-4 border-b border-border/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-foreground">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#1C3627]/10 dark:bg-[#A3B18A]/15 text-[#1C3627] dark:text-[#A3B18A]">
                    {unreadCount} new
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={() => markAllMutation.mutate()}
                    disabled={markAllMutation.isPending}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 px-2 py-1 rounded-lg transition-colors font-medium"
                    title="Mark all as read"
                  >
                    <CheckCheck className="w-3.5 h-3.5" /> Mark all read
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Filter Toggle */}
            <div className="px-4 py-2 bg-black/[0.02] dark:bg-white/[0.02] border-b border-border/10 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Filter</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setFilterUnreadOnly(false)}
                  className={`px-2.5 py-0.5 rounded-md font-medium transition-colors ${
                    !filterUnreadOnly
                      ? "bg-[#1C3627] text-white dark:bg-[#A3B18A] dark:text-[#1C3627]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterUnreadOnly(true)}
                  className={`px-2.5 py-0.5 rounded-md font-medium transition-colors ${
                    filterUnreadOnly
                      ? "bg-[#1C3627] text-white dark:bg-[#A3B18A] dark:text-[#1C3627]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Unread
                </button>
              </div>
            </div>

            {/* List */}
            <div className="overflow-y-auto custom-scrollbar flex-1 divide-y divide-border/10">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : notifications.length === 0 ? (
                <div className="py-12 px-6 text-center">
                  <Bell className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-foreground">No notifications</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {filterUnreadOnly ? "You're all caught up with unread alerts!" : "You have no notifications right now."}
                  </p>
                </div>
              ) : (
                notifications.map((item) => {
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleNotificationClick(item)}
                      className={`p-4 flex items-start gap-3 transition-colors cursor-pointer group ${
                        !item.isRead
                          ? "bg-[#1C3627]/5 dark:bg-[#A3B18A]/5 hover:bg-[#1C3627]/10 dark:hover:bg-[#A3B18A]/10"
                          : "hover:bg-black/5 dark:hover:bg-white/5 opacity-80 hover:opacity-100"
                      }`}
                    >
                      {/* Icon */}
                      <div className="mt-0.5 p-2 rounded-xl bg-black/5 dark:bg-white/5 shrink-0">
                        {getIcon(item.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4
                            className={`text-xs font-bold truncate ${
                              !item.isRead ? "text-foreground" : "text-muted-foreground"
                            }`}
                          >
                            {item.title}
                          </h4>
                          <span className="text-[10px] text-muted-foreground shrink-0">
                            {formatRelativeTime(item.createdAt)}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5 leading-relaxed">
                          {item.message}
                        </p>
                      </div>

                      {/* Right action / status */}
                      <div className="flex flex-col items-center gap-1.5 shrink-0 self-center">
                        {!item.isRead && (
                          <div className="w-2 h-2 rounded-full bg-[#1C3627] dark:bg-[#A3B18A]" />
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteMutation.mutate(item.id)
                          }}
                          disabled={deleteMutation.isPending}
                          className="opacity-0 group-hover:opacity-100 p-1 text-muted-foreground hover:text-red-500 rounded transition-opacity"
                          title="Delete notification"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {/* Dropdown Footer: Link to full notifications page */}
            <div className="p-3 border-t border-border/10 bg-black/[0.02] dark:bg-black/20 text-center">
              <button
                onClick={() => {
                  setIsOpen(false);
                  router.push("/dashboard/notifications");
                }}
                className="w-full py-1 text-xs font-semibold text-[#1C3627] dark:text-[#A3B18A] hover:underline flex items-center justify-center gap-1.5"
              >
                View all notifications in full page
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
