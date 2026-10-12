"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Cta() {
  return (
    <section className="py-16 bg-[#DCE8DB] dark:bg-[#0D140F] text-[#1C3627] dark:text-[#E8EDE6] relative overflow-hidden border-t border-border/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full">
          <div className="text-center md:text-left">
            <div className="text-xs font-semibold mb-2 uppercase tracking-wider text-[#1C3627]/70 dark:text-[#E8EDE6]/70">You have ambition</div>
            <h2 className="text-4xl md:text-5xl font-bold">Let's make room for it.</h2>
          </div>
          
          <div>
            <Link href="/register" className="inline-flex items-center justify-center bg-[#1C3627] hover:bg-[#15291d] text-white dark:bg-[#A3B18A] dark:text-[#1C3627] dark:hover:bg-[#8e9a78] font-semibold rounded-full px-8 h-12 text-base">
              Start tracking free
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
