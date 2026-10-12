"use client"

import React, { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus, Trash2, Edit2, Check, X, Loader2, StickyNote, Clock } from "lucide-react"
import { NoteService } from "@/services/note.service"
import { ApplicationNote } from "@/types/note.types"
import { Button } from "@/components/ui/button"
import { ConfirmModal } from "@/components/ui/confirm-modal"
import { toast } from "sonner"

interface ApplicationNotesPanelProps {
  applicationId: string
}

export function ApplicationNotesPanel({ applicationId }: ApplicationNotesPanelProps) {
  const [newContent, setNewContent] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState("")
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const { data: res, isLoading } = useQuery({
    queryKey: ["applicationNotes", applicationId],
    queryFn: () => NoteService.getAll({ applicationId }),
    enabled: !!applicationId,
  })

  const rawData = res?.data
  const notes: ApplicationNote[] = Array.isArray(rawData)
    ? rawData
    : Array.isArray((rawData as any)?.notes)
    ? (rawData as any).notes
    : Array.isArray((rawData as any)?.data)
    ? (rawData as any).data
    : []

  // Create mutation
  const createMutation = useMutation({
    mutationFn: () => NoteService.create({ applicationId, content: newContent.trim() }),
    onSuccess: () => {
      toast.success("Note added successfully")
      setNewContent("")
      queryClient.invalidateQueries({ queryKey: ["applicationNotes", applicationId] })
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || err?.message || "Failed to add note")
    },
  })

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) =>
      NoteService.update(id, { content }),
    onSuccess: () => {
      toast.success("Note updated")
      setEditingId(null)
      setEditContent("")
      queryClient.invalidateQueries({ queryKey: ["applicationNotes", applicationId] })
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || err?.message || "Failed to update note")
    },
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => NoteService.delete(id),
    onSuccess: () => {
      toast.success("Note deleted")
      setDeleteTargetId(null)
      queryClient.invalidateQueries({ queryKey: ["applicationNotes", applicationId] })
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || err?.message || "Failed to delete note")
    },
  })

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newContent.trim()) return
    createMutation.mutate()
  }

  const startEdit = (note: ApplicationNote) => {
    setEditingId(note.id)
    setEditContent(note.content)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditContent("")
  }

  const saveEdit = (id: string) => {
    if (!editContent.trim()) return
    updateMutation.mutate({ id, content: editContent.trim() })
  }

  return (
    <div className="space-y-6">
      {/* Quick Add Form */}
      <form onSubmit={handleAddSubmit} className="space-y-3">
        <label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
          <StickyNote className="w-4 h-4 text-[#A3B18A]" /> Add Application Note
        </label>
        <div className="relative">
          <textarea
            placeholder="Jot down interview questions, salary negotiation notes, preparation logs..."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-border/20 focus:border-[#1C3627] dark:focus:border-[#A3B18A] outline-none text-sm transition-colors resize-none placeholder:text-muted-foreground/60"
          />
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={createMutation.isPending || !newContent.trim()}
            className="rounded-xl bg-[#1C3627] hover:bg-[#1C3627]/90 text-white dark:bg-[#A3B18A] dark:hover:bg-[#A3B18A]/90 dark:text-[#1C3627] text-xs font-semibold gap-1.5"
          >
            {createMutation.isPending ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Adding...
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" /> Add Note
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Notes List / Timeline */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Activity Notes ({notes.length})
          </h4>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        ) : notes.length === 0 ? (
          <div className="p-6 rounded-xl border border-dashed border-border/20 text-center bg-black/5 dark:bg-white/5">
            <p className="text-xs text-muted-foreground">
              No notes added yet for this application. Use the box above to keep logs.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notes.map((note) => {
              const isEditing = editingId === note.id
              const dateStr = new Date(note.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })

              return (
                <div
                  key={note.id}
                  className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-border/10 transition-colors space-y-2 group"
                >
                  <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {dateStr}
                    </span>

                    {!isEditing && (
                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => startEdit(note)}
                          className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                          title="Edit note"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteTargetId(note.id)}
                          disabled={deleteMutation.isPending}
                          className="p-1 rounded-md hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors"
                          title="Delete note"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="space-y-2 pt-1">
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#111D15] border border-border/30 text-sm outline-none resize-none"
                      />
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="px-2.5 py-1 text-xs rounded-lg border border-border/20 text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => saveEdit(note.id)}
                          disabled={updateMutation.isPending || !editContent.trim()}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg bg-[#1C3627] text-white dark:bg-[#A3B18A] dark:text-[#1C3627] font-semibold"
                        >
                          <Check className="w-3 h-3" /> Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                      {note.content}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={() => {
          if (deleteTargetId) {
            deleteMutation.mutate(deleteTargetId)
          }
        }}
        title="Delete Note?"
        description="Are you sure you want to delete this note? This action cannot be undone."
        confirmText="Delete Note"
        isLoading={deleteMutation.isPending}
        variant="danger"
      />
    </div>
  )
}
