import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-secondary/30 text-foreground py-12 border-t border-border">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-md bg-green-500 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <span className="text-lg font-bold">JobTracker</span>
          </Link>
          <p className="text-xs text-muted-foreground">Track, Apply, Get Hired.</p>
        </div>
        
        <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <Link href="#home" className="hover:text-foreground hover:text-green-600 transition-colors">Home</Link>
          <Link href="#features" className="hover:text-foreground hover:text-green-600 transition-colors">Features</Link>
          <Link href="#how-it-works" className="hover:text-foreground hover:text-green-600 transition-colors">How It Works</Link>
          <Link href="#pricing" className="hover:text-foreground hover:text-green-600 transition-colors">Pricing</Link>
          <Link href="#faq" className="hover:text-foreground hover:text-green-600 transition-colors">FAQ</Link>
        </nav>

        <div className="text-xs text-muted-foreground flex flex-col items-center md:items-end">
          <div className="flex gap-4 mb-2">
            {/* Social Icons Placeholder */}
            <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
            <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
          </div>
          <p>© 2024 JobTracker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
