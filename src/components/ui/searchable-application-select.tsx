"use client"

import React, { useState, useRef, useEffect, useMemo } from "react"
import { Search, ChevronDown, Check, X, Building2, Briefcase, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { JobApplicationListItem } from "@/types/job-application.types"

interface SearchableApplicationSelectProps {
  value: string
  onChange: (id: string) => void
  applications: JobApplicationListItem[]
  isLoading?: boolean
  placeholder?: string
  required?: boolean
}

export function SearchableApplicationSelect({
  value,
  onChange,
  applications,
  isLoading = false,
  placeholder = "-- Select Application --",
  required = false,
}: SearchableApplicationSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Find currently selected application
  const selectedApp = useMemo(() => {
    return applications.find((app) => app.id === value)
  }, [applications, value])

  // Filter applications by company name or job title / designation
  const filteredApplications = useMemo(() => {
    if (!searchQuery.trim()) return applications
    const q = searchQuery.toLowerCase().trim()
    return applications.filter((app) => {
      const company = (app.companyName || "").toLowerCase()
      const title = (app.jobTitle || "").toLowerCase()
      const location = (app.location || "").toLowerCase()
      return company.includes(q) || title.includes(q) || location.includes(q)
    })
  }, [applications, searchQuery])

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  // Focus search input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus()
      }, 50)
    } else {
      setSearchQuery("")
    }
  }, [isOpen])

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Hidden input for HTML form validation */}
      {required && (
        <input
          type="text"
          value={value}
          required={required}
          onChange={() => {}}
          className="sr-only"
          tabIndex={-1}
        />
      )}

      {/* Trigger Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full min-h-[44px] px-3.5 py-2 rounded-xl bg-black/5 dark:bg-black/20 border transition-all cursor-pointer flex items-center justify-between gap-2 select-none ${
          isOpen
            ? "border-[#1C3627] dark:border-[#A3B18A] ring-1 ring-[#1C3627]/20 dark:ring-[#A3B18A]/20"
            : "border-border/20 hover:border-border/40"
        }`}
      >
        {isLoading ? (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading applications...
          </div>
        ) : selectedApp ? (
          <div className="flex items-center gap-2.5 overflow-hidden flex-1">
            <div className="w-7 h-7 rounded-lg bg-[#1C3627]/10 dark:bg-[#A3B18A]/10 text-[#1C3627] dark:text-[#A3B18A] font-bold text-xs flex items-center justify-center shrink-0">
              {selectedApp.companyName.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex flex-col overflow-hidden text-left leading-tight">
              <span className="text-sm font-semibold text-foreground truncate">
                {selectedApp.companyName}
              </span>
              <span className="text-xs text-muted-foreground truncate">
                {selectedApp.jobTitle}
              </span>
            </div>
            {selectedApp.status && (
              <span className="ml-auto mr-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/5 dark:bg-white/5 border border-border/10 text-foreground shrink-0">
                {selectedApp.status}
              </span>
            )}
          </div>
        ) : (
          <span className="text-sm text-muted-foreground">{placeholder}</span>
        )}

        <div className="flex items-center gap-1 shrink-0 ml-1">
          {selectedApp && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onChange("")
              }}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              title="Clear selection"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <ChevronDown
            className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* Searchable Dropdown Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full mt-1.5 bg-white dark:bg-[#111D15] border border-border/20 rounded-2xl shadow-2xl z-[100] overflow-hidden flex flex-col"
          >
            {/* Search Input Box */}
            <div className="p-2.5 border-b border-border/10">
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search by company or designation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-black/5 dark:bg-white/5 rounded-xl border border-border/10 focus:border-[#1C3627] dark:focus:border-[#A3B18A] outline-none text-foreground placeholder:text-muted-foreground/60 transition-colors"
                />
              </div>
            </div>

            {/* Application List */}
            <div className="max-h-60 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden p-1.5 space-y-1">
              {filteredApplications.length === 0 ? (
                <div className="py-6 text-center text-xs text-muted-foreground">
                  No applications found matching &quot;{searchQuery}&quot;
                </div>
              ) : (
                filteredApplications.map((app) => {
                  const isSelected = app.id === value
                  const dateStr = app.appliedAt
                    ? new Date(app.appliedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : ""

                  return (
                    <div
                      key={app.id}
                      onClick={() => {
                        onChange(app.id)
                        setIsOpen(false)
                      }}
                      className={`flex items-center justify-between gap-3 px-3 py-2 rounded-xl cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-[#1C3627]/10 dark:bg-[#A3B18A]/15 text-[#1C3627] dark:text-[#A3B18A]"
                          : "hover:bg-black/5 dark:hover:bg-white/5 text-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 border border-border/10 flex items-center justify-center font-bold text-xs text-foreground shrink-0">
                          {app.companyName.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="flex flex-col overflow-hidden text-left">
                          <span className="text-xs font-bold text-foreground truncate">
                            {app.companyName}
                          </span>
                          <span className="text-[11px] text-muted-foreground truncate">
                            {app.jobTitle}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-border/10 text-muted-foreground">
                          {app.status}
                        </span>
                        {dateStr && (
                          <span className="text-[10px] text-muted-foreground hidden sm:inline">
                            {dateStr}
                          </span>
                        )}
                        {isSelected && <Check className="w-4 h-4 text-[#1C3627] dark:text-[#A3B18A]" />}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
