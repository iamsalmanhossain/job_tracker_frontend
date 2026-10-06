"use client"

import { motion } from "framer-motion"
import { LayoutDashboard, BellRing, PieChart, ShieldCheck, Smartphone, Bookmark } from "lucide-react"

const features = [
  {
    icon: <LayoutDashboard className="w-6 h-6 text-green-600 dark:text-green-400" />,
    title: "Organize Applications",
    description: "Keep all your applications in one place with real-time status updates."
  },
  {
    icon: <BellRing className="w-6 h-6 text-green-600 dark:text-green-400" />,
    title: "Smart Reminders",
    description: "Never miss a follow-up or interview with automated reminders and calendar sync."
  },
  {
    icon: <PieChart className="w-6 h-6 text-green-600 dark:text-green-400" />,
    title: "Job Insights",
    description: "Get valuable insights on your progress, response rates and recruiter activity."
  },
  {
    icon: <Bookmark className="w-6 h-6 text-green-600 dark:text-green-400" />,
    title: "Save Interesting Jobs",
    description: "Bookmark jobs for later and build your dream job list."
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-green-600 dark:text-green-400" />,
    title: "Privacy First",
    description: "Your data stays yours. We never share your information with third parties."
  },
  {
    icon: <Smartphone className="w-6 h-6 text-green-600 dark:text-green-400" />,
    title: "Multi-Device Sync",
    description: "Access your job tracker anytime, anywhere — on any device."
  }
]

export default function Features() {
  return (
    <section id="features" className="py-24 md:py-32 bg-secondary/30 text-foreground relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 justify-between mb-16">
          <div className="max-w-xl">
            <div className="text-sm font-semibold text-green-600 dark:text-green-500 mb-2">02 — Why JobTracker?</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">More Than Just a Job Tracker</h2>
            <p className="text-muted-foreground text-lg">
              We built JobTracker with one goal — to make your job search simpler, smarter and more effective. Everything you need, from tracking to insights, in one powerful platform.
            </p>
          </div>
          <div className="flex-1 flex justify-end md:items-end">
            <div className="relative">
              <span className="font-handwriting text-2xl text-muted-foreground transform -rotate-6 inline-block">Smarter tools. Better opportunities.</span>
              <svg className="absolute -bottom-4 -right-8 w-12 h-12 text-muted-foreground opacity-50 transform rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
              className="p-8 rounded-2xl bg-card border border-border hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
