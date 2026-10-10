import Link from "next/link"
import { LayoutDashboard } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-background text-foreground py-16 border-t border-border mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#1C3627] dark:bg-[#A3B18A] flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-white dark:text-[#1C3627]" />
            </div>
            <span className="text-xl font-bold">nextstep.</span>
          </Link>
          <p className="text-sm text-muted-foreground">Your job search. A clearer next step.</p>
        </div>
        
        <nav className="flex flex-wrap justify-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#customers" className="hover:text-foreground transition-colors">Customers</Link>
          <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
          <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
        </nav>

        <div className="text-sm text-muted-foreground flex flex-col items-center md:items-end">
          <p>© 2026 nextstep. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
