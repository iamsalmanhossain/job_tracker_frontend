"use client"

import React, { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  Calendar,
  Clock,
  Video,
  Plus,
  ExternalLink,
  Trash2,
  User,
  Mail,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Briefcase
} from "lucide-react"
import { InterviewService } from "@/services/interview.service"
import { Interview, InterviewStatus } from "@/types/interview.types"
import { ScheduleInterviewModal } from "./ScheduleInterviewModal"
import { Button } from "@/components/ui/button"
import { ConfirmModal } from "@/components/ui/confirm-modal"
import { toast } from "sonner"

const STATUS_BADGES: Record<InterviewStatus, { label: string; className: string }> = {
  SCHEDULED: {
    label: "Scheduled",
    className: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  COMPLETED: {
    label: "Completed",
    className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  PASSED: {
    label: "Passed",
    className: "bg-[#1C3627]/10 dark:bg-[#A3B18A]/15 text-[#1C3627] dark:text-[#A3B18A] border-[#1C3627]/20 dark:border-[#A3B18A]/30",
  },
  FAILED: {
    label: "Failed",
    className: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-muted text-muted-foreground border-border/20",
  },
  RESCHEDULED: {
    label: "Rescheduled",
    className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
}

const TYPE_LABELS: Record<string, string> = {
  PHONE: "Phone Screen",
  VIDEO: "Video Call",
  TECHNICAL: "Technical Round",
  HR: "HR / Fit Round",
  ONSITE: "Onsite",
  FINAL: "Final Round",
  OTHER: "Interview",
}

export function InterviewsPageContent() {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false)
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>("ALL")
  const queryClient = useQueryClient()

  const { data: res, isLoading } = useQuery({
    queryKey: ["interviews", statusFilter],
    queryFn: () => InterviewService.getAll(statusFilter !== "ALL" ? { status: statusFilter } : undefined),
  })

  const rawData = res?.data
  const interviews: Interview[] = Array.isArray(rawData)
    ? rawData
    : Array.isArray((rawData as any)?.interviews)
    ? (rawData as any).interviews
    : Array.isArray((rawData as any)?.data)
    ? (rawData as any).data
    : []

  // Status update mutation
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: InterviewStatus }) =>
      InterviewService.update(id, { status }),
    onSuccess: () => {
      toast.success("Interview status updated")
      queryClient.invalidateQueries({ queryKey: ["interviews"] })
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || err?.message || "Failed to update status")
    },
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => InterviewService.delete(id),
    onSuccess: () => {
      toast.success("Interview deleted")
      setDeleteTargetId(null)
      queryClient.invalidateQueries({ queryKey: ["interviews"] })
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || err?.message || "Failed to delete interview")
    },
  })

  const handleDelete = (id: string) => {
    setDeleteTargetId(id)
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Interview Tracking
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track technical screens, rounds, meeting links, and interviewer feedback.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsScheduleModalOpen(true)}
            className="rounded-xl bg-[#1C3627] hover:bg-[#1C3627]/90 text-white dark:bg-[#A3B18A] dark:hover:bg-[#A3B18A]/90 dark:text-[#1C3627] font-semibold gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" /> Schedule Interview
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-border/10">
        {["ALL", "SCHEDULED", "COMPLETED", "PASSED", "FAILED", "CANCELLED"].map((filter) => (
          <button
            key={filter}
            onClick={() => setStatusFilter(filter)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              statusFilter === filter
                ? "bg-[#1C3627] text-white dark:bg-[#A3B18A] dark:text-[#1C3627]"
                : "text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground"
            }`}
          >
            {filter === "ALL" ? "All Interviews" : filter.charAt(0) + filter.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading interviews...</p>
        </div>
      ) : interviews.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-border/40 p-12 text-center flex flex-col items-center justify-center bg-white/40 dark:bg-[#111D15]/40 backdrop-blur-sm">
          <div className="w-16 h-16 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
            <Calendar className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-1">No interviews found</h3>
          <p className="text-sm text-muted-foreground max-w-sm mb-6">
            Keep track of all upcoming rounds, preparation notes, and links in one unified timeline.
          </p>
          <Button
            onClick={() => setIsScheduleModalOpen(true)}
            className="rounded-xl bg-[#1C3627] hover:bg-[#1C3627]/90 text-white dark:bg-[#A3B18A] dark:hover:bg-[#A3B18A]/90 dark:text-[#1C3627] font-semibold gap-2"
          >
            <Plus className="w-4 h-4" /> Schedule an Interview
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {interviews.map((interview) => {
            const dateObj = new Date(interview.scheduledAt)
            const formattedDate = dateObj.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            })
            const formattedTime = dateObj.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })
            const badge = STATUS_BADGES[interview.status] || {
              label: interview.status,
              className: "bg-muted text-foreground border-border/20",
            }

            return (
              <div
                key={interview.id}
                className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#111D15] border border-border/20 hover:border-border/40 transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-5 group hover:shadow-md"
              >
                {/* Left Section: Date & Type */}
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-[#1C3627]/10 dark:bg-[#A3B18A]/10 text-[#1C3627] dark:text-[#A3B18A] shrink-0 border border-[#1C3627]/20 dark:border-[#A3B18A]/20">
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      {dateObj.toLocaleDateString("en-US", { month: "short" })}
                    </span>
                    <span className="text-xl font-black">
                      {dateObj.getDate()}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-lg bg-black/5 dark:bg-white/5 border border-border/10 text-foreground">
                        {TYPE_LABELS[interview.type] || interview.type}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-lg border ${badge.className}`}
                      >
                        {badge.label}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-foreground flex items-center gap-2">
                      {interview.application?.jobTitle || "Job Interview"}
                      {interview.application?.companyName && (
                        <span className="text-muted-foreground font-normal text-sm">
                          at {interview.application.companyName}
                        </span>
                      )}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground pt-0.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {formattedTime} ({formattedDate})
                      </span>
                      {interview.interviewerName && (
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" /> {interview.interviewerName}
                        </span>
                      )}
                      {interview.interviewerEmail && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5" /> {interview.interviewerEmail}
                        </span>
                      )}
                    </div>

                    {interview.notes && (
                      <p className="text-xs text-muted-foreground/90 bg-black/5 dark:bg-white/5 p-2 rounded-lg mt-2 italic max-w-xl">
                        &quot;{interview.notes}&quot;
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Section: Actions & Status selector */}
                <div className="flex flex-wrap items-center gap-3 md:self-center shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-border/10">
                  {/* Status Dropdown */}
                  <select
                    value={interview.status}
                    onChange={(e) =>
                      updateStatusMutation.mutate({
                        id: interview.id,
                        status: e.target.value as InterviewStatus,
                      })
                    }
                    className="px-3 py-1.5 rounded-xl bg-black/5 dark:bg-black/20 border border-border/20 text-xs font-semibold text-foreground outline-none cursor-pointer hover:border-border/40 transition-colors dark:[color-scheme:dark] [color-scheme:light]"
                  >
                    <option value="SCHEDULED" className="bg-white dark:bg-[#111D15] text-neutral-900 dark:text-neutral-100">Scheduled</option>
                    <option value="COMPLETED" className="bg-white dark:bg-[#111D15] text-neutral-900 dark:text-neutral-100">Completed</option>
                    <option value="PASSED" className="bg-white dark:bg-[#111D15] text-neutral-900 dark:text-neutral-100">Passed</option>
                    <option value="FAILED" className="bg-white dark:bg-[#111D15] text-neutral-900 dark:text-neutral-100">Failed</option>
                    <option value="CANCELLED" className="bg-white dark:bg-[#111D15] text-neutral-900 dark:text-neutral-100">Cancelled</option>
                    <option value="RESCHEDULED" className="bg-white dark:bg-[#111D15] text-neutral-900 dark:text-neutral-100">Rescheduled</option>
                  </select>

                  {/* Meeting link */}
                  {interview.meetingLink && (
                    <a
                      href={interview.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1C3627] hover:bg-[#1C3627]/90 text-white dark:bg-[#A3B18A] dark:hover:bg-[#A3B18A]/90 dark:text-[#1C3627] text-xs font-semibold shadow-sm transition-colors"
                    >
                      <Video className="w-3.5 h-3.5" /> Join Meeting
                    </a>
                  )}

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(interview.id)}
                    disabled={deleteMutation.isPending}
                    className="p-2 rounded-xl text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
                    title="Delete interview"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Schedule Interview Modal */}
      <ScheduleInterviewModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={() => {
          if (deleteTargetId) {
            deleteMutation.mutate(deleteTargetId)
          }
        }}
        title="Delete Interview Record?"
        description="Are you sure you want to delete this interview record? This action cannot be undone."
        confirmText="Delete Interview"
        isLoading={deleteMutation.isPending}
        variant="danger"
      />
    </div>
  )
}
