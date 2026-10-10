"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { JobApplicationService } from "@/services/jobApplication.service"
import { useAuthStore } from "@/store/auth.store"
import { Plus, Loader2, MoreVertical, Eye, Edit, Trash2, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

import { JobApplicationListItem } from "@/types/job-application.types"
import { ApplicationFormModal } from "./ApplicationFormModal"
import { ApplicationDetailsModal } from "./ApplicationDetailsModal"


const STATUS_COLORS: Record<string, string> = {
  APPLIED: "bg-[#A3B18A]/10 text-[#1C3627] dark:text-[#A3B18A]",
  SCREENING: "bg-amber-500/10 text-amber-600 dark:text-amber-500",
  INTERVIEW: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  OFFER: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  REJECTED: "bg-red-500/10 text-red-600 dark:text-red-400",
}

const PRIORITY_COLORS: Record<string, string> = {
  LOW: "bg-gray-500/10 text-gray-600 dark:text-gray-400",
  MEDIUM: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500",
  HIGH: "bg-red-500/10 text-red-600 dark:text-red-400",
}

export function ApplicationsPageContent() {
  const { user } = useAuthStore()
  const queryClient = useQueryClient()
  
  const [page, setPage] = useState(1)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null)
  const [editAppId, setEditAppId] = useState<string | null>(null)

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("ALL")

  // Fetch Stats
  const { data: statsData } = useQuery({
    queryKey: ['applicationsStats', user?.id],
    queryFn: () => JobApplicationService.getStats(),
    enabled: !!user?.id,
  })

  // Fetch Paginated List
  const { data: listData, isLoading } = useQuery({
    queryKey: ['applicationsList', user?.id, page],
    queryFn: () => JobApplicationService.getAll(page, 10),
    enabled: !!user?.id,
  })

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => JobApplicationService.delete(id),
    onSuccess: () => {
      toast.success("Application deleted successfully")
      queryClient.invalidateQueries({ queryKey: ['applicationsList'] })
      queryClient.invalidateQueries({ queryKey: ['applicationsStats'] })
      queryClient.invalidateQueries({ queryKey: ['dashboardData'] })
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete application")
    }
  })

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this application? This action cannot be undone.")) {
      deleteMutation.mutate(id)
    }
  }

  const handleEdit = (id: string) => {
    setEditAppId(id)
    setIsFormOpen(true)
  }

  const handleViewDetails = (id: string) => {
    setSelectedAppId(id)
    setIsDetailsOpen(true)
  }

  const stats = statsData?.data

  // Client-side filtering
  const filteredList = listData?.data.filter((app: JobApplicationListItem) => {
    const matchesSearch = app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "ALL" || app.status === filterStatus
    return matchesSearch && matchesFilter
  }) || []

  return (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500 pb-10">
      
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Applications</h1>
          <p className="text-muted-foreground mt-1">Manage and track your job applications.</p>
        </div>
        <Button 
          onClick={() => { setEditAppId(null); setIsFormOpen(true); }}
          className="bg-[#1C3627] hover:bg-[#1C3627]/90 text-white dark:bg-[#A3B18A] dark:hover:bg-[#A3B18A]/90 dark:text-[#1C3627] font-semibold rounded-xl"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Application
        </Button>
      </div>

      {/* Stats Rows */}
      {stats && (
        <div className="space-y-4">
          {/* Top Row: 6 Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: "Total", val: stats.totalApplications },
              { label: "Applied", val: stats.applied },
              { label: "Screening", val: stats.screening },
              { label: "Offer", val: stats.offer },
              { label: "Rejected", val: stats.rejected },
              { label: "Active Pipeline", val: stats.activePipeline },
            ].map((s, i) => (
              <div key={i} className="bg-white dark:bg-[#111D15] rounded-2xl p-4 sm:p-5 border border-border/10 shadow-sm flex flex-col items-center justify-center text-center">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">{s.label}</p>
                <h4 className="text-2xl font-bold text-foreground">{s.val}</h4>
              </div>
            ))}
          </div>
          
          {/* Bottom Row: 2 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Interview", val: stats.interview },
              { label: "Interview Rate", val: stats.interviewRate },
            ].map((s, i) => (
              <div key={i} className="bg-white dark:bg-[#111D15] rounded-2xl p-4 sm:p-5 border border-border/10 shadow-sm flex flex-col items-center justify-center text-center">
                <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-1">{s.label}</p>
                <h4 className="text-2xl font-bold text-foreground">{s.val}</h4>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Data Table Container */}
      <div className="bg-white dark:bg-[#111D15] rounded-2xl border border-border/10 shadow-sm overflow-hidden flex flex-col">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-border/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-xs">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search by company or title..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-10 pl-9 pr-4 rounded-xl border border-border/20 bg-black/5 dark:bg-white/5 text-sm outline-none focus:ring-1 focus:ring-[#A3B18A]"
            />
          </div>
          <div className="w-full sm:w-auto relative">
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none w-full sm:w-40 h-10 px-4 pr-10 rounded-xl border border-border/20 bg-black/5 dark:bg-white/5 text-sm outline-none focus:ring-1 focus:ring-[#A3B18A] cursor-pointer"
            >
              <option className="dark:bg-[#111D15] dark:text-white" value="ALL">All Status</option>
              <option className="dark:bg-[#111D15] dark:text-white" value="APPLIED">Applied</option>
              <option className="dark:bg-[#111D15] dark:text-white" value="SCREENING">Screening</option>
              <option className="dark:bg-[#111D15] dark:text-white" value="INTERVIEW">Interview</option>
              <option className="dark:bg-[#111D15] dark:text-white" value="OFFER">Offer</option>
              <option className="dark:bg-[#111D15] dark:text-white" value="REJECTED">Rejected</option>
            </select>
            <Filter className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-black/5 dark:bg-white/5 border-b border-border/10">
              <tr>
                <th className="px-6 py-4 font-semibold">Company</th>
                <th className="px-6 py-4 font-semibold">Job Title</th>
                <th className="px-6 py-4 font-semibold">Type & Loc</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Priority</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
                  </td>
                </tr>
              ) : filteredList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-muted-foreground">
                    No applications found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredList.map((app: JobApplicationListItem) => (
                  <tr key={app.id} className="border-b border-border/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#1C3627] text-white flex items-center justify-center font-bold text-xs shrink-0">
                          {app.companyName.substring(0, 2).toUpperCase()}
                        </div>
                        <span className="font-semibold text-foreground">{app.companyName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">{app.jobTitle}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-xs text-foreground font-medium">{app.jobType.replace('_', ' ')}</span>
                        <span className="text-[11px] text-muted-foreground">{app.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${STATUS_COLORS[app.status]}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${PRIORITY_COLORS[app.priority]}`}>
                        {app.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleViewDetails(app.id)} className="p-1.5 text-muted-foreground hover:text-[#1C3627] dark:hover:text-[#A3B18A] hover:bg-black/10 dark:hover:bg-white/10 rounded-md transition-colors" title="View Details">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleEdit(app.id)} className="p-1.5 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 rounded-md transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(app.id)} className="p-1.5 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {listData?.meta && (
          <div className="p-4 border-t border-border/10 flex items-center justify-between text-sm text-muted-foreground">
            <div>
              Showing {((page - 1) * listData.meta.limit) + 1} to {Math.min(page * listData.meta.limit, listData.meta.total)} of {listData.meta.total} entries
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="h-8"
              >
                Previous
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPage(p => p + 1)}
                disabled={page * listData.meta.limit >= listData.meta.total}
                className="h-8"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {isFormOpen && (
        <ApplicationFormModal 
          isOpen={isFormOpen} 
          onClose={() => { setIsFormOpen(false); setEditAppId(null); }} 
          appId={editAppId} 
        />
      )}

      {isDetailsOpen && selectedAppId && (
        <ApplicationDetailsModal 
          isOpen={isDetailsOpen} 
          onClose={() => { setIsDetailsOpen(false); setSelectedAppId(null); }} 
          appId={selectedAppId} 
        />
      )}

    </div>
  )
}
