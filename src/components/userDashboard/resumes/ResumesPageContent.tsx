"use client"

import React, { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
  FileText,
  Plus,
  ExternalLink,
  Trash2,
  CheckCircle,
  Star,
  Calendar,
  Download,
  Loader2,
  FileCheck2
} from "lucide-react"
import { ResumeService } from "@/services/resume.service"
import { Resume } from "@/types/resume.types"
import { ResumeUploadModal } from "./ResumeUploadModal"
import { Button } from "@/components/ui/button"
import { ConfirmModal } from "@/components/ui/confirm-modal"
import { toast } from "sonner"

export function ResumesPageContent() {
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null)
  const queryClient = useQueryClient()

  const { data: response, isLoading } = useQuery({
    queryKey: ["resumes"],
    queryFn: () => ResumeService.getAll(),
  })

  const rawData = response?.data
  const resumes: Resume[] = Array.isArray(rawData)
    ? rawData
    : Array.isArray((rawData as any)?.resumes)
      ? (rawData as any).resumes
      : Array.isArray((rawData as any)?.data)
        ? (rawData as any).data
        : []

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => ResumeService.delete(id),
    onSuccess: () => {
      toast.success("Resume deleted successfully")
      setDeleteTarget(null)
      queryClient.invalidateQueries({ queryKey: ["resumes"] })
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || err?.message || "Failed to delete resume")
    },
  })

  // Set default mutation
  const setDefaultMutation = useMutation({
    mutationFn: (id: string) => ResumeService.setDefault(id),
    onSuccess: () => {
      toast.success("Default resume updated")
      queryClient.invalidateQueries({ queryKey: ["resumes"] })
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || err?.message || "Failed to set default resume")
    },
  })

  const handleDelete = (id: string, title: string) => {
    setDeleteTarget({ id, title })
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Resumes Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Store and manage tailored resumes for your job applications.
          </p>
        </div>

        <Button
          onClick={() => setIsUploadOpen(true)}
          className="rounded-xl bg-[#1C3627] hover:bg-[#1C3627]/90 text-white dark:bg-[#A3B18A] dark:hover:bg-[#A3B18A]/90 dark:text-[#1C3627] font-semibold gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" /> Upload Resume
        </Button>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading resumes...</p>
        </div>
      ) : resumes.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-border/40 p-12 text-center flex flex-col items-center justify-center bg-white/40 dark:bg-[#111D15]/40 backdrop-blur-sm">
          <div className="w-16 h-16 rounded-2xl bg-[#1C3627]/10 dark:bg-[#A3B18A]/10 text-[#1C3627] dark:text-[#A3B18A] flex items-center justify-center mb-4">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-1">No resumes uploaded yet</h3>
          <p className="text-sm text-muted-foreground max-w-sm mb-6">
            Upload your first resume to link it directly with your job applications and track versions easily.
          </p>
          <Button
            onClick={() => setIsUploadOpen(true)}
            className="rounded-xl bg-[#1C3627] hover:bg-[#1C3627]/90 text-white dark:bg-[#A3B18A] dark:hover:bg-[#A3B18A]/90 dark:text-[#1C3627] font-semibold gap-2"
          >
            <Plus className="w-4 h-4" /> Upload Your First Resume
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {resumes.map((resume) => {
            const isDefault = resume.isDefault
            const formattedDate = new Date(resume.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })

            return (
              <div
                key={resume.id}
                className={`relative flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-[#111D15] border transition-all duration-200 group hover:shadow-lg ${isDefault
                    ? "border-[#1C3627]/40 dark:border-[#A3B18A]/40 shadow-sm"
                    : "border-border/20 hover:border-border/40"
                  }`}
              >
                {/* Header */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#1C3627]/10 dark:bg-[#A3B18A]/10 flex items-center justify-center text-[#1C3627] dark:text-[#A3B18A] shrink-0">
                      <FileCheck2 className="w-6 h-6" />
                    </div>

                    {isDefault ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#1C3627]/10 dark:bg-[#A3B18A]/15 text-[#1C3627] dark:text-[#A3B18A] border border-[#1C3627]/20 dark:border-[#A3B18A]/30">
                        <Star className="w-3.5 h-3.5 fill-current" /> Default Resume
                      </span>
                    ) : (
                      <button
                        onClick={() => setDefaultMutation.mutate(resume.id)}
                        disabled={setDefaultMutation.isPending}
                        className="text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 px-2.5 py-1 rounded-lg transition-colors border border-border/20"
                        title="Set as default"
                      >
                        Set as Default
                      </button>
                    )}
                  </div>

                  <h3 className="font-bold text-foreground text-lg mb-2 line-clamp-1 group-hover:text-[#1C3627] dark:group-hover:text-[#A3B18A] transition-colors" title={resume.title}>
                    {resume.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span>Uploaded on {formattedDate}</span>
                  </div>
                </div>

                {/* Actions bottom bar */}
                <div className="pt-4 border-t border-border/10 flex items-center justify-between gap-2 mt-auto">
                  <div className="flex items-center gap-2">
                    <a
                      href={resume.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 text-foreground hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Preview
                    </a>
                    <a
                      href={resume.fileUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      title="Download resume"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <button
                    onClick={() => handleDelete(resume.id, resume.title)}
                    disabled={deleteMutation.isPending}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
                    title="Delete resume"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Upload Modal */}
      <ResumeUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) {
            deleteMutation.mutate(deleteTarget.id)
          }
        }}
        title="Delete Resume?"
        description={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmText="Delete Resume"
        isLoading={deleteMutation.isPending}
        variant="danger"
      />
    </div>
  )
}
