"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 bg-secondary/30 text-foreground relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-sm font-semibold text-green-600 dark:text-green-500 mb-2">09 — Simple & Transparent</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Choose Your Plan</h2>
          <p className="text-muted-foreground mb-8">
            Start free, upgrade anytime. No hidden fees.
          </p>
          
          <div className="inline-flex items-center p-1 bg-secondary rounded-full">
            <button className="px-6 py-2 rounded-full bg-background shadow-sm font-medium text-sm text-foreground">Monthly</button>
            <button className="px-6 py-2 rounded-full text-muted-foreground font-medium text-sm flex items-center gap-2">
              Yearly <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-600 dark:text-green-400 text-xs">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            className="p-8 rounded-3xl border border-border bg-card"
          >
            <h3 className="text-xl font-bold mb-2">Free</h3>
            <p className="text-sm text-muted-foreground mb-6">For getting started</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">$0</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              {['Track up to 10 applications', 'Basic analytics', 'Calendar & reminders'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button variant="outline" className="w-full rounded-full h-12 border-border hover:bg-secondary text-foreground">Get Started</Button>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-3xl border-2 border-green-500 bg-green-50 dark:bg-green-950/20 relative transform md:-translate-y-4 shadow-xl shadow-green-500/10"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              Most Popular
            </div>
            <h3 className="text-xl font-bold mb-2">Pro</h3>
            <p className="text-sm text-muted-foreground mb-6">For serious job seekers</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">$5</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              {['Unlimited applications', 'Advanced analytics', 'Priority support', 'Resume reviews'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-foreground font-medium">
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button className="w-full rounded-full h-12 bg-green-600 hover:bg-green-700 text-white">Get Started</Button>
          </motion.div>

          {/* Team Plan */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-3xl border border-border bg-card"
          >
            <h3 className="text-xl font-bold mb-2">Team</h3>
            <p className="text-sm text-muted-foreground mb-6">For career coaches & teams</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">$12</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              {['Team collaboration', 'Shared job board', 'Advanced reporting', 'Custom branding'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-foreground">
                  <Check className="w-5 h-5 text-green-500 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button variant="outline" className="w-full rounded-full h-12 border-border hover:bg-secondary text-foreground">Get Started</Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
