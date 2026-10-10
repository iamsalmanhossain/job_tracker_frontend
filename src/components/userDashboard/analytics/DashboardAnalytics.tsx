"use client"

import { useQuery } from "@tanstack/react-query"
import { DashboardService } from "@/services/dashboard.service"
import { useAuthStore } from "@/store/auth.store"
import { useState, useEffect } from "react"
import { XCircle } from "lucide-react"

import { DashboardHeader } from "./DashboardHeader"
import { DashboardStatsGrid } from "./DashboardStatsGrid"
import { DashboardChartsRow } from "./DashboardChartsRow"
import { DashboardUpcomingInterviews } from "./DashboardUpcomingInterviews"
import { DashboardPendingFollowUps } from "./DashboardPendingFollowUps"
import { DashboardRecentApplications } from "./DashboardRecentApplications"

export function DashboardAnalytics() {
  const { user } = useAuthStore()
  const [greeting, setGreeting] = useState("Good morning")
  const [currentDate, setCurrentDate] = useState("")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) setGreeting("Good morning")
    else if (hour >= 12 && hour < 17) setGreeting("Good afternoon")
    else setGreeting("Good evening")

    setCurrentDate(new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' }))
  }, [])

  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboardData', user?.id], // Cache scoped by user ID to prevent data leak across accounts
    queryFn: () => DashboardService.getDashboardData(),
    enabled: !!user?.id, // Only fetch if user ID is available
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1C3627] dark:border-[#A3B18A]"></div>
      </div>
    )
  }

  if (error || !data?.data) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
        <XCircle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-xl font-semibold">Failed to load dashboard</h3>
        <p className="text-muted-foreground mt-2">Please try refreshing the page.</p>
      </div>
    )
  }

  const { stats, upcomingInterviews, pendingFollowUps, recentApplications } = data.data

  return (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in duration-500 pb-10">
      
      {/* Header Section */}
      <DashboardHeader 
        greeting={greeting} 
        userName={user?.name?.split(' ')[0] || 'User'} 
        currentDate={currentDate} 
      />

      {/* Top Stats Grid */}
      <DashboardStatsGrid stats={stats} />

      {/* Middle Charts & Promo row */}
      <DashboardChartsRow stats={stats} />

      {/* Bottom Lists Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DashboardUpcomingInterviews interviews={upcomingInterviews} />
        <DashboardPendingFollowUps followUps={pendingFollowUps} />
        <DashboardRecentApplications applications={recentApplications} />
      </div>

    </div>
  )
}
