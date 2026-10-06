"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const jobs = [
  {
    role: "Frontend Developer",
    company: "Google • Remote",
    tags: ["Full-time", "Hybrid"],
    salary: "$80k - $120k",
    posted: "2 days ago",
    logo: "G"
  },
  {
    role: "Full Stack Developer",
    company: "Meta • Remote",
    tags: ["Full-time", "Remote"],
    salary: "$110k - $150k",
    posted: "3 days ago",
    logo: "M"
  },
  {
    role: "Web Developer",
    company: "Microsoft • Dhaka",
    tags: ["Full-time", "On-site"],
    salary: "$50k - $80k",
    posted: "4 days ago",
    logo: "W"
  },
  {
    role: "Backend Developer",
    company: "Binance • Remote",
    tags: ["Full-time", "Remote"],
    salary: "$90k - $140k",
    posted: "5 days ago",
    logo: "B"
  }
]

export default function JobRecommendations() {
  return (
    <section className="py-24 md:py-32 bg-secondary/30 text-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 justify-between items-start mb-16">
          <div className="max-w-md">
            <div className="text-sm font-semibold text-green-600 dark:text-green-500 mb-2">07 — Recommended for You</div>
            <h2 className="text-4xl font-bold mb-4">Find the Right Jobs, Faster</h2>
            <p className="text-muted-foreground mb-6">
              Get personalized job recommendations based on your skills, experience and goals.
            </p>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8">
              View All Jobs →
            </Button>
          </div>
          
          <div className="flex-1 grid sm:grid-cols-2 gap-6 w-full">
            {jobs.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-card hover:shadow-xl hover:shadow-green-500/10 transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary border border-border flex items-center justify-center font-bold text-xl text-foreground group-hover:border-green-200 group-hover:bg-green-500/10 transition-colors">
                    {job.logo}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{job.role}</h3>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                  </div>
                </div>
                
                <div className="flex gap-2 mb-6">
                  {job.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-secondary text-xs font-medium text-foreground border border-border">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm font-medium">
                  <span className="text-green-600 dark:text-green-500">{job.salary}</span>
                  <span className="text-muted-foreground font-normal">{job.posted}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
