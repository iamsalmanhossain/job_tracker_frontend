"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function DashboardPreview() {
  return (
    <section className="py-24 md:py-32 bg-background border-y border-border relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-green-900/20 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
          <div className="max-w-xl">
            <div className="text-sm font-semibold text-green-500 mb-2">06 — See It In Action</div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">A Closer Look at Your Job Dashboard</h2>
            <p className="text-muted-foreground text-lg">
              Get a clear overview of your applications, upcoming interviews and important updates — all at a glance.
            </p>
          </div>
          <div>
            <Button variant="outline" className="rounded-full px-8 h-12 border-border hover:bg-secondary text-foreground">
              Explore Dashboard →
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl border border-border bg-card p-2 shadow-2xl shadow-green-900/20 max-w-5xl mx-auto"
        >
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" 
            alt="Dashboard Details" 
            className="rounded-xl w-full h-auto object-cover opacity-90 mix-blend-luminosity dark:mix-blend-luminosity mix-blend-normal"
          />
          <div className="absolute -right-8 top-1/4 hidden lg:block">
            <span className="font-handwriting text-2xl text-green-500 transform rotate-12 inline-block">Progress<br/>met perfection!</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
