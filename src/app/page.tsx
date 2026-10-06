import Navbar from "@/components/landing/navbar/Navbar"
import Hero from "@/components/landing/hero/Hero"
import Features from "@/components/landing/features/Features"
import Stats from "@/components/landing/stats/Stats"
import HowItWorks from "@/components/landing/how-it-works/HowItWorks"
import DashboardPreview from "@/components/landing/dashboard-preview/DashboardPreview"
import JobRecommendations from "@/components/landing/job-recommendations/JobRecommendations"
import Testimonials from "@/components/landing/testimonials/Testimonials"
import Pricing from "@/components/landing/pricing/Pricing"
import Faq from "@/components/landing/faq/Faq"
import Cta from "@/components/landing/cta/Cta"
import Footer from "@/components/landing/footer/Footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen selection:bg-green-500 selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Stats />
        <HowItWorks />
        <DashboardPreview />
        <JobRecommendations />
        <Testimonials />
        <Pricing />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </div>
  )
}