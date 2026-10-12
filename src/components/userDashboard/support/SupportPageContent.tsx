"use client"

import React, { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import {
  HelpCircle,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Calendar,
  MessageSquare,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import { SupportTicketService } from "@/services/supportTicket.service"
import { SupportTicket, TicketStatus } from "@/types/support-ticket.types"
import { CreateTicketModal } from "./CreateTicketModal"
import { Button } from "@/components/ui/button"

const STATUS_BADGES: Record<TicketStatus, { label: string; className: string }> = {
  OPEN: {
    label: "Open",
    className: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  IN_PROGRESS: {
    label: "In Progress",
    className: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  },
  RESOLVED: {
    label: "Resolved",
    className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  CLOSED: {
    label: "Closed",
    className: "bg-muted text-muted-foreground border-border/20",
  },
}

export function SupportPageContent() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>("ALL")
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const { data: res, isLoading } = useQuery({
    queryKey: ["support-tickets", statusFilter],
    queryFn: () => SupportTicketService.getMyTickets({ status: statusFilter }),
  })

  const raw = res?.data
  const tickets: SupportTicket[] = Array.isArray(raw)
    ? raw
    : Array.isArray((raw as any)?.tickets)
    ? (raw as any).tickets
    : []

  const openCount = tickets.filter((t) => t.status === "OPEN").length
  const inProgressCount = tickets.filter((t) => t.status === "IN_PROGRESS").length
  const resolvedCount = tickets.filter((t) => t.status === "RESOLVED").length

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Help & Support Tickets
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track inquiries, technical issues, or report problems directly to our support team.
          </p>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="rounded-xl bg-[#1C3627] hover:bg-[#1C3627]/90 text-white dark:bg-[#A3B18A] dark:hover:bg-[#A3B18A]/90 dark:text-[#1C3627] font-semibold gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" /> New Support Ticket
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#111D15] border border-border/20 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Open Tickets
            </p>
            <h3 className="text-2xl font-black text-blue-500 mt-1">{openCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#111D15] border border-border/20 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              In Progress
            </p>
            <h3 className="text-2xl font-black text-purple-500 mt-1">{inProgressCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#111D15] border border-border/20 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Resolved
            </p>
            <h3 className="text-2xl font-black text-emerald-500 mt-1">{resolvedCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-border/10">
        {["ALL", "OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"].map((filter) => (
          <button
            key={filter}
            onClick={() => setStatusFilter(filter)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
              statusFilter === filter
                ? "bg-[#1C3627] text-white dark:bg-[#A3B18A] dark:text-[#1C3627]"
                : "text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground"
            }`}
          >
            {filter === "ALL"
              ? "All Tickets"
              : filter.replace("_", " ").toLowerCase().replace(/^\w/, (c) => c.toUpperCase())}
          </button>
        ))}
      </div>

      {/* Tickets List */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Loading support tickets...</p>
        </div>
      ) : tickets.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-border/40 p-12 text-center flex flex-col items-center justify-center bg-white/40 dark:bg-[#111D15]/40 backdrop-blur-sm">
          <div className="w-16 h-16 rounded-2xl bg-[#1C3627]/10 dark:bg-[#A3B18A]/10 text-[#1C3627] dark:text-[#A3B18A] flex items-center justify-center mb-4">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-1">No support tickets found</h3>
          <p className="text-sm text-muted-foreground max-w-sm mb-6">
            Need help or have questions regarding your job tracker account? Create a ticket and we will be happy to help.
          </p>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="rounded-xl bg-[#1C3627] hover:bg-[#1C3627]/90 text-white dark:bg-[#A3B18A] dark:hover:bg-[#A3B18A]/90 dark:text-[#1C3627] font-semibold gap-2"
          >
            <Plus className="w-4 h-4" /> Create First Ticket
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => {
            const isExpanded = expandedId === ticket.id
            const dateStr = new Date(ticket.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
            const badge = STATUS_BADGES[ticket.status] || {
              label: ticket.status,
              className: "bg-muted text-foreground border-border/20",
            }

            return (
              <div
                key={ticket.id}
                className="rounded-2xl bg-white dark:bg-[#111D15] border border-border/20 hover:border-border/40 transition-all duration-200 overflow-hidden shadow-sm"
              >
                {/* Header row */}
                <div
                  onClick={() => toggleExpand(ticket.id)}
                  className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-muted-foreground shrink-0 mt-0.5">
                      <MessageSquare className="w-5 h-5 text-[#1C3627] dark:text-[#A3B18A]" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-base font-bold text-foreground hover:text-[#1C3627] dark:hover:text-[#A3B18A] transition-colors">
                          {ticket.subject}
                        </h3>
                        <span
                          className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-lg border ${badge.className}`}
                        >
                          {badge.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Submitted on {dateStr}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button className="text-xs text-muted-foreground hover:text-foreground font-medium flex items-center gap-1">
                      {isExpanded ? (
                        <>
                          Hide Details <ChevronUp className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          View Details <ChevronDown className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded description body */}
                {isExpanded && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-border/10 bg-black/[0.02] dark:bg-white/[0.02] space-y-3">
                    <div className="pt-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                        Ticket Description
                      </p>
                      <div className="p-4 rounded-xl bg-white dark:bg-[#0D140F] border border-border/10 text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed">
                        {ticket.description}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Create Ticket Modal */}
      <CreateTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
