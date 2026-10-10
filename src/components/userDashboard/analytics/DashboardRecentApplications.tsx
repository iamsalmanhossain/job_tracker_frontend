import { FileText, ArrowRight } from "lucide-react"
import Link from "next/link"
import { RecentApplication } from "@/types/dashboard.types"

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  APPLIED: { bg: "bg-[#A3B18A]/10", text: "text-[#1C3627] dark:text-[#A3B18A]" },
  SCREENING: { bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-500" },
  INTERVIEW: { bg: "bg-purple-500/10", text: "text-purple-600 dark:text-purple-400" },
  OFFER: { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400" },
  REJECTED: { bg: "bg-red-500/10", text: "text-red-600 dark:text-red-400" },
}

export function DashboardRecentApplications({ applications }: { applications: RecentApplication[] }) {
  return (
    <div className="bg-white dark:bg-[#111D15] rounded-2xl p-6 border border-border/10 shadow-sm flex flex-col h-[400px]">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <h3 className="font-bold flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#A3B18A]" />
          Recent Applications
        </h3>
        <Link href="/dashboard/applications" className="text-xs font-semibold text-[#1C3627] dark:text-[#A3B18A] hover:underline flex items-center gap-1">
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-0 pr-2">
        {applications.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-10">No recent applications.</p>
        ) : (
          applications.map((app, i) => {
            const statusTheme = STATUS_COLORS[app.status] || STATUS_COLORS.APPLIED;
            return (
              <div key={app.id} className={`flex items-center justify-between py-3 ${i !== applications.length - 1 ? 'border-b border-border/10' : ''}`}>
                <div className="flex items-center gap-3 overflow-hidden pr-3">
                  <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center font-bold text-sm shrink-0 border border-border/20 text-[#1C3627] dark:text-white">
                    {app.companyName.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-semibold text-sm truncate">{app.companyName}</h4>
                    <p className="text-xs text-muted-foreground truncate">{app.jobTitle}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${statusTheme.bg} ${statusTheme.text}`}>
                    {app.status}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    Applied: {new Date(app.appliedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
