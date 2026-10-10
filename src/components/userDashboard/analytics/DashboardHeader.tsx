import { Calendar } from "lucide-react"

interface DashboardHeaderProps {
  greeting: string
  userName: string
  currentDate: string
}

export function DashboardHeader({ greeting, userName, currentDate }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
          {greeting}, {userName} <span className="text-2xl animate-bounce-short">👋</span>
        </h1>
        <p className="text-muted-foreground mt-1.5">Here&apos;s your job search progress at a glance.</p>
      </div>
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-black/5 dark:bg-white/5 py-2 px-4 rounded-full w-fit">
        <Calendar className="w-4 h-4" />
        {currentDate || "Loading date..."}
      </div>
    </div>
  )
}
