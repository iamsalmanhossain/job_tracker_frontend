import { Calendar, ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { PendingFollowUp } from "@/types/dashboard.types"

export function DashboardPendingFollowUps({ followUps }: { followUps: PendingFollowUp[] }) {
  return (
    <div className="bg-white dark:bg-[#111D15] rounded-2xl p-6 border border-border/10 shadow-sm flex flex-col h-[400px]">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <h3 className="font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-amber-500" />
          Pending Follow Ups
        </h3>
        <Link href="/dashboard/tasks" className="text-xs font-semibold text-[#1C3627] dark:text-[#A3B18A] hover:underline flex items-center gap-1">
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
        {followUps.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-10">All caught up!</p>
        ) : (
          followUps.map(task => (
            <div key={task.id} className="p-4 rounded-xl border border-border/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#1C3627] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {task.jobApplication.companyName.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 overflow-hidden">
                  <h4 className="font-semibold text-sm truncate">{task.jobApplication.companyName}</h4>
                  <p className="text-[11px] text-muted-foreground truncate">{task.jobApplication.jobTitle}</p>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-500 rounded-md shrink-0">
                  {task.status}
                </span>
              </div>
              <h5 className="font-medium text-sm text-foreground mb-1">{task.title}</h5>
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{task.description}</p>
              <div className="flex items-center gap-2 mt-3 text-[11px] font-medium text-muted-foreground bg-white dark:bg-black/20 w-fit px-2 py-1 rounded-md">
                <Calendar className="w-3 h-3" />
                {new Date(task.scheduledAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
