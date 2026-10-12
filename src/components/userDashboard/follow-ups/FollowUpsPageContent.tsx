"use client"

import React, { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Plus,
  Trash2,
  Loader2,
  Calendar,
  Building2,
  CheckSquare,
  Square
} from "lucide-react"
import { FollowUpService } from "@/services/followUp.service"
import { FollowUp, FollowUpStatus } from "@/types/follow-up.types"
import { CreateFollowUpModal } from "./CreateFollowUpModal"
import { Button } from "@/components/ui/button"
import { ConfirmModal } from "@/components/ui/confirm-modal"
import { toast } from "sonner"

export function FollowUpsPageContent() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)
  const [tabFilter, setTabFilter] = useState<"ALL" | "PENDING" | "COMPLETED" | "OVERDUE">("ALL")
  const queryClient = useQueryClient()

  const { data: res, isLoading } = useQuery({
    queryKey: ["follow-ups"],
    queryFn: () => FollowUpService.getAll(),
  })

  const rawData = res?.data
  const followUps: FollowUp[] = Array.isArray(rawData)
    ? rawData
    : Array.isArray((rawData as any)?.followUps)
    ? (rawData as any).followUps
    : Array.isArray((rawData as any)?.data)
    ? (rawData as any).data
    : []

  // Toggle status mutation
  const toggleStatusMutation = useMutation({
    mutationFn: ({ id, isCompleted }: { id: string; isCompleted: boolean }) =>
      FollowUpService.update(id, {
        status: isCompleted ? "COMPLETED" : "PENDING",
        completedAt: isCompleted ? new Date().toISOString() : null,
      }),
    onSuccess: (_, { isCompleted }) => {
      toast.success(isCompleted ? "Follow-up marked as completed!" : "Follow-up reopened")
      queryClient.invalidateQueries({ queryKey: ["follow-ups"] })
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || err?.message || "Failed to update follow-up")
    },
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => FollowUpService.delete(id),
    onSuccess: () => {
      toast.success("Follow-up reminder deleted")
      setDeleteTargetId(null)
      queryClient.invalidateQueries({ queryKey: ["follow-ups"] })
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || err?.message || "Failed to delete reminder")
    },
  })

  const now = new Date()

  // Calculate statistics
  const pendingCount = followUps.filter((f) => f.status === "PENDING").length
  const completedCount = followUps.filter((f) => f.status === "COMPLETED").length
  const overdueCount = followUps.filter(
    (f) => f.status === "PENDING" && new Date(f.scheduledAt) < now
  ).length

  // Filter list
  const filteredList = followUps.filter((item) => {
    const isOverdue = item.status === "PENDING" && new Date(item.scheduledAt) < now
    if (tabFilter === "PENDING") return item.status === "PENDING"
    if (tabFilter === "COMPLETED") return item.status === "COMPLETED"
    if (tabFilter === "OVERDUE") return isOverdue
    return true
  })

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Follow-up Reminders
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Never miss reaching out to recruiters, hiring managers, or application deadlines.
          </p>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="rounded-xl bg-[#1C3627] hover:bg-[#1C3627]/90 text-white dark:bg-[#A3B18A] dark:hover:bg-[#A3B18A]/90 dark:text-[#1C3627] font-semibold gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Schedule Follow-up
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#111D15] border border-border/20 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Pending Follow-ups
            </p>
            <h3 className="text-2xl font-black text-foreground mt-1">{pendingCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#111D15] border border-border/20 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Overdue
            </p>
            <h3 className="text-2xl font-black text-red-500 mt-1">{overdueCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#111D15] border border-border/20 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Completed
            </p>
            <h3 className="text-2xl font-black text-[#1C3627] dark:text-[#A3B18A] mt-1">{completedCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#1C3627]/10 dark:bg-[#A3B18A]/10 text-[#1C3627] dark:text-[#A3B18A] flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-border/10">
        {[
          { key: "ALL", label: `All (${followUps.length})` },
          { key: "PENDING", label: `Pending (${pendingCount})` },
          { key: "OVERDUE", label: `Overdue (${overdueCount})` },
          { key: "COMPLETED", label: `Completed (${completedCount})` },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setTabFilter(tab.key as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              tabFilter === tab.key
                ? "bg-[#1C3627] text-white dark:bg-[#A3B18A] dark:text-[#1C3627]"
                : "text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Follow-up Checklist */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading reminders...</p>
        </div>
      ) : filteredList.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-border/40 p-12 text-center flex flex-col items-center justify-center bg-white/40 dark:bg-[#111D15]/40 backdrop-blur-sm">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-500 flex items-center justify-center mb-4">
            <Bell className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-1">No follow-ups found</h3>
          <p className="text-sm text-muted-foreground max-w-sm mb-6">
            Schedule your first follow-up reminder to stay proactive in your job hunt.
          </p>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="rounded-xl bg-[#1C3627] hover:bg-[#1C3627]/90 text-white dark:bg-[#A3B18A] dark:hover:bg-[#A3B18A]/90 dark:text-[#1C3627] font-semibold gap-2"
          >
            <Plus className="w-4 h-4" /> Add Follow-up
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredList.map((item) => {
            const isCompleted = item.status === "COMPLETED"
            const scheduledDate = new Date(item.scheduledAt)
            const isOverdue = !isCompleted && scheduledDate < now

            const formattedDate = scheduledDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })

            return (
              <div
                key={item.id}
                className={`flex items-start sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#111D15] border transition-all duration-200 group hover:shadow-sm ${
                  isOverdue
                    ? "border-red-500/40 bg-red-500/5 dark:bg-red-500/5"
                    : isCompleted
                    ? "border-border/10 opacity-75"
                    : "border-border/20 hover:border-border/40"
                }`}
              >
                {/* Checkbox & Details */}
                <div className="flex items-start gap-4">
                  <button
                    onClick={() =>
                      toggleStatusMutation.mutate({
                        id: item.id,
                        isCompleted: !isCompleted,
                      })
                    }
                    disabled={toggleStatusMutation.isPending}
                    className="mt-0.5 sm:mt-0 text-muted-foreground hover:text-foreground transition-colors shrink-0"
                    title={isCompleted ? "Mark as pending" : "Mark as completed"}
                  >
                    {isCompleted ? (
                      <CheckSquare className="w-5 h-5 text-[#1C3627] dark:text-[#A3B18A]" />
                    ) : (
                      <Square className="w-5 h-5" />
                    )}
                  </button>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4
                        className={`font-bold text-sm sm:text-base text-foreground ${
                          isCompleted ? "line-through text-muted-foreground" : ""
                        }`}
                      >
                        {item.title}
                      </h4>

                      {isOverdue && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20">
                          <AlertTriangle className="w-3 h-3" /> Overdue
                        </span>
                      )}

                      {isCompleted && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                          Completed
                        </span>
                      )}
                    </div>

                    {item.description && (
                      <p className="text-xs text-muted-foreground max-w-xl">
                        {item.description}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> Due: {formattedDate}
                      </span>
                      {item.application && (
                        <span className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5" /> {item.application.companyName} ({item.application.jobTitle})
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Delete Action */}
                <button
                  onClick={() => setDeleteTargetId(item.id)}
                  disabled={deleteMutation.isPending}
                  className="p-2 rounded-xl text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors shrink-0"
                  title="Delete reminder"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* Modal */}
      <CreateFollowUpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
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
        title="Delete Reminder?"
        description="Are you sure you want to delete this follow-up reminder? This action cannot be undone."
        confirmText="Delete Reminder"
        isLoading={deleteMutation.isPending}
        variant="danger"
      />
    </div>
  )
}
