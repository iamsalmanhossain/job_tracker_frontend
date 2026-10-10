"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Activity,
  Compass,
  Library,
  Users,
  Plus,
  LogOut,
  ChevronDown,
  ChevronRight,
  User as UserIcon,
  X,
  LayoutDashboardIcon
} from "lucide-react"
import { useAuthStore } from "@/store/auth.store"
import { AuthService } from "@/services/auth.service"
import { useRouter } from "next/navigation"

const navigation = [
  { name: 'Dashboard Analytics', href: '/dashboard', icon: LayoutDashboardIcon },
  { name: 'Applications', href: '/dashboard/applications', icon: Activity },
  { name: 'Browse', href: '/dashboard/browse', icon: Compass },
]

const spaces = [
  {
    name: 'My library',
    icon: Library,
    defaultOpen: true,
    children: [
      { name: 'Design Tokens', href: '/dashboard/library/tokens' },
      { name: 'Color Palette', href: '/dashboard/library/colors' },
      { name: 'Typography', href: '/dashboard/library/typography' },
    ]
  },
  {
    name: 'Design team',
    icon: Users,
    defaultOpen: false,
    children: []
  }
]

export function Sidebar({
  isMobileOpen,
  setIsMobileOpen,
  isDesktopOpen = true
}: {
  isMobileOpen: boolean,
  setIsMobileOpen: (v: boolean) => void,
  isDesktopOpen?: boolean
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuthStore()

  // Local state for accordions
  const [openSpaces, setOpenSpaces] = useState<Record<string, boolean>>({
    'My library': true
  })
  // Custom dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Close dropdown when pathname changes (e.g. clicking a link)
  useEffect(() => {
    setIsDropdownOpen(false)
  }, [pathname])


  const toggleSpace = (name: string) => {
    setOpenSpaces(prev => ({ ...prev, [name]: !prev[name] }))
  }

  const handleLogout = async (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await AuthService.logout()
    } catch (err) {
      console.error("Logout API failed:", err)
    } finally {
      setIsDropdownOpen(false);
      logout()
      router.push("/login")
    }
  }

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-[#111D15] border-r border-border/10 text-foreground w-full">
      {/* Header / Logo */}
      <div className={`flex items-center gap-3 p-4 pt-5 shrink-0 ${!isDesktopOpen && 'justify-center px-2'}`}>
        <div className="w-6 h-6 rounded bg-gradient-to-br from-[#1C3627] to-[#A3B18A] flex items-center justify-center shrink-0">
          <span className="text-white text-xs font-bold font-sans">NS</span>
        </div>
        <Link href={'/'}>
        {isDesktopOpen && <span className="text-[15px] font-semibold text-foreground tracking-tight whitespace-nowrap">Next Step</span>}
        </Link>

        {/* Mobile close button */}
        <button
          className="lg:hidden ml-auto p-1 text-muted-foreground hover:text-foreground"
          onClick={() => setIsMobileOpen(false)}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Search */}
      {/* <div className="px-3 pb-3 shrink-0">
        <div className={`relative group flex items-center h-8 min-h-8 bg-black/5 dark:bg-black/20 hover:bg-black/10 dark:hover:bg-black/30 focus-within:!bg-black/20 rounded-md ${isDesktopOpen ? 'px-2' : 'justify-center px-0'}`}>
          <Search className={`w-4 h-4 text-muted-foreground shrink-0 ${isDesktopOpen ? 'mr-2' : ''}`} />
          {isDesktopOpen && (
            <>
              <input
                className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground w-full"
                placeholder="Search"
              />
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono text-muted-foreground bg-black/10 dark:bg-white/10 ml-2">⌘K</kbd>
            </>
          )}
        </div>
      </div> */}

      {/* Main Nav */}
      <div className="px-3 space-y-[2px] shrink-0">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 py-1.5 rounded-md text-[13px] font-medium transition-colors ${isDesktopOpen ? 'px-3' : 'justify-center px-0'
                } ${isActive
                  ? "bg-[#1C3627]/10 dark:bg-[#A3B18A]/10 text-[#1C3627] dark:text-[#A3B18A]"
                  : "text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground"
                }`}
            >
              <item.icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#1C3627] dark:text-[#A3B18A]' : ''}`} />
              {isDesktopOpen && <span className="whitespace-nowrap">{item.name}</span>}
            </Link>
          )
        })}
      </div>

      {isDesktopOpen && (
        <div className="mt-6 mb-2 px-6 text-[11px] font-semibold text-muted-foreground shrink-0 whitespace-nowrap">
          Spaces
        </div>
      )}
      {!isDesktopOpen && <div className="mt-6 mb-2" />}

      {/* Accordions */}
      <div className="px-3 flex-1 overflow-y-auto overflow-x-hidden space-y-[2px] custom-scrollbar">
        {spaces.map((space) => {
          const isOpen = openSpaces[space.name]
          return (
            <div key={space.name} className="flex flex-col">
              <button
                onClick={() => isDesktopOpen && toggleSpace(space.name)}
                className={`flex items-center justify-between py-1.5 rounded-md text-[13px] font-medium text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground transition-colors w-full ${isDesktopOpen ? 'px-3' : 'justify-center px-0'}`}
              >
                <div className="flex items-center gap-3">
                  <space.icon className="w-4 h-4 shrink-0" />
                  {isDesktopOpen && <span className="whitespace-nowrap">{space.name}</span>}
                </div>
                {isDesktopOpen && space.children.length > 0 && (
                  isOpen ? <ChevronDown className="w-3 h-3 opacity-60" /> : <ChevronRight className="w-3 h-3 opacity-60" />
                )}
              </button>

              {isDesktopOpen && isOpen && space.children.length > 0 && (
                <div className="mt-1 ml-[19px] pl-3 border-l border-[#1C3627]/20 dark:border-white/10 space-y-[2px]">
                  {space.children.map((child) => {
                    const isChildActive = pathname === child.href
                    return (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors whitespace-nowrap ${isChildActive
                            ? "text-[#1C3627] dark:text-[#A3B18A] bg-[#1C3627]/5 dark:bg-[#A3B18A]/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                          }`}
                      >
                        <div className="w-4 h-4 flex items-center justify-center shrink-0">
                          <div className={`w-1.5 h-1.5 rounded-full ${isChildActive ? "bg-[#A3B18A]" : "border border-muted-foreground/40"}`} />
                        </div>
                        {child.name}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}

        <button className={`flex items-center gap-3 py-1.5 rounded-md text-[13px] font-medium text-muted-foreground hover:bg-black/5 dark:hover:bg-white/5 hover:text-foreground transition-colors w-full mt-1 ${isDesktopOpen ? 'px-3' : 'justify-center px-0'}`}>
          <Plus className="w-4 h-4 shrink-0" />
          {isDesktopOpen && <span className="whitespace-nowrap">Add space</span>}
        </button>
      </div>

      {/* User Dropdown Compact */}
      <div className="p-3 shrink-0 border-t border-border/10 mt-auto relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`flex items-center justify-between w-full py-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left ${isDesktopOpen ? 'px-2' : 'justify-center px-0'}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#1C3627] to-[#A3B18A] flex items-center justify-center overflow-hidden shrink-0 border border-border/10">
              {user?.profileImage ? (
                <img src={user.profileImage} alt="User" className="w-full h-full object-cover" />
              ) : <UserIcon className="w-3 h-3 text-[#F6F8F6]" />}
            </div>
            {isDesktopOpen && <span className="text-[13px] font-medium truncate whitespace-nowrap">{user?.name || "Junior"}</span>}
          </div>
          {isDesktopOpen && <ChevronDown className="w-3 h-3 opacity-60 shrink-0" />}
        </button>

        {isDropdownOpen && (
          <div className={`absolute bottom-full mb-1 w-[200px] bg-white dark:bg-[#111D15] border border-border/10 rounded-xl shadow-xl overflow-hidden z-[100] animate-in fade-in slide-in-from-bottom-2 duration-200 py-1 ${isDesktopOpen ? 'left-3' : 'left-full ml-2'}`}>

            <button onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); setIsDropdownOpen(false); router.push("/dashboard/profile"); }} className="flex items-center w-full gap-3 px-3 py-2 text-[13px] font-medium text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left">
              <UserIcon className="w-4 h-4 pointer-events-none" />
              Profile
            </button>
            <div className="h-px bg-border/20 my-1 mx-2" />
            <button onPointerDown={handleLogout} className="flex items-center w-full gap-3 px-3 py-2 text-[13px] font-medium text-red-500 hover:bg-red-500/10 transition-colors text-left">
              <LogOut className="w-4 h-4 pointer-events-none" />
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden lg:block h-screen fixed inset-y-0 left-0 z-40 transition-all duration-300 ease-in-out ${isDesktopOpen ? 'w-[260px]' : 'w-[64px]'}`}>
        {sidebarContent}
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-[260px] transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {sidebarContent}
      </div>
    </>
  )
}
