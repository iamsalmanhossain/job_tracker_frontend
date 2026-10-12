"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ArrowUpRight, HelpCircle } from "lucide-react"
import Link from "next/link"

export default function Faq() {
  return (
    <section id="faq" className="py-14 md:py-18 bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          
          <div className="w-full md:w-1/3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C3627]/10 dark:bg-[#A3B18A]/15 text-[#1C3627] dark:text-[#A3B18A] text-xs font-bold uppercase tracking-wider mb-3 border border-[#1C3627]/20 dark:border-[#A3B18A]/20">
              <HelpCircle className="w-3.5 h-3.5" />
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-3 leading-tight">
              Got questions?<br />We have answers.
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Everything you need to know about tracking your job applications, data security, and platform capabilities.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1C3627] dark:text-[#A3B18A] hover:underline mt-5"
            >
              Get started now for free
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          
          <div className="w-full md:w-2/3">
            <Accordion className="w-full border-t border-border/20">
              <AccordionItem value="item-1" className="border-border/20">
                <AccordionTrigger className="text-left font-bold text-base hover:no-underline py-5 text-foreground">
                  How does Next Job Track organize my job applications?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                  Next Job Track offers a structured pipeline with five core application stages: Applied, Screening, Interview, Offer, and Rejected. You can assign custom priorities (High, Medium, Low), record company URLs, attach Cloudinary resumes, and log specific recruiter notes.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-border/20">
                <AccordionTrigger className="text-left font-bold text-base hover:no-underline py-5 text-foreground">
                  Can I schedule interviews with meeting links and follow-ups?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                  Yes! You can log interview dates, select round types (Technical, Behavioral, Screening, Final), and attach Google Meet or Zoom links. Additionally, our Follow-ups module lets you set alert reminders so you never forget to touch base with hiring managers.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-border/20">
                <AccordionTrigger className="text-left font-bold text-base hover:no-underline py-5 text-foreground">
                  How is my resume stored and is it secure?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                  Resumes are securely uploaded to Cloudinary CDN using encrypted streams. Only you have access to your resume versions, which you can preview directly in your browser or attach to applications.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-border/20">
                <AccordionTrigger className="text-left font-bold text-base hover:no-underline py-5 text-foreground">
                  Is Next Job Track completely free for job seekers?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                  Yes, 100% free for talent. We believe job seekers shouldn't have to pay to stay organized during one of the most critical stages of their career. All application tracking, resume management, and analytics features are fully unlocked.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-border/20">
                <AccordionTrigger className="text-left font-bold text-base hover:no-underline py-5 text-foreground">
                  How does authentication work?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                  The application uses an enterprise-grade dual-token JWT architecture (short-lived Access Token + long-lived Refresh Token) with silent token refreshing and Google OAuth 2.0 integration for fast and secure login.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

        </div>
      </div>
    </section>
  )
}
