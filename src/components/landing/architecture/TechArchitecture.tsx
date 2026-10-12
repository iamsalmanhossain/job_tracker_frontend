"use client"

import { motion } from "framer-motion"
import {
  Layers,
  Shield,
  Zap,
  Sparkles,
  Database,
  RefreshCw,
  Server,
  Terminal,
  Lock,
  Cloud,
} from "lucide-react"

const architectureHighlights = [
  {
    icon: Layers,
    title: "Domain-Driven Modular Architecture",
    badge: "SOLID Principles",
    description: "Built with DDD standards separating controller, service, validation, and database layers for zero tightly-coupled dependencies.",
    tags: ["Modular TS", "Prisma ORM", "Clean Code"],
  },
  {
    icon: Lock,
    title: "Stateless Dual-Token Authentication",
    badge: "OAuth 2.0 & JWT",
    description: "Short-lived 15m access tokens paired with cryptographically secure refresh tokens and Google OAuth 2.0 sign-in.",
    tags: ["JWT Architecture", "Silent Refresh", "RBAC Auth"],
  },
  {
    icon: Zap,
    title: "Redis In-Memory Caching & Throttling",
    badge: "<50ms Latency",
    description: "Redis acceleration layer offloading database reads and backing intelligent IP rate-limiting against DDoS attacks.",
    tags: ["Redis Caching", "Rate Limiter", "Session Store"],
  },
  {
    icon: Cloud,
    title: "Cloudinary Cloud Resume Pipeline",
    badge: "Serverless Uploads",
    description: "Direct streaming pipeline handling multipart PDF resumes and candidate avatars with instant CDN delivery and viewing.",
    tags: ["Cloudinary CDN", "PDF Parsing", "Multer Stream"],
  },
  {
    icon: Shield,
    title: "Enterprise Hardening & Zod Validation",
    badge: "Zero Vulnerability",
    description: "Strict runtime payload parsing with Zod schemas, HTTP parameter pollution protection (HPP), and security headers via Helmet.",
    tags: ["Zod Runtime", "Helmet Headers", "Audit Ledger"],
  },
  {
    icon: Server,
    title: "Serverless Deployment Ready",
    badge: "99.99% Uptime",
    description: "Configured for instant scaling on Vercel Serverless Functions and container environments with zero cold-start latency.",
    tags: ["Vercel Serverless", "Docker Ready", "PostgreSQL"],
  },
]

export default function TechArchitecture() {
  return (
    <section id="architecture" className="py-14 md:py-20 bg-[#F6F8F6] dark:bg-[#0D140F] text-foreground relative border-y border-border/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C3627]/10 dark:bg-[#A3B18A]/15 text-[#1C3627] dark:text-[#A3B18A] text-xs font-bold uppercase tracking-wider mb-3 border border-[#1C3627]/20 dark:border-[#A3B18A]/20">
            <Terminal className="w-3.5 h-3.5" />
            Full-Stack Engineering Spec
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
            Production-grade architecture.<br />
            <span className="text-[#1C3627] dark:text-[#A3B18A]">Crafted for speed, scale & security.</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2.5 max-w-2xl mx-auto">
            Engineered with modern best practices, strict type safety, and real-time observability across every endpoint and micro-interaction.
          </p>
        </div>

        {/* 6 Engineering Architecture Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {architectureHighlights.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="p-6 rounded-3xl bg-white dark:bg-[#111D15] border border-border/20 shadow-sm hover:border-[#1C3627]/40 dark:hover:border-[#A3B18A]/40 transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:shadow-[#1C3627]/5"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-2xl bg-[#1C3627]/10 dark:bg-[#A3B18A]/10 text-[#1C3627] dark:text-[#A3B18A] flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#1C3627]/5 dark:bg-[#A3B18A]/10 text-[#1C3627] dark:text-[#A3B18A] border border-[#1C3627]/15 dark:border-[#A3B18A]/20">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-[#1C3627] dark:group-hover:text-[#A3B18A] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-border/10 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-black/5 dark:bg-white/5 text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
