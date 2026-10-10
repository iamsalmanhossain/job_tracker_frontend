"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlayCircle, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-16 bg-background overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-green-900/10 dark:bg-green-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-6">
              Your job search.<br />
              A clearer <span className="relative inline-block">
                next step.
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#84A98C] dark:text-[#84A98C]" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,10 Q50,20 100,5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
          </motion.div>
          
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Manage all your job applications in one place.<br/>
              Get things done with smart workflows.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-8"
          >
            <Link href="/register" className="inline-flex items-center justify-center bg-[#1C3627] hover:bg-[#15291d] text-white dark:bg-[#A3B18A] dark:text-[#1C3627] dark:hover:bg-[#8e9a78] rounded-full px-8 h-12 text-base font-semibold transition-colors">
              Start tracking free
            </Link>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-12 border-border hover:bg-accent text-foreground text-base font-semibold">
              <PlayCircle className="mr-2 w-5 h-5 text-muted-foreground" />
              Watch Demo
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center gap-4 text-sm text-muted-foreground mb-8"
          >
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </span>
              <span>Join 10,000+ job seekers</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
