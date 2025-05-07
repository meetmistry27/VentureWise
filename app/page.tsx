import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BarChart3, LineChart, PieChart, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-emerald-600" />
            <span className="text-xl font-bold">VentureWise</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {/* <Link href="/" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Home
            </Link> */}
            {/* <Link href="/assessment" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Risk Assessment
            </Link> */}
            {/* <Link href="/investor" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              For Investors
            </Link> */}
            {/* <Link href="#features" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Features
            </Link> */}
            {/* <Link href="#testimonials" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Testimonials
            </Link> */}
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" className="hidden sm:flex">
                Get Started
              </Button>
            </Link>
            {/* <Link href="/assessment">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Try Assessment</Button>
            </Link> */}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-emerald-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                  Smart Crowdfunding Platform
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Make smarter investment decisions with VentureWise
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Our AI-powered platform analyzes startup data to predict success potential, helping investors make
                  informed decisions and startups understand their strengths and weaknesses.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  {/* <Link href="/assessment">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8">
                      Start Assessment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link> */}
                  <Link href="#features">
                    <Button variant="outline">Learn More</Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-[400px] lg:h-[600px] rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="VentureWise Dashboard"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-emerald-600">500+</h3>
                <p className="text-sm text-gray-500">Startups Assessed</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-emerald-600">₹120M</h3>
                <p className="text-sm text-gray-500">Funding Facilitated</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-emerald-600">92%</h3>
                <p className="text-sm text-gray-500">Prediction Accuracy</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-emerald-600">50+</h3>
                <p className="text-sm text-gray-500">Investor Partners</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 bg-emerald-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose VentureWise?</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform combines advanced analytics with industry expertise to provide comprehensive startup
                  assessments.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-emerald-100 p-3">
                  <BarChart3 className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold">Risk Assessment</h3>
                <p className="text-center text-gray-500">
                  Comprehensive analysis of startup risk factors based on market, team, and financial metrics.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-emerald-100 p-3">
                  <LineChart className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold">Growth Prediction</h3>
                <p className="text-center text-gray-500">
                  AI-powered forecasting of startup growth potential based on historical data and market trends.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-emerald-100 p-3">
                  <PieChart className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold">Investor Matching</h3>
                <p className="text-center text-gray-500">
                  Connect with investors who are specifically interested in your industry and growth stage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Success Stories</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from startups and investors who have benefited from our platform.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <div className="rounded-lg border p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-gray-100 p-2">
                    <Users className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">HealthTech Innovations</h3>
                    <p className="text-sm text-gray-500">Bangalore-based startup</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-500">
                  "VentureWise helped us identify key areas for improvement before approaching investors. After
                  implementing their suggestions, we secured ₹20M in funding within 3 months."
                </p>
              </div>
              <div className="rounded-lg border p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-gray-100 p-2">
                    <Users className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Nexus Ventures</h3>
                    <p className="text-sm text-gray-500">Early-stage investor</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-500">
                  "As an investment firm, we rely on VentureWise's analytics to pre-screen potential investments. Their
                  risk assessment has proven remarkably accurate and saved us countless hours of due diligence."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {/* <section className="w-full py-12 md:py-24 bg-emerald-600">
          <div className="container px-4 md:px-6 text-center">
            <div className="mx-auto max-w-3xl space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
                Ready to assess your startup?
              </h2>
              <p className="text-white/80 md:text-xl">
                Get a comprehensive risk assessment and connect with potential investors today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                <Link href="/assessment">
                  <Button className="bg-white text-emerald-600 hover:bg-gray-100 px-8">Start Assessment</Button>
                </Link>
                <Link href="/investor">
                  <Button variant="outline" className="text-white border-white hover:bg-emerald-700">
                    Investor Dashboard
                  </Button>
                </Link>
                <Link href="#features">
                  <Button variant="outline" className="text-white border-white hover:bg-emerald-700">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section> */}
      </main>

      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-16 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            <span className="font-semibold">VentureWise</span>
          </div>
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} VentureWise. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-xs text-gray-500 hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-gray-500 hover:underline">
              Terms of Service
            </Link>
            <Link href="#" className="text-xs text-gray-500 hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
