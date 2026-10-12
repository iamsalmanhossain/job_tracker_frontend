"use client"

import { motion } from "framer-motion"
import { Quote, Star, Sparkles, CheckCircle2 } from "lucide-react"

const testimonials = [
  {
    quote: "Next Job Track completely transformed my interview preparation. Having interview dates, custom follow-ups, and notes in one place helped me secure an offer in just 3 weeks.",
    author: "Tanvir Ahmed",
    role: "Senior Full Stack Engineer",
    company: "Hired at Tech Corp",
    rating: 5,
  },
  {
    quote: "Instead of messy spreadsheets and missed recruiter emails, I had complete clarity on my application pipeline and follow-up deadlines.",
    author: "Sarah Jenkins",
    role: "Frontend Developer",
    company: "Hired at Remote FinTech",
    rating: 5,
  },
  {
    quote: "The interface is sleek, dark mode is gorgeous, and the real-time conversion stats gave me confidence to double down on high-converting applications.",
    author: "Mahmud Hasan",
    role: "Software Engineer",
    company: "Hired at Global SaaS",
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative w-full py-14 md:py-20 bg-gradient-to-b from-background via-[#111D15]/40 to-background overflow-hidden border-y border-border/10">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#1C3627]/20 dark:bg-[#A3B18A]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C3627]/10 dark:bg-[#A3B18A]/15 text-[#1C3627] dark:text-[#A3B18A] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Candidate Success Stories
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
            Built for ambitious developers.<br />
            <span className="text-[#1C3627] dark:text-[#A3B18A]">Proven to land interviews.</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mt-3 max-w-xl mx-auto">
            See how modern candidates keep their pipelines clean and turn submissions into high-paying offers.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-6 w-full">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111D15] border border-border/20 shadow-xl flex flex-col justify-between hover:border-[#1C3627]/40 dark:hover:border-[#A3B18A]/40 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#1C3627]/30 dark:text-[#A3B18A]/30 group-hover:text-[#1C3627] dark:group-hover:text-[#A3B18A] transition-colors" />
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed italic mb-8">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-border/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1C3627] to-[#A3B18A] flex items-center justify-center text-white font-bold text-xs uppercase shadow-md">
                  {item.author.slice(0, 2)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                    {item.author}
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  </h4>
                  <p className="text-xs text-muted-foreground">{item.role} • <span className="text-[#1C3627] dark:text-[#A3B18A] font-semibold">{item.company}</span></p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
