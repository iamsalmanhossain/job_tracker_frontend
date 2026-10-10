import { Calendar, ArrowRight, Clock, Link as LinkIcon, User as UserIcon } from "lucide-react"
import Link from "next/link"
import { UpcomingInterview } from "@/types/dashboard.types"

export function DashboardUpcomingInterviews({ interviews }: { interviews: UpcomingInterview[] }) {
  return (
    <div className="bg-white dark:bg-[#111D15] rounded-2xl p-6 border border-border/10 shadow-sm flex flex-col h-[400px]">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <h3 className="font-bold flex items-center gap-2">
          <Calendar className="w-5 h-5 text-purple-500" />
          Upcoming Interviews
        </h3>
        <Link href="/dashboard/interviews" className="text-xs font-semibold text-[#1C3627] dark:text-[#A3B18A] hover:underline flex items-center gap-1">
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
        {interviews.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-10">No upcoming interviews.</p>
        ) : (
          interviews.map(interview => (
            <div key={interview.id} className="p-4 rounded-xl border border-border/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1C3627] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {interview.jobApplication.companyName.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm leading-tight">{interview.jobApplication.companyName}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{interview.jobApplication.jobTitle}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-md">
                  {interview.type}
                </span>
              </div>
              
              <div className="space-y-2 mt-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>{new Date(interview.scheduledAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                </div>
                {interview.meetingLink && (
                  <div className="flex items-center gap-2">
                    <LinkIcon className="w-3.5 h-3.5 shrink-0" />
                    <a href={interview.meetingLink} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline truncate">
                      {interview.meetingLink}
                    </a>
                  </div>
                )}
                {interview.interviewerName && (
                  <div className="flex items-center gap-2">
                    <UserIcon className="w-3.5 h-3.5 shrink-0" />
                    <span>{interview.interviewerName}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
