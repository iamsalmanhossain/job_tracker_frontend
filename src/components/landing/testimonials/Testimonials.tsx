"use client"

import { motion } from "framer-motion"

export default function Testimonials() {
  return (
    <section className="relative w-full py-32 flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=2669&auto=format&fit=crop")' }}
      >
        <div className="absolute inset-0 bg-white/50 dark:bg-black/60 backdrop-blur-[2px]"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-xs font-bold text-[#1C3627] dark:text-[#A3B18A] tracking-widest uppercase mb-4">
            It's not just about finding work.
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1C3627] dark:text-white mb-6 leading-tight">
            You're more than<br/>your job search.
          </h2>
          <p className="text-gray-800 dark:text-gray-200 text-sm font-medium uppercase tracking-wide">
            We exist to make the hard parts easy.<br/>
            So you can focus on being you.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
