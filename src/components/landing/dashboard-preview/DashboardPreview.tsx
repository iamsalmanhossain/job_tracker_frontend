"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  LayoutDashboard,
  Table,
  Sparkles,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Calendar,
  Lock,
} from "lucide-react"

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState<"analytics" | "table">("analytics")

  return (
    <section id="dashboard-preview" className="py-14 md:py-18 bg-background relative overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#1C3627]/15 dark:bg-[#A3B18A]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C3627]/10 dark:bg-[#A3B18A]/15 text-[#1C3627] dark:text-[#A3B18A] text-xs font-bold uppercase tracking-wider mb-4 border border-[#1C3627]/20 dark:border-[#A3B18A]/20">
            <Sparkles className="w-3.5 h-3.5" />
            Live Platform Showcase
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            Designed for serious job seekers.<br />
            <span className="text-[#1C3627] dark:text-[#A3B18A]">Clean, fast, and organized.</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mt-3 max-w-2xl mx-auto">
            Take a real look inside your future control center. From application conversion funnels to upcoming technical interviews, everything is organized in real time.
          </p>

          {/* Tab Selector */}
          <div className="flex flex-col sm:inline-flex sm:flex-row items-center p-1.5 rounded-2xl bg-muted/60 dark:bg-[#111D15] border border-border/40 mt-6 shadow-inner gap-1 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("analytics")}
              className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all w-full sm:w-auto ${
                activeTab === "analytics"
                  ? "bg-[#1C3627] text-white dark:bg-[#A3B18A] dark:text-[#1C3627] shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span>Progress & Funnel Analytics</span>
            </button>
            <button
              onClick={() => setActiveTab("table")}
              className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all w-full sm:w-auto ${
                activeTab === "table"
                  ? "bg-[#1C3627] text-white dark:bg-[#A3B18A] dark:text-[#1C3627] shadow-md"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Table className="w-4 h-4 shrink-0" />
              <span>Applications Management Grid</span>
            </button>
          </div>
        </div>

        {/* Browser Mockup Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl sm:rounded-3xl border border-border/60 bg-[#080C0A] shadow-2xl shadow-[#1C3627]/20 w-full overflow-hidden group"
        >
          {/* Top Browser Bar */}
          <div className="h-11 border-b border-white/10 bg-[#0F1712] flex items-center justify-between px-3 sm:px-6 gap-2">
            <div className="flex gap-1.5 sm:gap-2 items-center shrink-0">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#EF4444]/80"></div>
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#F59E0B]/80"></div>
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#10B981]/80"></div>
            </div>

            <div className="bg-black/50 border border-white/10 rounded-full px-3 sm:px-8 py-1 text-[10px] sm:text-xs text-neutral-300 font-mono flex items-center gap-2 min-w-0 max-w-[210px] sm:max-w-none">
              <Lock className="w-3 h-3 text-[#A3B18A] shrink-0" />
              <span className="truncate">app.nextjobtrack.com/{activeTab === "analytics" ? "dashboard" : "dashboard/applications"}</span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#A3B18A] font-semibold hidden md:flex shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#A3B18A] animate-pulse"></span>
              Live Synced
            </div>
          </div>

          {/* Image Showcase Canvas */}
          <div className="relative bg-[#050806] p-2 sm:p-4 overflow-hidden">
            {activeTab === "analytics" ? (
              <motion.div
                key="analytics-view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-xl overflow-hidden border border-white/10 shadow-xl"
              >
                <Image
                  src="/images/dashboard-analytics-preview.png"
                  alt="Next Job Track Analytics Dashboard"
                  width={1920}
                  height={1080}
                  className="w-full h-auto object-cover rounded-xl"
                  priority
                />
              </motion.div>
            ) : (
              <motion.div
                key="table-view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-xl overflow-hidden border border-white/10 shadow-xl"
              >
                <Image
                  src="/images/applications-table-preview.png"
                  alt="Next Job Track Applications Grid"
                  width={1920}
                  height={1080}
                  className="w-full h-auto object-cover rounded-xl"
                  priority
                />
              </motion.div>
            )}

            {/* Floating Glassmorphism Highlight Cards with Infinite Motion */}
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="hidden lg:flex absolute bottom-8 left-8 p-4 rounded-2xl bg-[#111D15]/90 backdrop-blur-md border border-white/15 text-white shadow-2xl items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#A3B18A]/20 text-[#A3B18A] flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-300">Conversion Metric</p>
                <p className="text-sm font-bold text-white">+20.0% Interview Conversion</p>
              </div>
            </motion.div>

            <motion.div
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="hidden lg:flex absolute bottom-8 right-8 p-4 rounded-2xl bg-[#111D15]/90 backdrop-blur-md border border-white/15 text-white shadow-2xl items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-300">Application Pipeline</p>
                <p className="text-sm font-bold text-white">4 Active Interviews & Offers</p>
              </div>
            </motion.div>
          </div>

          {/* Bottom Call to Action inside Mockup */}
          <div className="p-4 sm:p-6 bg-gradient-to-r from-[#0F1712] via-[#111D15] to-[#0F1712] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="text-sm sm:text-base font-bold text-white">
                Ready to take control of your career pipeline?
              </h4>
              <p className="text-xs text-neutral-400 mt-0.5">
                Join hundreds of candidates organizing applications with Next Job Track.
              </p>
            </div>
            <Link
              href="/register"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold bg-[#A3B18A] hover:bg-[#A3B18A]/90 text-[#1C3627] shadow-lg transition-transform hover:scale-105 gap-2"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
