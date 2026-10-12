"use client"

import { motion } from "framer-motion"
import { Search, Briefcase, CalendarCheck, Trophy } from "lucide-react"

const steps = [
  {
    icon: <Search className="w-5 h-5 text-[#1C3627] dark:text-[#A3B18A]" />,
    step: "01",
    title: "Log & Categorize",
    description: "Save job openings with role details, salary range, location, priority level, and direct job link.",
  },
  {
    icon: <Briefcase className="w-5 h-5 text-[#1C3627] dark:text-[#A3B18A]" />,
    step: "02",
    title: "Attach Resume & Notes",
    description: "Link your custom Cloudinary PDF resume and jot down key recruiter contacts and requirements.",
  },
  {
    icon: <CalendarCheck className="w-5 h-5 text-[#1C3627] dark:text-[#A3B18A]" />,
    step: "03",
    title: "Schedule & Follow Up",
    description: "Track interview dates with Google Meet links and automate timely follow-ups to maintain momentum.",
  },
  {
    icon: <Trophy className="w-5 h-5 text-emerald-500" />,
    step: "04",
    title: "Convert to Offer",
    description: "Monitor your funnel conversion rates, evaluate competing compensation packages, and land the role.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-14 md:py-18 bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
              A search with direction.<br />Four simple steps.
            </h2>
          </div>
          <p className="max-w-xs text-xs sm:text-sm text-muted-foreground text-left md:text-right">
            Turn the chaos of job hunting into a disciplined, step-by-step process that actually converts.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-5 rounded-2xl bg-white dark:bg-[#111D15] border border-border/20 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#1C3627]/10 dark:bg-[#A3B18A]/10 flex items-center justify-center shadow-sm">
                    {step.icon}
                  </div>
                  <span className="text-xs font-mono font-bold text-muted-foreground/60">{step.step}</span>
                </div>
                <h3 className="text-sm font-bold text-foreground mb-1.5">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
