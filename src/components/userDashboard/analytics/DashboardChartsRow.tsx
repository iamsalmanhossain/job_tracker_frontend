import { Trophy, TrendingUp } from "lucide-react"
import { DashboardStats } from "@/types/dashboard.types"

export function DashboardChartsRow({ stats }: { stats: DashboardStats }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Active Pipeline */}
      <div className="bg-white dark:bg-[#111D15] rounded-2xl p-6 border border-border/10 shadow-sm">
        <h3 className="font-bold text-foreground mb-1">Application Pipeline</h3>
        <p className="text-sm text-muted-foreground mb-6">Current status of your job applications</p>
        
        <div className="flex items-center gap-6">
          <div className="relative w-32 h-32 shrink-0">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              <path
                className="text-black/5 dark:text-white/5"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="text-[#1C3627] dark:text-[#A3B18A] drop-shadow-md"
                strokeDasharray={`${(stats.activePipeline / (stats.totalApplications || 1)) * 100}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-bold">{stats.totalApplications}</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Total</span>
            </div>
          </div>
          
          <div className="flex-1 space-y-2">
            {[
              { label: 'Applied', val: stats.applied, color: 'bg-[#A3B18A]' },
              { label: 'Interview', val: stats.interview, color: 'bg-purple-500' },
              { label: 'Offer', val: stats.offer, color: 'bg-emerald-500' },
              { label: 'Rejected', val: stats.rejected, color: 'bg-red-500' }
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${item.color}`} />
                  <span className="text-muted-foreground">{item.label}</span>
                </div>
                <span className="font-semibold">{item.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interview Rate */}
      <div className="bg-white dark:bg-[#111D15] rounded-2xl p-6 border border-border/10 shadow-sm">
        <h3 className="font-bold text-foreground mb-1">Interview Rate</h3>
        <p className="text-sm text-muted-foreground mb-6">Percentage of applications that reached interview</p>
        
        <div className="flex items-center gap-6">
          <div className="relative w-32 h-32 shrink-0">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              <path
                className="text-black/5 dark:text-white/5"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="text-[#A3B18A]"
                strokeDasharray={`${parseFloat(stats.interviewRate)}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold">{stats.interviewRate}</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>+ {stats.interviewRate}</span>
            </div>
            <p className="text-xs text-muted-foreground">vs. last month</p>
            <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
              {stats.interview} interview out of {stats.totalApplications} applications
            </p>
          </div>
        </div>
      </div>

      {/* Great Progress Banner */}
      <div className="bg-gradient-to-br from-[#1C3627]/10 to-[#A3B18A]/20 dark:from-[#1C3627]/30 dark:to-[#A3B18A]/10 rounded-2xl p-6 border border-[#A3B18A]/20 shadow-sm relative overflow-hidden flex flex-col justify-center">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#A3B18A]/20 rounded-full blur-2xl" />
        <div className="w-12 h-12 bg-white/50 dark:bg-black/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm border border-white/20">
          <Trophy className="w-6 h-6 text-[#1C3627] dark:text-[#A3B18A]" />
        </div>
        <h3 className="text-xl font-bold text-[#1C3627] dark:text-[#A3B18A] mb-2">Great progress!</h3>
        <p className="text-sm text-[#1C3627]/80 dark:text-[#A3B18A]/80 leading-relaxed">
          You&apos;ve got {stats.interview} interview{stats.interview !== 1 && 's'} and {stats.offer} offer{stats.offer !== 1 && 's'}. Keep up the momentum!
        </p>
      </div>

    </div>
  )
}
