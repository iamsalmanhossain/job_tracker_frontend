"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { X, Calendar, Video, User, Mail, FileText, Loader2, Link as LinkIcon } from "lucide-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { InterviewService } from "@/services/interview.service"
import { JobApplicationService } from "@/services/jobApplication.service"
import { InterviewType, InterviewStatus } from "@/types/interview.types"
import { Button } from "@/components/ui/button"
import { SearchableApplicationSelect } from "@/components/ui/searchable-application-select"
import { toast } from "sonner"

interface ScheduleInterviewModalProps {
  isOpen: boolean
  onClose: () => void
  initialApplicationId?: string
}

const INTERVIEW_TYPES: { label: string; value: InterviewType }[] = [
  { label: "Technical Round", value: "TECHNICAL" },
  { label: "Video Call", value: "VIDEO" },
  { label: "Phone Screen", value: "PHONE" },
  { label: "HR / Culture Fit", value: "HR" },
  { label: "Onsite Interview", value: "ONSITE" },
  { label: "Final Round", value: "FINAL" },
  { label: "Other", value: "OTHER" },
]

export function ScheduleInterviewModal({
  isOpen,
  onClose,
  initialApplicationId = "",
}: ScheduleInterviewModalProps) {
  const [applicationId, setApplicationId] = useState(initialApplicationId)
  const [type, setType] = useState<InterviewType>("TECHNICAL")
  const [status, setStatus] = useState<InterviewStatus>("SCHEDULED")
  const [scheduledAt, setScheduledAt] = useState("")
  const [meetingLink, setMeetingLink] = useState("")
  const [interviewerName, setInterviewerName] = useState("")
  const [interviewerEmail, setInterviewerEmail] = useState("")
  const [notes, setNotes] = useState("")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const queryClient = useQueryClient()

  // Fetch applications for selector
  const { data: appsData, isLoading: appsLoading } = useQuery({
    queryKey: ["allApplicationsForInterview"],
    queryFn: () => JobApplicationService.getAll(1, 100),
    enabled: isOpen,
  })

  const applications = appsData?.data || []

  const scheduleMutation = useMutation({
    mutationFn: () =>
      InterviewService.create({
        applicationId,
        type,
        status,
        scheduledAt: new Date(scheduledAt).toISOString(),
        meetingLink: meetingLink.trim() || undefined,
        interviewerName: interviewerName.trim() || undefined,
        interviewerEmail: interviewerEmail.trim() || undefined,
        notes: notes.trim() || undefined,
      }),
    onSuccess: () => {
      toast.success("Interview scheduled successfully!")
      queryClient.invalidateQueries({ queryKey: ["interviews"] })
      handleClose()
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || err?.message || "Failed to schedule interview")
    },
  })

  const handleClose = () => {
    setApplicationId(initialApplicationId)
    setType("TECHNICAL")
    setStatus("SCHEDULED")
    setScheduledAt("")
    setMeetingLink("")
    setInterviewerName("")
    setInterviewerEmail("")
    setNotes("")
    setErrorMsg(null)
    onClose()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!applicationId) {
      setErrorMsg("Please select a job application.")
      return
    }
    if (!scheduledAt) {
      setErrorMsg("Please select date and time for the interview.")
      return
    }
    setErrorMsg(null)
    scheduleMutation.mutate()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white dark:bg-[#111D15] border border-border/20 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Schedule Interview</h2>
              <p className="text-xs text-muted-foreground">Log or schedule an interview session</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden flex-1">
          {errorMsg && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl">
              {errorMsg}
            </div>
          )}

          {/* Searchable Job Application Dropdown */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground">
              Job Application <span className="text-red-500">*</span>
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

          {/* Type and Date Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-foreground">
                Interview Type <span className="text-red-500">*</span>
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as InterviewType)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-black/20 border border-border/20 focus:border-[#1C3627] dark:focus:border-[#A3B18A] outline-none text-sm transition-colors text-foreground dark:[color-scheme:dark] [color-scheme:light]"
              >
                {INTERVIEW_TYPES.map((t) => (
                  <option key={t.value} value={t.value} className="bg-white dark:bg-[#111D15] text-neutral-900 dark:text-neutral-100">
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-foreground">
                Date & Time <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-black/20 border border-border/20 focus:border-[#1C3627] dark:focus:border-[#A3B18A] outline-none text-sm transition-colors text-foreground"
                required
              />
            </div>
          </div>

          {/* Meeting Link */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5 text-muted-foreground" /> Meeting Link (Optional)
            </label>
            <input
              type="url"
              placeholder="https://meet.google.com/xyz-abc-def or Zoom link"
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-black/20 border border-border/20 focus:border-[#1C3627] dark:focus:border-[#A3B18A] outline-none text-sm transition-colors"
            />
          </div>

          {/* Interviewer Info Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-muted-foreground" /> Interviewer Name
              </label>
              <input
                type="text"
                placeholder="e.g. Sarah Connor"
                value={interviewerName}
                onChange={(e) => setInterviewerName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-black/20 border border-border/20 focus:border-[#1C3627] dark:focus:border-[#A3B18A] outline-none text-sm transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-muted-foreground" /> Interviewer Email
              </label>
              <input
                type="email"
                placeholder="sarah@company.com"
                value={interviewerEmail}
                onChange={(e) => setInterviewerEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-black/20 border border-border/20 focus:border-[#1C3627] dark:focus:border-[#A3B18A] outline-none text-sm transition-colors"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-muted-foreground" /> Preparation Notes / Topics
            </label>
            <textarea
              placeholder="e.g. System design, GraphQL fundamentals, portfolio review..."
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-black/20 border border-border/20 focus:border-[#1C3627] dark:focus:border-[#A3B18A] outline-none text-sm transition-colors resize-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={scheduleMutation.isPending}
              className="rounded-xl border-border/20"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={scheduleMutation.isPending}
              className="rounded-xl bg-[#1C3627] hover:bg-[#1C3627]/90 text-white dark:bg-[#A3B18A] dark:hover:bg-[#A3B18A]/90 dark:text-[#1C3627] font-semibold"
            >
              {scheduleMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Scheduling...
                </>
              ) : (
                "Schedule Interview"
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
