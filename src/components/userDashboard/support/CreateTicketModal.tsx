"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { X, HelpCircle, FileText, Send, Loader2 } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { SupportTicketService } from "@/services/supportTicket.service"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface CreateTicketModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateTicketModal({ isOpen, onClose }: CreateTicketModalProps) {
  const [subject, setSubject] = useState("")
  const [description, setDescription] = useState("")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: () =>
      SupportTicketService.create({
        subject: subject.trim(),
        description: description.trim(),
      }),
    onSuccess: () => {
      toast.success("Support ticket submitted successfully!")
      queryClient.invalidateQueries({ queryKey: ["support-tickets"] })
      handleClose()
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || err?.message || "Failed to submit ticket")
    },
  })

  const handleClose = () => {
    setSubject("")
    setDescription("")
    setErrorMsg(null)
    onClose()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (subject.trim().length < 3) {
      setErrorMsg("Subject must be at least 3 characters long.")
      return
    }
    if (description.trim().length < 10) {
      setErrorMsg("Description must be at least 10 characters long.")
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
            <div className="p-2.5 rounded-xl bg-[#1C3627]/10 dark:bg-[#A3B18A]/10 text-[#1C3627] dark:text-[#A3B18A]">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">New Support Ticket</h2>
              <p className="text-xs text-muted-foreground">Describe your issue or feedback and our team will assist you</p>
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl">
              {errorMsg}
            </div>
          )}

          {/* Subject Field */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Unable to upload resume PDF"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-black/20 border border-border/20 focus:border-[#1C3627] dark:focus:border-[#A3B18A] outline-none text-sm transition-colors text-foreground"
              required
              minLength={3}
            />
            <p className="text-[11px] text-muted-foreground">Minimum 3 characters</p>
          </div>

          {/* Description Field */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-muted-foreground" /> Detailed Description <span className="text-red-500">*</span>
            </label>
            <textarea
              placeholder="Describe what happened, error messages received, or steps to reproduce..."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-black/20 border border-border/20 focus:border-[#1C3627] dark:focus:border-[#A3B18A] outline-none text-sm transition-colors text-foreground resize-none"
              required
              minLength={10}
            />
            <p className="text-[11px] text-muted-foreground">Minimum 10 characters</p>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-3">
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
              disabled={createMutation.isPending || subject.trim().length < 3 || description.trim().length < 10}
              className="rounded-xl bg-[#1C3627] hover:bg-[#1C3627]/90 text-white dark:bg-[#A3B18A] dark:hover:bg-[#A3B18A]/90 dark:text-[#1C3627] font-semibold gap-1.5"
            >
              {createMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Submit Ticket
                </>
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
