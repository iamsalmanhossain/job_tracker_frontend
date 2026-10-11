"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangle, Trash2, Info, CheckCircle2, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  variant?: "danger" | "warning" | "info"
  isLoading?: boolean
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  isLoading = false,
}: ConfirmModalProps) {
  if (!isOpen) return null

  const getVariantStyles = () => {
    switch (variant) {
      case "danger":
        return {
          icon: <Trash2 className="w-5 h-5 text-red-500" />,
          iconBg: "bg-red-500/10 text-red-500 border border-red-500/20",
          confirmBtn: "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/20",
        }
      case "warning":
        return {
          icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
          iconBg: "bg-amber-500/10 text-amber-500 border border-amber-500/20",
          confirmBtn: "bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-500/20",
        }
      case "info":
      default:
        return {
          icon: <Info className="w-5 h-5 text-[#1C3627] dark:text-[#A3B18A]" />,
          iconBg: "bg-[#1C3627]/10 dark:bg-[#A3B18A]/10 text-[#1C3627] dark:text-[#A3B18A] border border-[#1C3627]/20",
          confirmBtn: "bg-[#1C3627] hover:bg-[#15291d] text-white dark:bg-[#A3B18A] dark:text-[#1C3627] dark:hover:bg-[#8e9a78]",
        }
    }
  }

  const styles = getVariantStyles()

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={isLoading ? undefined : onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-md bg-white dark:bg-[#111D15] rounded-3xl p-6 shadow-2xl border border-border/40 z-10 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            disabled={isLoading}
            className="absolute top-4 right-4 p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${styles.iconBg}`}>
              {styles.icon}
            </div>

            <div className="flex-1 pr-4">
              <h3 className="text-lg font-bold text-foreground">
                {title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              disabled={isLoading}
              className="rounded-xl px-4 text-xs font-semibold"
            >
              {cancelText}
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={onConfirm}
              disabled={isLoading}
              className={`rounded-xl px-5 text-xs font-bold transition-all ${styles.confirmBtn}`}
            >
              {isLoading ? "Processing..." : confirmText}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
