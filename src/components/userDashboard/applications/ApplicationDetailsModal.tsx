import { useQuery } from "@tanstack/react-query"
import { X, Loader2, MapPin, Briefcase, Calendar, DollarSign, Globe, ExternalLink, Heart, FileText, CheckCircle2 } from "lucide-react"
import { JobApplicationService } from "@/services/jobApplication.service"
import { Button } from "@/components/ui/button"

interface ApplicationDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  appId: string
}

const STATUS_COLORS: Record<string, string> = {
  APPLIED: "bg-[#A3B18A]/10 text-[#1C3627] dark:text-[#A3B18A]",
  SCREENING: "bg-amber-500/10 text-amber-600 dark:text-amber-500",
  INTERVIEW: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  OFFER: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  REJECTED: "bg-red-500/10 text-red-600 dark:text-red-400",
}

export function ApplicationDetailsModal({ isOpen, onClose, appId }: ApplicationDetailsModalProps) {
  
  const { data: appData, isLoading } = useQuery({
    queryKey: ['applicationDetails', appId],
    queryFn: () => JobApplicationService.getById(appId),
    enabled: !!appId,
  })

  if (!isOpen) return null

  const d = appData?.data

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center sm:justify-end bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in">
      <div className="bg-white dark:bg-[#111D15] w-full h-full sm:h-auto sm:max-h-[90vh] sm:w-[600px] sm:rounded-2xl shadow-2xl flex flex-col animate-in sm:slide-in-from-right-8 fade-in">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/10 shrink-0">
          <h2 className="text-xl font-bold text-foreground">Application Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          {isLoading || !d ? (
            <div className="flex items-center justify-center h-40">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="space-y-8">
              
              {/* Header Info */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#1C3627] text-white flex items-center justify-center font-bold text-2xl shrink-0 shadow-sm">
                    {d.companyName.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground leading-tight mb-1">{d.jobTitle}</h3>
                    <p className="text-muted-foreground font-medium">{d.companyName}</p>
                  </div>
                </div>
                {d.isFavorite && (
                  <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                )}
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg ${STATUS_COLORS[d.status]}`}>
                  {d.status}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 text-foreground border border-border/10">
                  {d.priority} Priority
                </span>
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 text-foreground border border-border/10">
                  {d.source}
                </span>
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-border/10">
                  <div className="p-2 bg-white dark:bg-[#111D15] rounded-lg shadow-sm">
                    <MapPin className="w-4 h-4 text-[#A3B18A]" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground mb-0.5">Location</p>
                    <p className="text-sm font-semibold text-foreground">{d.location} {d.isRemote && '(Remote)'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-border/10">
                  <div className="p-2 bg-white dark:bg-[#111D15] rounded-lg shadow-sm">
                    <Briefcase className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground mb-0.5">Job Type</p>
                    <p className="text-sm font-semibold text-foreground">{d.jobType.replace('_', ' ')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-border/10">
                  <div className="p-2 bg-white dark:bg-[#111D15] rounded-lg shadow-sm">
                    <DollarSign className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground mb-0.5">Salary</p>
                    <p className="text-sm font-semibold text-foreground">
                      {Number(d.salaryMax) > 0 
                        ? `${d.salaryMin} - ${d.salaryMax} ${d.salaryCurrency}` 
                        : 'Not specified'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-border/10">
                  <div className="p-2 bg-white dark:bg-[#111D15] rounded-lg shadow-sm">
                    <Calendar className="w-4 h-4 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground mb-0.5">Applied On</p>
                    <p className="text-sm font-semibold text-foreground">{new Date(d.appliedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              {d.description && (
                <div>
                  <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    Job Description
                  </h4>
                  <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-border/10 text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {d.description}
                  </div>
                </div>
              )}

              {/* Requirements */}
              {d.requirements && (
                <div>
                  <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                    Requirements
                  </h4>
                  <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-border/10 text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {d.requirements}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border/10 flex items-center justify-between shrink-0 bg-black/5 dark:bg-white/5 rounded-b-2xl">
          {d?.jobUrl ? (
            <Button 
              variant="outline" 
              onClick={() => window.open(d.jobUrl, '_blank')}
              className="rounded-xl border-border/20 bg-white dark:bg-[#111D15]"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Original Post
            </Button>
          ) : <div />}
          <Button onClick={onClose} className="rounded-xl bg-[#1C3627] hover:bg-[#1C3627]/90 text-white dark:bg-[#A3B18A] dark:hover:bg-[#A3B18A]/90 dark:text-[#1C3627] font-semibold">
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
