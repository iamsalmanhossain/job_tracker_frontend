"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { useAuthStore } from "@/store/auth.store"
import { useRouter } from "next/navigation"
import { useEffect, useState as useReactState } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { Sidebar } from "./Sidebar"
import { NotificationBell } from "@/components/userDashboard/notifications/NotificationBell"
import { BrandLogo } from "@/components/ui/brand-logo"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useReactState(false)
  const [isDesktopOpen, setIsDesktopOpen] = useReactState(true)
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()
  const [isHydrated, setIsHydrated] = useReactState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.push("/login")
    }
  }, [isHydrated, isAuthenticated, router])

  if (!isHydrated || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F6F8F6] dark:bg-[#000000] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1C3627] dark:border-[#A3B18A]"></div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-[#F6F8F6] dark:bg-[#080C0A] flex overflow-hidden">
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} isDesktopOpen={isDesktopOpen} />
      
      <main className={`flex-1 flex flex-col min-w-0 h-screen transition-[padding] duration-300 ease-in-out ${isDesktopOpen ? 'lg:pl-[260px]' : 'lg:pl-[64px]'}`}>
        {/* Content Area */}
        <div className="flex-1 relative h-screen flex flex-col min-w-0">
          {/* Unified Compact Responsive Header */}
          <div className="h-14 shrink-0 flex items-center justify-between px-4 sm:px-6 border-b border-border/20 bg-white dark:bg-[#111D15]">
            <div className="flex items-center gap-2.5">
              {/* Mobile Sidebar Hamburger Trigger */}
              <button
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden p-2 -ml-2 text-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors"
                aria-label="Open sidebar menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Mobile Brand Name with Logo */}
              <div className="lg:hidden flex items-center gap-2">
                <BrandLogo size={24} showText textClassName="font-bold text-base tracking-tight text-foreground" />
              </div>

              {/* Desktop Sidebar Collapse Toggle */}
              <button 
                className="hidden lg:flex items-center justify-center p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                onClick={() => setIsDesktopOpen(!isDesktopOpen)}
                aria-label="Toggle sidebar width"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/></svg>
              </button>
            </div>
            
            {/* Header Right Actions */}
            <div className="flex items-center gap-2">
              <NotificationBell />
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          {/* Scrollable Children */}
          <div className="flex-1 overflow-y-auto bg-[#F6F8F6] dark:bg-[#080C0A]">
            <div className="p-4 sm:p-6 lg:p-8">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
