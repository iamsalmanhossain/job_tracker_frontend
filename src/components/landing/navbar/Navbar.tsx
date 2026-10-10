"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Menu, LayoutDashboard, LogOut } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState, useRef } from "react"
import { useAuthStore } from "@/store/auth.store"
import { AuthService } from "@/services/auth.service"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuthStore()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      await AuthService.logout()
    } catch (e) {
      console.error(e)
    } finally {
      logout()
      setIsDropdownOpen(false)
    }
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md"
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-[#1C3627] dark:bg-[#A3B18A] flex items-center justify-center">
             <LayoutDashboard className="w-4 h-4 text-white dark:text-[#1C3627]" />
          </div>
          <span className="text-xl font-bold text-foreground">nextstep.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {['Customers', 'Features', 'Pricing'].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, '-')}`}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          {mounted && (
            <button 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-muted-foreground hover:text-foreground hidden md:block"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}

          {!mounted ? (
            <div className="w-[150px] h-10 hidden sm:block"></div>
          ) : isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1C3627] to-[#A3B18A] flex items-center justify-center overflow-hidden border border-border/10 hover:ring-2 ring-offset-2 ring-offset-background ring-[#A3B18A]/50 transition-all"
              >
                {user?.profileImage ? (
                  <img src={user.profileImage} alt="User" className="w-full h-full object-cover" />
                ) : <span className="text-white text-sm font-bold font-sans">{user?.name?.charAt(0) || 'U'}</span>}
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-[220px] bg-white dark:bg-[#111D15] border border-border/10 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200 py-1">
                  <div className="px-3 py-2 border-b border-border/10 mb-1">
                    <p className="text-sm font-medium text-foreground truncate">{user?.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>
                  <Link href="/dashboard" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-foreground hover:bg-[#1C3627]/5 dark:hover:bg-[#A3B18A]/10 transition-colors">
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="flex items-center w-full gap-3 px-3 py-2 text-[13px] font-medium text-red-500 hover:bg-red-500/10 transition-colors text-left mt-1 border-t border-border/10 pt-2">
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="hidden sm:block text-sm font-medium text-muted-foreground hover:text-foreground">
                Sign in
              </Link>
              <Link href="/register" className="hidden sm:inline-flex items-center justify-center bg-[#1C3627] hover:bg-[#15291d] text-white dark:bg-[#A3B18A] dark:text-[#1C3627] dark:hover:bg-[#8e9a78] font-semibold rounded-full px-6 text-sm h-10 transition-colors">
                Get started <span className="ml-2">→</span>
              </Link>
            </>
          )}

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-foreground ml-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-background border-b border-border/40 px-4 py-6 flex flex-col gap-4 shadow-lg"
        >
          {['Customers', 'Features', 'Pricing'].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, '-')}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base text-foreground font-medium"
            >
              {item}
            </Link>
          ))}
          <div className="pt-4 border-t border-border/40 flex flex-col gap-4">
            {mounted && (
              <button 
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center justify-between text-foreground w-full"
              >
                <span>Toggle Theme</span>
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
            {!mounted ? null : !isAuthenticated ? (
              <>
                <Link href="/login" className="text-base text-foreground font-medium">
                  Sign in
                </Link>
                <Link href="/register" className="flex items-center justify-center w-full bg-[#1C3627] hover:bg-[#15291d] text-white dark:bg-[#A3B18A] dark:text-[#1C3627] dark:hover:bg-[#8e9a78] font-semibold rounded-full px-6 h-12 transition-colors">
                  Get started
                </Link>
              </>
            ) : (
              <>
                <Link href="/dashboard" className="text-base text-foreground font-medium flex items-center gap-2">
                  <LayoutDashboard className="w-5 h-5" /> Dashboard
                </Link>
                <button onClick={handleLogout} className="text-base text-red-500 font-medium flex items-center gap-2 w-full text-left">
                  <LogOut className="w-5 h-5" /> Log out
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
