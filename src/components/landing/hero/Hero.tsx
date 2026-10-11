"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Star,
  Activity,
  Lock,
} from "lucide-react"

const pipelineSteps = [
  { id: "applied", label: "Applied", color: "text-blue-500", bg: "bg-blue-500/15 border-blue-500/30", dot: "bg-blue-500" },
  { id: "screening", label: "Screening", color: "text-amber-500", bg: "bg-amber-500/15 border-amber-500/30", dot: "bg-amber-500" },
  { id: "interview", label: "Interview", color: "text-purple-500", bg: "bg-purple-500/15 border-purple-500/30", dot: "bg-purple-500" },
  { id: "offer", label: "Offer", color: "text-emerald-500", bg: "bg-emerald-500/15 border-emerald-500/30", dot: "bg-emerald-500" },
]

export default function Hero() {
  const [activeStepIndex, setActiveStepIndex] = useState(0)

  // Cycle through the pipeline steps every 2.2 seconds to demonstrate real-time pipeline movement
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % pipelineSteps.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="home" className="relative pt-24 pb-12 md:pt-28 md:pb-16 bg-background overflow-hidden">
      
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        
        {/* Subtle SVG Grid Mesh with soft fade */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />

        {/* Ambient Moving Gradient Orb 1 (Center) */}
        <motion.div
          animate={{
            scale: [1, 1.25, 0.95, 1],
            x: [0, 40, -30, 0],
            y: [0, -30, 20, 0],
            opacity: [0.18, 0.32, 0.18],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[450px] bg-gradient-to-br from-[#1C3627] via-[#2A4D38] to-[#A3B18A] rounded-full blur-[140px]"
        />

        {/* Ambient Moving Gradient Orb 2 (Left) */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            y: [0, 45, 0],
            x: [0, 25, 0],
            opacity: [0.1, 0.22, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/4 -left-20 w-[350px] h-[350px] bg-emerald-500/20 rounded-full blur-[110px]"
        />

        {/* Ambient Moving Gradient Orb 3 (Right) */}
        <motion.div
          animate={{
            scale: [1.2, 0.95, 1.2],
            y: [0, -40, 0],
            x: [0, -30, 0],
            opacity: [0.12, 0.25, 0.12],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 -right-20 w-[380px] h-[380px] bg-[#A3B18A]/25 rounded-full blur-[120px]"
        />

        {/* Floating Twinkling Particle Dots */}
        {[
          { top: "15%", left: "12%", size: 6, delay: 0 },
          { top: "25%", left: "85%", size: 8, delay: 1.5 },
          { top: "45%", left: "8%", size: 5, delay: 3 },
          { top: "60%", left: "92%", size: 7, delay: 0.8 },
          { top: "75%", left: "18%", size: 6, delay: 2.2 },
          { top: "70%", left: "82%", size: 5, delay: 4 },
        ].map((star, idx) => (
          <motion.div
            key={idx}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.3, 0.8],
              y: [0, -15, 0],
            }}
            transition={{
              duration: 4 + idx * 0.7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: star.delay,
            }}
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
            }}
            className="absolute rounded-full bg-[#1C3627] dark:bg-[#A3B18A] shadow-lg shadow-[#A3B18A]/50"
          />
        ))}

      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Floating Desktop Micro-Badge (Left) - Aligned strictly with Navbar container bounds */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="hidden xl:flex absolute top-10 left-4 sm:left-6 lg:left-8 p-3 rounded-2xl bg-white/70 dark:bg-[#111D15]/80 backdrop-blur-md border border-border/40 shadow-xl items-center gap-2.5 z-10"
        >
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <Zap className="w-4 h-4" />
          </div>
          <div className="text-left">
            <p className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider">Latency</p>
            <p className="text-xs font-extrabold text-foreground">&lt;50ms Redis Cache</p>
          </div>
        </motion.div>

        {/* Floating Desktop Micro-Badge (Right) - Aligned strictly with Navbar container bounds */}
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="hidden xl:flex absolute top-14 right-4 sm:right-6 lg:left-auto lg:right-8 p-3 rounded-2xl bg-white/70 dark:bg-[#111D15]/80 backdrop-blur-md border border-border/40 shadow-xl items-center gap-2.5 z-10"
        >
          <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
            <Lock className="w-4 h-4" />
          </div>
          <div className="text-left">
            <p className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider">Security</p>
            <p className="text-xs font-extrabold text-foreground">Dual-Token JWT Auth</p>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto text-center flex flex-col items-center relative">

          {/* Interactive Live Status Pill with animated glow pulse */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1C3627]/10 dark:bg-[#A3B18A]/15 text-[#1C3627] dark:text-[#A3B18A] text-xs font-bold uppercase tracking-wider mb-6 border border-[#1C3627]/20 dark:border-[#A3B18A]/30 backdrop-blur-sm relative group overflow-hidden"
          >
            {/* Subtle moving shine effect */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 w-1/3 bg-white/20 skew-x-12 blur-sm pointer-events-none"
            />
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A3B18A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A3B18A]"></span>
            </span>
            <span>Next-Generation Job Search Architecture</span>
            <Sparkles className="w-3.5 h-3.5" />
          </motion.div>

          {/* Main Headline with dynamic animated gradient text and glowing underline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tight text-foreground mb-4 sm:mb-5 leading-[1.1] sm:leading-[1.08]">
              Your job search.<br />
              A clearer{" "}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#1C3627] via-[#386b4d] to-[#1C3627] dark:from-[#A3B18A] dark:via-[#DAD7CD] dark:to-[#A3B18A]">
                next step.
                <motion.svg
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ opacity: 1, pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
                  className="absolute w-full h-3 -bottom-0.5 left-0 text-[#1C3627] dark:text-[#A3B18A]"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M0,10 Q50,20 100,5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
                  />
                </motion.svg>
              </span>
            </h1>
          </motion.div>
          
          {/* Subtitle */}
          <motion.div
             initial={{ opacity: 0, y: 15 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <p className="text-sm sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
              Track multi-stage applications, schedule technical rounds with meeting links, automate follow-up reminders, and evaluate funnel metrics in real time.
            </p>
          </motion.div>

          {/* Primary Call to Action buttons with live beam shine */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-8 w-full sm:w-auto px-4 sm:px-0"
          >
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-[#1C3627] hover:bg-[#15291d] text-white dark:bg-[#A3B18A] dark:text-[#1C3627] dark:hover:bg-[#8e9a78] rounded-full px-8 h-12 text-sm sm:text-base font-bold transition-all shadow-xl shadow-[#1C3627]/25 hover:scale-105 gap-2 group relative overflow-hidden"
            >
              {/* Continuous subtle button shine */}
              <motion.div
                animate={{ x: ["-100%", "250%"] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 w-1/2 bg-white/20 skew-x-12 blur-sm pointer-events-none"
              />
              <span className="relative z-10 flex items-center gap-2">
                Start Tracking Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-full px-8 h-12 border border-border/80 hover:bg-black/5 dark:hover:bg-white/5 text-foreground text-sm sm:text-base font-semibold transition-colors"
            >
              Sign In to Dashboard
            </Link>
          </motion.div>

          {/* Animated Pipeline Stage Tracer Component */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-xl mx-auto mb-8 p-2 sm:p-3 rounded-2xl bg-black/5 dark:bg-white/[0.03] border border-border/30 backdrop-blur-md flex items-center justify-between gap-1.5 sm:gap-2 overflow-x-auto shadow-sm relative group"
          >
            {/* Pipeline Prefix */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-bold text-foreground font-mono">PIPELINE:</span>
            </div>

            {/* Stages with cycling highlight indicator */}
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto whitespace-nowrap flex-1 justify-start sm:justify-center text-[10px] sm:text-[11px] font-semibold py-0.5">
              {pipelineSteps.map((step, idx) => {
                const isActive = activeStepIndex === idx
                return (
                  <div key={step.id} className="flex items-center gap-1 sm:gap-2 shrink-0">
                    <motion.div
                      animate={{
                        scale: isActive ? 1.05 : 1,
                        opacity: isActive ? 1 : 0.65,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-lg transition-colors ${
                        isActive ? `${step.bg} border` : ""
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${step.dot} ${isActive ? "animate-ping" : ""}`} />
                      <span className={isActive ? step.color : "text-muted-foreground"}>{step.label}</span>
                    </motion.div>
                    {idx < pipelineSteps.length - 1 && (
                      <span className="text-muted-foreground/30 font-mono text-[10px]">→</span>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Real-time Indicator Pill */}
            <div className="shrink-0 text-[10px] font-mono text-[#1C3627] dark:text-[#A3B18A] font-bold bg-[#1C3627]/10 dark:bg-[#A3B18A]/10 px-2.5 py-0.5 rounded-full hidden sm:flex items-center gap-1">
              <Activity className="w-3 h-3 animate-pulse" />
              <span>Real-Time</span>
            </div>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs text-muted-foreground font-medium"
          >
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500" />
              <span>100% Free Forever for Talent</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
              <span>Real-Time Interview Sync</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-500" />
                ))}
              </div>
              <span className="font-semibold text-foreground">5.0 Candidate Rating</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

