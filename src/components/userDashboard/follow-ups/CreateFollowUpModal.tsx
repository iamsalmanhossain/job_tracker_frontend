"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { X, Bell, Calendar, FileText, Loader2, Clock } from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { FollowUpService } from "@/services/followUp.service"
import { JobApplicationService } from "@/services/jobApplication.service"
import { Button } from "@/components/ui/button"
import { SearchableApplicationSelect } from "@/components/ui/searchable-application-select"
import { toast } from "sonner"

interface CreateFollowUpModalProps {
  isOpen: boolean
  onClose: () => void
  initialApplicationId?: string
}

export function CreateFollowUpModal({
  isOpen,
  onClose,
  initialApplicationId = "",
}: CreateFollowUpModalProps) {
  const [applicationId, setApplicationId] = useState(initialApplicationId)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [scheduledAt, setScheduledAt] = useState("")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const queryClient = useQueryClient()

  const { data: appsData, isLoading: appsLoading } = useQuery({
    queryKey: ["allApplicationsForFollowUp"],
    queryFn: () => JobApplicationService.getAll(1, 100),
    enabled: isOpen,
  })

  const applications = appsData?.data || []

  const createMutation = useMutation({
    mutationFn: () =>
      FollowUpService.create({
        applicationId,
        title: title.trim(),
        description: description.trim() || undefined,
        scheduledAt: new Date(scheduledAt).toISOString(),
        status: "PENDING",
      }),
    onSuccess: () => {
      toast.success("Follow-up reminder scheduled!")
      queryClient.invalidateQueries({ queryKey: ["follow-ups"] })
      handleClose()
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || err?.message || "Failed to schedule follow-up")
    },
  })

  const handleClose = () => {
    setApplicationId(initialApplicationId)
    setTitle("")
    setDescription("")
    setScheduledAt("")
    setErrorMsg(null)
    onClose()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!applicationId) {
      setErrorMsg("Please select a job application.")
      return
    }
    if (!title.trim()) {
      setErrorMsg("Please enter a reminder title.")
      return
    }
    if (!scheduledAt) {
      setErrorMsg("Please select when to follow up.")
      return
    }
    setErrorMsg(null)
    createMutation.mutate()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white dark:bg-[#111D15] border border-border/20 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-500">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Schedule Follow-Up</h2>
              <p className="text-xs text-muted-foreground">Set a reminder to reach out or check on status</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl">
              {errorMsg}
            </div>
          )}

          {/* Searchable Application Selector */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground">
              Target Application <span className="text-red-500">*</span>
            </label>
            <SearchableApplicationSelect
              value={applicationId}
              onChange={setApplicationId}
              applications={applications}
              isLoading={appsLoading}
              placeholder="Search by company or designation..."
              required
            />
          </div>

          {/* Reminder Title */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground">
              Reminder Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Email HR regarding application status"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-black/20 border border-border/20 focus:border-[#1C3627] dark:focus:border-[#A3B18A] outline-none text-sm transition-colors"
              required
            />
          </div>

          {/* Date Picker */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-muted-foreground" /> Due Date & Time <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-black/20 border border-border/20 focus:border-[#1C3627] dark:focus:border-[#A3B18A] outline-none text-sm transition-colors text-foreground"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-muted-foreground" /> Note / Description (Optional)
            </label>
            <textarea
              placeholder="e.g. Send polite email to recruiter after 7 days since interview"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-black/20 border border-border/20 focus:border-[#1C3627] dark:focus:border-[#A3B18A] outline-none text-sm transition-colors resize-none"
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={createMutation.isPending}
              className="rounded-xl border-border/20"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending}
              className="rounded-xl bg-[#1C3627] hover:bg-[#1C3627]/90 text-white dark:bg-[#A3B18A] dark:hover:bg-[#A3B18A]/90 dark:text-[#1C3627] font-semibold"
            >
              {createMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Scheduling...
                </>
              ) : (
                "Set Reminder"
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
