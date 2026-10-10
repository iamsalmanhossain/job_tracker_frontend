"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { useAuthStore } from "@/store/auth.store"
import { useRouter } from "next/navigation"
import { useEffect, useState as useReactState } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { Sidebar } from "./Sidebar"

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
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center p-4 border-b border-border/20 bg-white dark:bg-[#111D15]">
          <button 
            onClick={() => setIsMobileOpen(true)}
            className="p-2 -ml-2 text-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="ml-2 font-bold text-lg">nextstep.</span>
        </div>

        {/* Content Area */}
        <div className="flex-1 relative h-screen flex flex-col min-w-0">
          {/* Header */}
          <div className="h-14 shrink-0 flex items-center px-6 gap-3 border-b border-border/20 bg-white dark:bg-[#111D15]">
            <button 
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => {
                // Toggle mobile or desktop depending on screen size
                if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
                  setIsDesktopOpen(!isDesktopOpen)
                } else {
                  setIsMobileOpen(!isMobileOpen)
                }
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/></svg>
            </button>
            
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
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
