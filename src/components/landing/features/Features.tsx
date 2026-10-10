"use client"

import { motion } from "framer-motion"
import { Briefcase, MessageSquare, Star } from "lucide-react"

export default function Features() {
  return (
    <section id="features" className="py-24 md:py-32 bg-background text-foreground relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">Big ambitions.<br/>One clear picture.</h2>
          </div>
          <div className="max-w-xs text-sm text-muted-foreground text-right md:text-left">
            We gather everything related to your job search into one place, so you can stop switching tabs and start landing interviews.
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Main feature card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-2xl bg-[#E8EDE6] dark:bg-[#131C16] border border-border flex flex-col h-full min-h-[400px]"
          >
             <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-white dark:bg-black rounded-full flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-foreground" />
                </div>
             </div>
             <h3 className="text-xl font-bold mb-2">New "Front-End Developer"</h3>
             <p className="text-muted-foreground text-sm mb-6">Your job application has been successfully saved to your dashboard.</p>
             
             <div className="mt-auto bg-white dark:bg-[#1C261F] p-4 rounded-xl shadow-sm border border-border/50">
               <div className="flex justify-between items-center mb-4">
                 <div className="text-xs font-semibold text-muted-foreground">STATUS</div>
                 <div className="text-xs font-semibold text-muted-foreground">DATE</div>
               </div>
               <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                 <div className="flex items-center gap-2 text-sm font-medium">
                   <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 flex items-center justify-center text-xs">AC</div>
                   Applied
                 </div>
                 <div className="text-sm text-muted-foreground">Today</div>
               </div>
             </div>
          </motion.div>

          {/* Side stacked feature cards */}
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 rounded-2xl bg-[#E8EDE6] dark:bg-[#131C16] border border-border flex-1 flex flex-col justify-center"
            >
               <div className="flex items-start gap-4 mb-4">
                 <div className="w-10 h-10 bg-white dark:bg-black rounded-full flex items-center justify-center shrink-0">
                   <MessageSquare className="w-5 h-5 text-blue-500" />
                 </div>
                 <div>
                   <h3 className="text-base font-bold mb-1">New message from Acme Co.</h3>
                   <p className="text-muted-foreground text-sm">"We would love to schedule an interview..."</p>
                 </div>
               </div>
               <div className="bg-white dark:bg-[#1C261F] p-3 rounded-xl mt-4 border border-border/50 shadow-sm flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-blue-600">JR</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">Jane Roe</span> · Recruiter
                  </div>
               </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-8 rounded-2xl bg-[#E8EDE6] dark:bg-[#131C16] border border-border flex-1 flex flex-col justify-center"
            >
              <div className="flex items-start gap-4">
                 <div className="w-10 h-10 bg-white dark:bg-black rounded-full flex items-center justify-center shrink-0">
                   <Star className="w-5 h-5 text-yellow-500" />
                 </div>
                 <div>
                   <h3 className="text-base font-bold mb-1">New strong match found</h3>
                   <p className="text-muted-foreground text-sm">A new "Product Designer" role at Meta matches 95% of your skills.</p>
                 </div>
               </div>
               <div className="bg-white dark:bg-[#1C261F] p-4 rounded-xl mt-6 border border-border/50 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                      M
                    </div>
                    <span className="text-sm font-semibold">Meta</span>
                  </div>
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
               </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
