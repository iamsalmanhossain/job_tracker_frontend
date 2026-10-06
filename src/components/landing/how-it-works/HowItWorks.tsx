"use client"

import { motion } from "framer-motion"

const steps = [
  {
    num: "1",
    title: "Create Your Account",
    description: "Sign up in seconds and set up your profile."
  },
  {
    num: "2",
    title: "Add Your Applications",
    description: "Input job details, track status and set reminders."
  },
  {
    num: "3",
    title: "Stay on Track",
    description: "Get updates, follow up on time and land your dream job."
  }
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-secondary/30 text-foreground">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <div className="text-sm font-semibold text-green-600 dark:text-green-500 mb-2">04 — How It Works</div>
          <h2 className="text-4xl font-bold mb-4">Get Started in 3 Simple Steps</h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            It only takes a few minutes to set up. Start tracking your job search and take control of your career journey.
          </p>
          <div className="mt-6 relative inline-block">
            <span className="font-handwriting text-xl text-muted-foreground transform -rotate-6 inline-block">Simple steps. Big results.</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-green-500/0 via-green-500/30 to-green-500/0 z-0"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.2, type: "spring", bounce: 0.4 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-card border-4 border-background flex items-center justify-center text-2xl font-bold text-green-600 dark:text-green-500 mb-6 shadow-xl shadow-green-900/5">
                {step.num}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
