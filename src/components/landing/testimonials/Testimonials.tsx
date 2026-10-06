"use client"

import { motion } from "framer-motion"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Rafi Ahmed",
    role: "Frontend Developer @ Google",
    content: "JobTracker made my job search so much easier. I got interview calls within 2 weeks of using it!",
    avatar: "11"
  },
  {
    name: "Nusrat Jahan",
    role: "Software Engineer @ Microsoft",
    content: "The reminder feature is a lifesaver! I never miss an interview now.",
    avatar: "12"
  },
  {
    name: "Tawkir Hasan",
    role: "Full Stack Developer @ Toptal",
    content: "Clean, simple and powerful. Exactly what I needed during my job search.",
    avatar: "13"
  }
]

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-background text-foreground border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-md">
            <div className="text-sm font-semibold text-green-500 mb-2">08 — What Our Users Say</div>
            <h2 className="text-4xl font-bold mb-4">Real Stories, Real Progress.</h2>
            <p className="text-muted-foreground">
              Hear from job seekers who found success with JobTracker.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-card border border-border"
            >
              <div className="flex items-center gap-4 mb-6">
                <Avatar>
                  <AvatarImage src={`https://i.pravatar.cc/150?img=${testimonial.avatar}`} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
