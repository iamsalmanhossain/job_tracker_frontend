"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, TrendingUp, BarChart3, Activity, Infinity as InfinityIcon, ArrowUpRight, Zap, Play, RefreshCw } from "lucide-react"

const funnelStages = [
  {
    step: 1,
    title: "Initial Outreach",
    applications: 5,
    interviews: 1,
    interviewRate: "20.0%",
    activePipeline: 4,
    appliedCount: 3,
    interviewCount: 1,
    offerCount: 1,
    appliedWidth: "60%",
    interviewWidth: "20%",
    offerWidth: "20%",
  },
  {
    step: 2,
    title: "Screening Surge",
    applications: 8,
    interviews: 2,
    interviewRate: "25.0%",
    activePipeline: 6,
    appliedCount: 5,
    interviewCount: 2,
    offerCount: 1,
    appliedWidth: "62%",
    interviewWidth: "25%",
    offerWidth: "13%",
  },
  {
    step: 3,
    title: "Interview Rounds",
    applications: 12,
    interviews: 4,
    interviewRate: "33.3%",
    activePipeline: 8,
    appliedCount: 7,
    interviewCount: 4,
    offerCount: 2,
    appliedWidth: "55%",
    interviewWidth: "30%",
    offerWidth: "15%",
  },
  {
    step: 4,
    title: "Offer Stage",
    applications: 15,
    interviews: 6,
    interviewRate: "40.0%",
    activePipeline: 10,
    appliedCount: 8,
    interviewCount: 6,
    offerCount: 3,
    appliedWidth: "48%",
    interviewWidth: "34%",
    offerWidth: "18%",
  },
]

export default function Stats() {
  const [currentStageIndex, setCurrentStageIndex] = useState(0)
  const currentStage = funnelStages[currentStageIndex]

  // Auto-cycle through states every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStageIndex((prev) => (prev + 1) % funnelStages.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-14 md:py-20 bg-[#F6F8F6] dark:bg-[#0D140F] text-foreground relative border-y border-border/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center w-full">
          
          {/* Left Text */}
          <div className="w-full">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C3627]/10 dark:bg-[#A3B18A]/15 text-[#1C3627] dark:text-[#A3B18A] text-xs font-bold uppercase tracking-wider mb-4 border border-[#1C3627]/20 dark:border-[#A3B18A]/20">
              <TrendingUp className="w-3.5 h-3.5" />
              Conversion Funnel Intelligence
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight">
              See what's working.<br />Double down on offers.
            </h2>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed max-w-xl">
              Identify high-converting job sources, track your screening-to-interview rates, and eliminate drop-offs with automatic visual analytics updated in real time.
            </p>
            
            <ul className="space-y-3 mb-8">
              {[
                "Calculate real-time interview conversion percentages",
                "Measure application pipeline health across 5 stages",
                "Pinpoint top responding companies and locations",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-[#1C3627] dark:bg-[#A3B18A] flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 text-white dark:text-[#1C3627]" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-foreground">{item}</span>
                </li>
              ))}
            </ul>

            {/* Interactive Stage indicator pills */}
            <div className="flex items-center gap-2 flex-wrap pt-2">
              <span className="text-[11px] font-mono text-muted-foreground mr-1">Demo Stage:</span>
              {funnelStages.map((stage, idx) => (
                <button
                  key={stage.step}
                  onClick={() => setCurrentStageIndex(idx)}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all border ${
                    currentStageIndex === idx
                      ? "bg-[#1C3627] text-white dark:bg-[#A3B18A] dark:text-[#1C3627] border-transparent shadow-sm"
                      : "bg-black/5 dark:bg-white/5 border-border/20 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {stage.title}
                </button>
              ))}
            </div>
          </div>

          {/* Right Card with Animated Dynamic Counters (Red Box in Screenshot) */}
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-[#111D15] border border-border/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden group hover:border-[#1C3627]/40 dark:hover:border-[#A3B18A]/40 transition-all duration-300 w-full"
            >
              {/* Background Infinite Floating Energy Wave */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-full h-full bg-gradient-to-r from-transparent via-[#1C3627]/10 dark:via-[#A3B18A]/10 to-transparent skew-x-12"
                />
              </div>

              {/* Card Header with Infinite Pulse Indicator & Live Sync */}
              <div className="flex justify-between items-center mb-6 relative z-10">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#1C3627] dark:text-[#A3B18A]" />
                  <h3 className="font-bold text-xs uppercase tracking-wider text-foreground">Active Search Funnel</h3>
                </div>
                
                {/* Live Infinity Badge with Stage indicator */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1C3627]/10 dark:bg-[#A3B18A]/10 text-[#1C3627] dark:text-[#A3B18A] text-[11px] font-semibold border border-[#1C3627]/20 dark:border-[#A3B18A]/20">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  >
                    <RefreshCw className="w-3 h-3 text-[#1C3627] dark:text-[#A3B18A]" />
                  </motion.div>
                  <span className="font-mono">Live Engine Synced</span>
                </div>
              </div>
              
              {/* Metric Counters with Live Number Flip & Changing Animations (Red Marked Box) */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 relative z-10">
                
                {/* 1. Applications Box */}
                <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-black/5 dark:bg-black/25 text-center border border-border/10 relative overflow-hidden group/item">
                  <div className="h-8 sm:h-11 flex items-center justify-center overflow-hidden mb-0.5">
                    <AnimatePresence mode="popLayout">
                      <motion.div
                        key={currentStage.applications}
                        initial={{ y: 22, opacity: 0, scale: 0.75 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: -22, opacity: 0, scale: 0.75 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="text-lg sm:text-3xl md:text-4xl font-black text-foreground font-mono"
                      >
                        {currentStage.applications}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-muted-foreground font-semibold truncate">Applications</div>
                </div>

                {/* 2. Interview Box */}
                <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-black/5 dark:bg-black/25 text-center border border-border/10 relative overflow-hidden group/item">
                  <div className="h-8 sm:h-11 flex items-center justify-center overflow-hidden mb-0.5">
                    <AnimatePresence mode="popLayout">
                      <motion.div
                        key={currentStage.interviews}
                        initial={{ y: 22, opacity: 0, scale: 0.75 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: -22, opacity: 0, scale: 0.75 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="text-lg sm:text-3xl md:text-4xl font-black text-blue-500 font-mono"
                      >
                        {currentStage.interviews}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-muted-foreground font-semibold truncate">Interview</div>
                </div>

                {/* 3. Interview Rate Box */}
                <div className="p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-emerald-500/10 text-center border border-emerald-500/30 relative overflow-hidden group/item shadow-sm shadow-emerald-500/5">
                  <motion.div
                    animate={{ opacity: [0.15, 0.45, 0.15] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-emerald-500/10 pointer-events-none"
                  />
                  <div className="h-8 sm:h-11 flex items-center justify-center overflow-hidden mb-0.5 relative z-10">
                    <AnimatePresence mode="popLayout">
                      <motion.div
                        key={currentStage.interviewRate}
                        initial={{ y: 22, opacity: 0, scale: 0.75 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: -22, opacity: 0, scale: 0.75 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="text-lg sm:text-3xl md:text-4xl font-black text-emerald-600 dark:text-emerald-400 font-mono"
                      >
                        {currentStage.interviewRate}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-emerald-600 dark:text-emerald-400 font-bold relative z-10 truncate">
                    Interview Rate
                  </div>
                </div>
              </div>

              {/* Animated Pipeline Progress Target Bar */}
              <div className="space-y-3 pt-3 border-t border-border/10 relative z-10">
                <div className="flex justify-between items-center text-xs font-medium text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Application Progress Target
                  </span>
                  <div className="flex items-center gap-1.5">
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={currentStage.activePipeline}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="font-bold text-foreground font-mono"
                      >
                        {currentStage.activePipeline}
                      </motion.span>
                    </AnimatePresence>
                    <span className="font-bold text-foreground font-mono">Active Pipeline</span>
                  </div>
                </div>

                {/* Progress bar with smooth animated segment widths */}
                <div className="relative w-full bg-black/10 dark:bg-black/40 h-3 rounded-full overflow-hidden p-0.5 border border-border/20 flex">
                  {/* Applied Segment */}
                  <motion.div
                    animate={{ width: currentStage.appliedWidth }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="bg-[#1C3627] dark:bg-[#A3B18A] h-full rounded-l-full relative overflow-hidden"
                  >
                    <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 w-1/2 bg-white/40 skew-x-12 blur-[1px]"
                    />
                  </motion.div>

                  {/* Interview Segment */}
                  <motion.div
                    animate={{ width: currentStage.interviewWidth }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="bg-blue-500 h-full relative overflow-hidden"
                  >
                    <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                      className="absolute inset-0 w-1/2 bg-white/40 skew-x-12 blur-[1px]"
                    />
                  </motion.div>

                  {/* Offer Segment */}
                  <motion.div
                    animate={{ width: currentStage.offerWidth }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="bg-emerald-500 h-full rounded-r-full relative overflow-hidden"
                  >
                    <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                      className="absolute inset-0 w-1/2 bg-white/50 skew-x-12 blur-[1px]"
                    />
                  </motion.div>
                </div>

                {/* Dynamic Stage Legend with Changing Numbers */}
                <div className="flex flex-wrap sm:flex-nowrap justify-between gap-1 text-[10px] sm:text-[11px] text-muted-foreground/80 font-mono pt-1">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1C3627] dark:bg-[#A3B18A]" />
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={currentStage.appliedCount}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {currentStage.appliedCount}
                      </motion.span>
                    </AnimatePresence> Applied
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={currentStage.interviewCount}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {currentStage.interviewCount}
                      </motion.span>
                    </AnimatePresence> Interview
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={currentStage.offerCount}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {currentStage.offerCount}
                      </motion.span>
                    </AnimatePresence> Offer
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
