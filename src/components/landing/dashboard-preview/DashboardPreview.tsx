"use client"

import { motion } from "framer-motion"

export default function DashboardPreview() {
  return (
    <section className="pb-24 md:pb-32 bg-background relative overflow-hidden -mt-8">
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl border border-border bg-card shadow-2xl shadow-green-900/10 max-w-5xl mx-auto overflow-hidden"
        >
          {/* Top bar for mockup */}
          <div className="h-10 border-b border-border bg-muted/50 flex items-center px-4 gap-2">
             <div className="flex gap-1.5">
               <div className="w-3 h-3 rounded-full bg-red-400"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
               <div className="w-3 h-3 rounded-full bg-green-400"></div>
             </div>
             <div className="mx-auto bg-background border border-border rounded-md px-24 py-1 text-xs text-muted-foreground">
               app.nextstep.com
             </div>
          </div>
          <div className="p-2 bg-muted/20">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" 
              alt="Dashboard Details" 
              className="rounded-lg w-full h-auto object-cover opacity-90 mix-blend-luminosity dark:mix-blend-luminosity mix-blend-normal"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
