"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ArrowUpRight } from "lucide-react"

export default function Faq() {
  return (
    <section id="faq" className="py-24 md:py-32 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          
          <div className="w-full md:w-1/3">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Good questions.<br/>Clear answers.</h2>
            <button className="text-sm font-semibold flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors mt-6">
              <ArrowUpRight className="w-4 h-4" />
              Visit our Help Center
            </button>
          </div>
          
          <div className="w-full md:w-2/3">
            <Accordion className="w-full border-t border-border">
              <AccordionItem value="item-1" className="border-border">
                <AccordionTrigger className="text-left font-bold text-lg hover:no-underline py-6">Can I track multiple job applications?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  Yes, you can track an unlimited number of job applications. Our platform is designed to help you manage your entire job search journey in one place.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-border">
                <AccordionTrigger className="text-left font-bold text-lg hover:no-underline py-6">Is my data safe and private?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  Absolutely. We use industry-standard encryption to protect your data, and we never sell your personal information to third parties.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-border">
                <AccordionTrigger className="text-left font-bold text-lg hover:no-underline py-6">Do you have a mobile app?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  Currently, our platform is fully responsive and works beautifully on any mobile browser. A dedicated mobile app is on our roadmap for the future.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-border">
                <AccordionTrigger className="text-left font-bold text-lg hover:no-underline py-6">Is JobTracker free to use?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base">
                  Yes, our basic features are completely free. We also offer premium plans for advanced features and unlimited tracking capabilities.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

        </div>
      </div>
    </section>
  )
}
