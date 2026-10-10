"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

export default function Stats() {
  return (
    <section className="py-24 md:py-32 bg-[#F6F8F6] dark:bg-[#121614] text-foreground relative">
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="max-w-md w-full">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">See what's working.<br/>Keep moving.</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Spot patterns, fix bottlenecks, and double down on what works. Stop guessing, start optimizing.
            </p>
            
            <ul className="space-y-4">
              {[
                "Track interview conversion rates",
                "Find out where you drop off",
                "Outsmart the competition"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#1C3627] dark:bg-[#A3B18A] flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white dark:text-[#1C3627]" />
                  </div>
                  <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full max-w-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-[#1C261F] border border-border rounded-2xl p-8 shadow-xl shadow-green-900/5"
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-semibold text-sm">Last 30 Days Activity</h3>
                <span className="text-xs text-muted-foreground border border-border px-2 py-1 rounded-md">This Month v</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-10">
                <div>
                  <div className="text-4xl font-bold mb-1">18</div>
                  <div className="text-xs text-muted-foreground">Applications</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-1">6</div>
                  <div className="text-xs text-muted-foreground">Interviews</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-1 text-[#1C3627] dark:text-[#A3B18A]">33%</div>
                  <div className="text-xs text-muted-foreground">Success Rate</div>
                </div>
              </div>
              
              <div className="flex items-end justify-between h-40 gap-4 mt-8 border-b border-border pb-4">
                {/* Bar chart mockup */}
                {[
                  { height: '20%', label: 'Week 1' },
                  { height: '60%', label: 'Week 2' },
                  { height: '40%', label: 'Week 3' },
                  { height: '80%', label: 'Week 4' },
                ].map((bar, i) => (
                  <div key={i} className="w-full flex flex-col items-center gap-4">
                    <div className="w-full bg-green-100 dark:bg-green-900/30 rounded-t-sm relative h-full flex items-end">
                       <motion.div 
                          initial={{ height: 0 }}
                          whileInView={{ height: bar.height }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.2 + (i * 0.1) }}
                          className="w-full bg-[#1C3627] dark:bg-[#A3B18A] rounded-t-sm" 
                       />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2">
                 <span className="text-[10px] text-muted-foreground font-medium uppercase">Week 1</span>
                 <span className="text-[10px] text-muted-foreground font-medium uppercase">Week 2</span>
                 <span className="text-[10px] text-muted-foreground font-medium uppercase">Week 3</span>
                 <span className="text-[10px] text-muted-foreground font-medium uppercase">Week 4</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
