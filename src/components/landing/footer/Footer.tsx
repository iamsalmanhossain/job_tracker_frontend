import Link from "next/link"
import { BrandLogo } from "@/components/ui/brand-logo"

export default function Footer() {
  return (
    <footer className="bg-background text-foreground py-12 border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <BrandLogo size={32} showText textClassName="text-xl font-bold group-hover:opacity-90 transition-opacity" />
          </Link>
          <p className="text-sm text-muted-foreground">Your job search. Smarter with Next Job Track.</p>
        </div>
        
        <nav className="flex flex-wrap justify-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
          <Link href="#dashboard-preview" className="hover:text-foreground transition-colors">Live Demo</Link>
          <Link href="#how-it-works" className="hover:text-foreground transition-colors">How It Works</Link>
          <Link href="#architecture" className="hover:text-foreground transition-colors">Architecture</Link>
          <Link href="#faq" className="hover:text-foreground transition-colors">FAQ</Link>
        </nav>

        <div className="text-sm text-muted-foreground flex flex-col items-center md:items-end">
          <p>© 2026 Next Job Track. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
