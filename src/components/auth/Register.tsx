"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail } from "lucide-react"

export default function Register() {
  return (
    <div className="min-h-screen flex lg:grid lg:grid-cols-2 bg-background relative overflow-hidden">
      
      {/* Left side: Form */}
      <div className="w-full min-h-screen flex items-center justify-center p-4 lg:p-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl p-8 relative"
        >
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-foreground">Create an account</h1>
            <p className="text-muted-foreground">Start tracking your job applications today.</p>
          </div>

          <form className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" placeholder="John" required className="h-11 bg-background" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" placeholder="Doe" required className="h-11 bg-background" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required className="h-11 bg-background" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required className="h-11 bg-background" />
            </div>

            <Button type="submit" className="w-full h-11 bg-[#1C3627] hover:bg-[#15291d] text-white dark:bg-[#A3B18A] dark:text-[#1C3627] dark:hover:bg-[#8e9a78] font-semibold">
              Create Account
            </Button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px bg-border flex-1" />
            <span className="text-sm text-muted-foreground">Or sign up with</span>
            <div className="h-px bg-border flex-1" />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-11 border-border hover:bg-secondary">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </Button>
            <Button variant="outline" className="h-11 border-border hover:bg-secondary">
              <Mail className="w-5 h-5 mr-2" />
              Google
            </Button>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-indigo-600 dark:text-indigo-500 hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right side: Animation */}
      <div className="hidden lg:flex relative w-full h-full bg-muted/20 items-center justify-center overflow-hidden border-l border-border">
         <div className="absolute inset-0 bg-gradient-to-br from-[#1C3627]/10 to-[#A3B18A]/10 dark:from-[#1C3627]/30 dark:to-[#131C16]/30" />
         
         <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="w-[500px] h-[500px] bg-[#84A98C]/20 dark:bg-[#A3B18A]/10 rounded-full blur-[100px] absolute"
         />
         
         <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10 max-w-md w-full text-center p-8 bg-background/60 backdrop-blur-2xl border border-border/50 rounded-3xl shadow-2xl mx-8"
         >
            <div className="w-16 h-16 rounded-xl bg-[#1C3627] dark:bg-[#A3B18A] flex items-center justify-center mx-auto mb-6 shadow-lg">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white dark:text-[#1C3627]">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                  <path d="M3 9h18"/>
                  <path d="M9 21V9"/>
               </svg>
            </div>
            
            <h2 className="text-3xl font-bold mb-4 text-foreground">A clearer next step.</h2>
            <p className="text-muted-foreground mb-8">Join thousands of professionals finding their path with ease.</p>
            
            {/* Animated UI bars */}
            <div className="space-y-4">
               {[1, 2, 3].map((i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0, scaleX: 0 }}
                   animate={{ opacity: 1, scaleX: 1 }}
                   transition={{ delay: 0.5 + (i * 0.2), duration: 0.8, type: "spring" }}
                   style={{ originX: 0 }}
                   className="h-10 rounded-lg bg-card/80 border border-border/50 shadow-sm w-full flex items-center px-4"
                 >
                   <div className="w-6 h-6 rounded-full bg-muted mr-3 flex shrink-0" />
                   <div className="h-2 rounded bg-muted w-1/2" />
                 </motion.div>
               ))}
            </div>
         </motion.div>
      </div>
    </div>
  )
}
