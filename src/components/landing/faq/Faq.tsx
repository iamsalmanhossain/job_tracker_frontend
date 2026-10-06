"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Faq() {
  return (
    <section id="faq" className="py-24 md:py-32 bg-background text-foreground border-y border-border">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/3">
            <div className="text-sm font-semibold text-green-600 dark:text-green-500 mb-2">10 — FAQs</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground mb-6">
              Got questions? We've got answers. If you have some other questions, feel free to reach out.
            </p>
            <button className="text-sm font-semibold border-b-2 border-foreground pb-1 hover:text-green-600 hover:border-green-600 transition-colors">
              View All FAQs →
            </button>
          </div>
          
          <div className="w-full md:w-2/3">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-border">
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline hover:text-green-600">Is JobTracker free to use?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! Our basic plan is completely free and includes tracking for up to 10 applications. You can upgrade to our Pro plan anytime for unlimited tracking and advanced features.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-border">
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline hover:text-green-600">Can I track multiple job applications?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Absolutely. That's the core of what we do. The Pro plan allows you to track an unlimited number of applications across different companies and roles.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-border">
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline hover:text-green-600">Is my data safe and private?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We take privacy very seriously. Your data is encrypted and we never sell your personal information or application data to third parties.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-border">
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline hover:text-green-600">Do you have a mobile app?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Our web application is fully responsive and works beautifully on any mobile device. We are also working on dedicated native apps for iOS and Android.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
