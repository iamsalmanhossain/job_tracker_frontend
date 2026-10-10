"use client"

import { motion } from "framer-motion"
import { Search, Briefcase, MessageSquare, Check } from "lucide-react"

const steps = [
  {
    icon: <Search className="w-6 h-6" />,
    title: "Discover",
    description: "Find the right roles. Save them in one click and never lose a great opportunity."
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: "Apply",
    description: "Send out applications with confidence. Keep track of what you've sent and when."
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Connect",
    description: "Follow up like a pro. Set reminders to stay on the radar of hiring managers."
  },
  {
    icon: <Check className="w-6 h-6" />,
    title: "Celebrate",
    description: "Nail the interview and land the job. We'll be cheering for you all the way."
  }
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-[#F6F8F6] dark:bg-[#121614] text-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">A search with a little<br/>more direction.</h2>
          </div>
          <div className="max-w-xs text-sm text-muted-foreground text-right">
            Turn the chaos of job hunting into a streamlined, step-by-step process that actually works.
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 relative mt-8">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-6 left-[10%] right-[10%] h-px bg-border z-0"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.15, type: "spring", bounce: 0.2 }}
              className="relative z-10 flex flex-col items-start"
            >
              <div className="w-12 h-12 bg-background dark:bg-card border border-border rounded-lg flex items-center justify-center text-foreground mb-6 shadow-sm">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
