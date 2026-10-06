"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { PlayCircle, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Hero() {
  return (
    <section id="home" className="relative pt-24 pb-24 md:pt-32 md:pb-32 bg-background">
      {/* Background ambient light */}
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-green-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-emerald-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border text-xs font-medium text-muted-foreground mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Better Career Starts Here
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
              Track Your Jobs,<br />
              Build Your <span className="text-green-500">Future</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              JobTracker helps you organize applications, track progress,
              never miss follow-ups, and get closer to your dream job —
              all in one place.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-black font-semibold rounded-full px-8 h-12">
                Start Tracking Free →
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 h-12 border-border hover:bg-accent text-foreground">
                <PlayCircle className="mr-2 w-5 h-5 text-muted-foreground" />
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <Avatar key={i} className="border-2 border-background w-10 h-10">
                    <AvatarImage src={`https://i.pravatar.cc/100?img=${i + 10}`} />
                    <AvatarFallback>U{i}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Join 10,000+ job seekers</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            {/* Dashboard Mockup */}
            <div className="relative rounded-2xl border border-border bg-card p-2 shadow-2xl shadow-green-900/20">
              <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 to-transparent opacity-50 rounded-2xl" />
              <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" 
                alt="JobTracker Dashboard" 
                className="rounded-xl w-full h-auto object-cover opacity-80 mix-blend-luminosity dark:mix-blend-luminosity mix-blend-normal"
              />
              
              {/* Floating Element */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 bg-popover border border-border rounded-xl p-4 shadow-xl flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-600 font-bold">
                  42%
                </div>
                <div>
                  <p className="text-sm font-medium text-popover-foreground">Success Rate</p>
                  <p className="text-xs text-muted-foreground">Increased by 15%</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
