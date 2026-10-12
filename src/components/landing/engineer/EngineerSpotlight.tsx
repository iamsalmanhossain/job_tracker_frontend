"use client"

import { motion } from "framer-motion"
import {
  Code2,
  Cpu,
  Layers,
  Sparkles,
  GitBranch,
  ExternalLink,
  Mail,
  Award,
  CheckCircle2,
  FileCode2,
  Database,
  Terminal,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const skillCategories = [
  {
    title: "Full-Stack & System Design",
    skills: [
      { name: "Next.js 16 (App Router)", level: "Production", badge: "Turbopack" },
      { name: "TypeScript / Node.js", level: "Advanced", badge: "Strict Mode" },
      { name: "RESTful API Engineering", level: "Architect", badge: "DDD / SOLID" },
      { name: "Prisma ORM & PostgreSQL", level: "Optimized", badge: "Indexing" },
    ],
  },
  {
    title: "Security & Cloud Infrastructure",
    skills: [
      { name: "Dual-Token JWT & OAuth 2.0", level: "Enterprise", badge: "Silent Refresh" },
      { name: "Redis Caching & Throttling", level: "High Scale", badge: "Low Latency" },
      { name: "Cloudinary Streaming CDN", level: "Cloud Media", badge: "Buffer Pipeline" },
      { name: "Zod & Enterprise Hardening", level: "Zero Leak", badge: "Helmet / HPP" },
    ],
  },
]

export default function EngineerSpotlight() {
  return (
    <section id="engineer" className="py-14 md:py-20 bg-background text-foreground relative overflow-hidden border-t border-border/10">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#1C3627]/12 dark:bg-[#A3B18A]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Card */}
        <div className="p-5 sm:p-8 md:p-12 rounded-3xl bg-white dark:bg-[#111D15] border border-border/20 shadow-2xl relative overflow-hidden w-full">
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8 mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-border/10">
            {/* Left: Bio & Role */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-xl shrink-0 border-2 border-[#1C3627]/20 dark:border-[#A3B18A]/30">
                <Image
                  src="/images/salman.jpg"
                  alt="Salman Hossain"
                  fill
                  sizes="(max-width: 640px) 64px, 80px"
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Available for Full-Time Roles
                  </span>
                </div>
                <h3 className="text-xl sm:text-3xl font-extrabold text-foreground">
                  Salman Hossain
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                  Full-Stack Software Engineer • Creator of Next Job Track
                </p>
              </div>
            </div>

            {/* Right: Quick Hiring Call to Action */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1C3627] hover:bg-[#15291d] text-white dark:bg-[#A3B18A] dark:text-[#1C3627] dark:hover:bg-[#8e9a78] text-xs font-bold transition-all shadow-md shadow-[#1C3627]/20 w-full sm:w-auto"
              >
                <Terminal className="w-4 h-4 shrink-0" />
                <span>Explore Live Platform</span>
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border/40 hover:bg-black/5 dark:hover:bg-white/5 text-foreground text-xs font-semibold transition-colors w-full sm:w-auto"
              >
                <span>Sign In & Inspect</span>
              </Link>
            </div>
          </div>

          {/* Core Engineering Competencies Breakdown */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {skillCategories.map((cat, i) => (
              <div key={i} className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C3627] dark:text-[#A3B18A] flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5" />
                  {cat.title}
                </h4>

                <div className="space-y-2.5">
                  {cat.skills.map((s) => (
                    <div
                      key={s.name}
                      className="p-3 rounded-xl bg-black/[0.02] dark:bg-black/20 border border-border/10 flex items-center justify-between hover:border-border/30 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-xs font-semibold text-foreground">{s.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-muted-foreground">{s.level}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#1C3627]/10 dark:bg-[#A3B18A]/10 text-[#1C3627] dark:text-[#A3B18A]">
                          {s.badge}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Hiring Note for HR / Technical Recruiters */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#1C3627]/5 dark:bg-[#A3B18A]/5 border border-[#1C3627]/15 dark:border-[#A3B18A]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h5 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#1C3627] dark:text-[#A3B18A]" />
                Technical Recruiter & Hiring Manager Note
              </h5>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
                This entire application—from TypeScript DDD backend with dual-token security to the Next.js Turbopack client with TanStack query caching—was engineered end-to-end to demonstrate production standards, maintainability, and clean architecture.
              </p>
            </div>
            <Link
              href="/register"
              className="text-xs font-bold text-[#1C3627] dark:text-[#A3B18A] hover:underline whitespace-nowrap flex items-center gap-1"
            >
              Test as Candidate <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
