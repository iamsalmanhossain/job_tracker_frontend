import { FileText, Send, Eye, Calendar, Trophy, XCircle, TrendingUp } from "lucide-react"
import { DashboardStats } from "@/types/dashboard.types"

export function DashboardStatsGrid({ stats }: { stats: DashboardStats }) {
  const statCards = [
    { label: "Total Applications", value: stats.totalApplications, icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10", trend: "+2 this week" },
    { label: "Applied", value: stats.applied, icon: Send, color: "text-[#A3B18A]", bg: "bg-[#A3B18A]/10", subtext: `${stats.totalApplications ? Math.round((stats.applied/stats.totalApplications)*100) : 0}% of total` },
    { label: "Screening", value: stats.screening, icon: Eye, color: "text-amber-500", bg: "bg-amber-500/10", subtext: `${stats.totalApplications ? Math.round((stats.screening/stats.totalApplications)*100) : 0}% of total` },
    { label: "Interview", value: stats.interview, icon: Calendar, color: "text-purple-500", bg: "bg-purple-500/10", subtext: `${stats.totalApplications ? Math.round((stats.interview/stats.totalApplications)*100) : 0}% of total` },
    { label: "Offer", value: stats.offer, icon: Trophy, color: "text-emerald-500", bg: "bg-emerald-500/10", subtext: `${stats.totalApplications ? Math.round((stats.offer/stats.totalApplications)*100) : 0}% of total` },
    { label: "Rejected", value: stats.rejected, icon: XCircle, color: "text-red-500", bg: "bg-red-500/10", subtext: `${stats.totalApplications ? Math.round((stats.rejected/stats.totalApplications)*100) : 0}% of total` },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {statCards.map((stat, i) => (
        <div key={i} className="bg-white dark:bg-[#111D15] rounded-2xl p-4 sm:p-5 border border-border/10 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-xs sm:text-sm font-medium text-muted-foreground leading-tight">{stat.label}</p>
          </div>
          <h4 className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</h4>
          {stat.trend && (
            <div className="flex items-center gap-1 mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-3 h-3" />
              {stat.trend}
            </div>
          )}
          {stat.subtext && (
            <p className="text-xs text-muted-foreground mt-2 font-medium">{stat.subtext}</p>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#A3B18A]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
      ))}
    </div>
  )
}
