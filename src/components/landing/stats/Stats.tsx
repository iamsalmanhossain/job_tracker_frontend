"use client"

import { motion } from "framer-motion"
import { Users, FileText, Calendar, Trophy } from "lucide-react"

const stats = [
  {
    icon: <Users className="w-5 h-5" />,
    value: "10,000+",
    label: "Active Users"
  },
  {
    icon: <FileText className="w-5 h-5" />,
    value: "35,000+",
    label: "Applications Tracked"
  },
  {
    icon: <Calendar className="w-5 h-5" />,
    value: "12,000+",
    label: "Interviews Scheduled"
  },
  {
    icon: <Trophy className="w-5 h-5" />,
    value: "3,500+",
    label: "Offers Received"
  }
]

export default function Stats() {
  return (
    <section className="py-24 md:py-32 bg-background border-y border-border relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-green-900/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
          
          <div className="max-w-md">
            <div className="text-sm font-semibold text-green-500 mb-2">03 — Real Impact</div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Trusted by Thousands of Job Seekers</h2>
            <p className="text-muted-foreground">
              From fresh graduates to experienced professionals, JobTracker is helping people land their dream jobs every day.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 w-full lg:w-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center md:items-start relative"
              >
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-green-500 mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-1">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                
                {index === stats.length - 1 && (
                  <div className="absolute -top-10 -right-12 hidden md:block">
                    <span className="font-handwriting text-xl text-muted-foreground transform rotate-12 inline-block">Real people.<br/>Real success.</span>
                    <svg className="w-8 h-8 text-muted-foreground/50 transform -scale-x-100 rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
