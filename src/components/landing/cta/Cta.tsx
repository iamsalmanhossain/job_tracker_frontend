"use client"

import { Button } from "@/components/ui/button"

export default function Cta() {
  return (
    <section className="py-24 md:py-32 bg-background text-foreground border-y border-border relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-900/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-900/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-gradient-to-br from-green-500/10 to-transparent border border-border rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto shadow-2xl shadow-green-500/5">
          <div className="max-w-xl text-center md:text-left">
            <div className="text-sm font-semibold text-green-600 dark:text-green-500 mb-2">11 — Get Started Now</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Land Your Dream Job?</h2>
            <p className="text-muted-foreground">
              Join thousands of job seekers who are already using JobTracker.
            </p>
          </div>
          
          <div className="relative">
            <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white dark:text-black font-semibold rounded-full px-8 h-14 text-lg">
              Get Started Free →
            </Button>
            <div className="absolute -bottom-10 right-0 hidden md:block w-40 text-right">
              <span className="font-handwriting text-xl text-muted-foreground transform -rotate-12 inline-block">Better tracking.<br/>Better opportunities.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
