"use client"

import { motion } from "framer-motion"
import {
  Briefcase,
  Calendar,
  Clock,
  FileText,
  Bell,
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  Shield,
  LifeBuoy
} from "lucide-react"
import Link from "next/link"

const realFeatures = [
  {
    icon: Briefcase,
    tag: "Core Workflow",
    title: "End-to-End Application Tracking",
    description: "Create, organize, and monitor jobs through structured stages (Applied, Screening, Interview, Offer, Rejected). Priority tags and source tracking keep your search disciplined.",
    badge: "Multi-Stage Kanban",
  },
  {
    icon: Calendar,
    tag: "Interviews",
    title: "Interview Scheduling & Notes",
    description: "Schedule technical, behavioral, and screening rounds with Google Meet/Zoom links, recruiter contacts, and dedicated prep notes so you never miss an interview.",
    badge: "Real-Time Sync",
  },
  {
    icon: Clock,
    tag: "Automation",
    title: "Smart Recruiter Follow-Ups",
    description: "Set proactive follow-up triggers and response reminders for each company to stay on the radar of hiring managers and maintain momentum.",
    badge: "Never Ghosted",
  },
  {
    icon: FileText,
    tag: "Resume Management",
    title: "Cloud Resume Versioning",
    description: "Upload and store multiple tailored PDF resumes securely in the cloud via Cloudinary. Tag default versions and preview them directly inside your browser.",
    badge: "Cloudinary CDN",
  },
  {
    icon: Bell,
    tag: "Instant Alerts",
    title: "Activity & Status Notifications",
    description: "Receive immediate in-app alerts and notifications when interviews approach, follow-ups are due, or status updates occur across your applications.",
    badge: "In-App & Email",
  },
  {
    icon: Lock,
    tag: "Security",
    title: "Dual-Token Auth & Google OAuth",
    description: "Enterprise-grade stateless JWT authentication with short-lived access tokens, automatic silent token refresh, and one-click Google Sign-In.",
    badge: "AES Encryption",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-14 md:py-18 bg-background text-foreground relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C3627]/10 dark:bg-[#A3B18A]/15 text-[#1C3627] dark:text-[#A3B18A] text-xs font-bold uppercase tracking-wider mb-3 border border-[#1C3627]/20 dark:border-[#A3B18A]/20">
            <Sparkles className="w-3.5 h-3.5" />
            Platform Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
            Engineered for your entire job search journey.
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2">
            Every feature is purpose-built to help serious candidates stay organized, prepare efficiently, and land offers faster.
          </p>
        </div>

        {/* Feature Grid: 6 Real Modules */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {realFeatures.map((feat, index) => {
            const Icon = feat.icon
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="p-6 rounded-2xl bg-white dark:bg-[#111D15] border border-border/20 shadow-sm hover:border-[#1C3627]/40 dark:hover:border-[#A3B18A]/40 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#1C3627]/10 dark:bg-[#A3B18A]/10 text-[#1C3627] dark:text-[#A3B18A] flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-black/5 dark:bg-white/5 border border-border/10 text-muted-foreground">
                      {feat.badge}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#1C3627] dark:text-[#A3B18A]">
                    {feat.tag}
                  </span>
                  <h3 className="text-base font-bold text-foreground mt-1 mb-2 group-hover:text-[#1C3627] dark:group-hover:text-[#A3B18A] transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-border/10 flex items-center text-xs font-semibold text-[#1C3627] dark:text-[#A3B18A]">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-emerald-500" />
                  Ready in your dashboard
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
