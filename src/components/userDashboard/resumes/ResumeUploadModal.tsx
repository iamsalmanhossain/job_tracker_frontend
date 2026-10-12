"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, FileText, Check, Loader2 } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ResumeService } from "@/services/resume.service"
import { FileUploader } from "@/components/ui/file-uploader"
import { UploadResponse } from "@/services/upload.service"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

interface ResumeUploadModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ResumeUploadModal({ isOpen, onClose }: ResumeUploadModalProps) {
  const [title, setTitle] = useState("")
  const [fileUrl, setFileUrl] = useState("")
  const [publicId, setPublicId] = useState<string | undefined>()
  const [isDefault, setIsDefault] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: () => ResumeService.create({ title, fileUrl, publicId, isDefault }),
    onSuccess: () => {
      toast.success("Resume added successfully!")
      queryClient.invalidateQueries({ queryKey: ["resumes"] })
      handleClose()
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || err?.message || "Failed to create resume")
    },
  })

  const handleClose = () => {
    setTitle("")
    setFileUrl("")
    setPublicId(undefined)
    setIsDefault(false)
    setErrorMsg(null)
    onClose()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      setErrorMsg("Please enter a title for this resume.")
      return
    }
    if (!fileUrl) {
      setErrorMsg("Please upload a resume file first.")
      return
    }
    setErrorMsg(null)
    createMutation.mutate()
  }

  const handleUploadSuccess = (response: UploadResponse, file: File) => {
    if (response?.data?.fileUrl) {
      setFileUrl(response.data.fileUrl)
      if (response.data.fileId) {
        setPublicId(response.data.fileId)
      }
      if (!title) {
        // Auto-populate title from file name without extension
        const cleanName = file.name.replace(/\.[^/.]+$/, "")
        setTitle(cleanName)
      }
      setErrorMsg(null)
    }
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
        <div className="flex items-center justify-between p-6 border-b border-border/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#1C3627]/10 dark:bg-[#A3B18A]/10 text-[#1C3627] dark:text-[#A3B18A]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Upload Resume</h2>
              <p className="text-xs text-muted-foreground">Add a resume version to use for job applications</p>
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
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {errorMsg && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-xl">
              {errorMsg}
            </div>
          )}

          {/* Title input */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground">
              Resume Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Senior Frontend Engineer - 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-black/20 border border-border/20 focus:border-[#1C3627] dark:focus:border-[#A3B18A] outline-none text-sm transition-colors"
              required
            />
          </div>

          {/* Reusable File Uploader */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground">
              Resume File (PDF or Document) <span className="text-red-500">*</span>
            </label>
            <FileUploader
              accept=".pdf,.doc,.docx,application/pdf"
              maxSize={10 * 1024 * 1024}
              maxFiles={1}
              autoUpload={true}
              onUploadSuccess={handleUploadSuccess}
            />
            {fileUrl && (
              <p className="text-xs text-[#1C3627] dark:text-[#A3B18A] flex items-center gap-1.5 font-medium mt-1">
                <Check className="w-3.5 h-3.5" /> File uploaded and ready to attach.
              </p>
            )}
          </div>

          {/* Default Checkbox */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-border/10 cursor-pointer" onClick={() => setIsDefault(!isDefault)}>
            <input
              type="checkbox"
              id="isDefault"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              className="w-4 h-4 rounded text-[#1C3627] focus:ring-[#1C3627] accent-[#1C3627] dark:accent-[#A3B18A] cursor-pointer"
            />
            <label htmlFor="isDefault" className="text-sm font-medium text-foreground cursor-pointer select-none">
              Set as default resume for new applications
            </label>
          </div>

          {/* Footer Actions */}
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
              disabled={createMutation.isPending || !fileUrl}
              className="rounded-xl bg-[#1C3627] hover:bg-[#1C3627]/90 text-white dark:bg-[#A3B18A] dark:hover:bg-[#A3B18A]/90 dark:text-[#1C3627] font-semibold"
            >
              {createMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
                </>
              ) : (
                "Save Resume"
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
