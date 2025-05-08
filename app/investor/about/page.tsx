"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle,
  Info,
  Wallet,
  Search,
  BarChart3,
  DollarSign,
  Coins,
  Shield,
  FileText,
  Users,
  Filter,
  Star,
  PieChart,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/AuthContext"

export default function HowItWorksInvestor() {
  const { user } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Sticky Navigation */}
      <div
        className={`sticky top-0 z-10 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Investor Guide</h1>
            <div className="flex items-center gap-4">
              <Link href="/startup/about">
                <Button variant="outline">Founder Guide</Button>
              </Link>
              {user ? (
                <Link href="/investor">
                  <Button>
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button>
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            How VentureWise Works for <span className="text-primary">Investors</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600">
            Your comprehensive guide to discovering, evaluating, and investing in promising startups on the VentureWise
            platform.
          </p>
          <div className="mt-8 flex justify-center">
            <Button size="lg" asChild>
              <a href="#getting-started">
                Start Learning
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Table of Contents</CardTitle>
            <CardDescription>Navigate through the different sections of this guide</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link
                href="#getting-started"
                className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Wallet className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Getting Started</h3>
                  <p className="text-sm text-gray-500">Account creation & wallet setup</p>
                </div>
              </Link>
              <Link
                href="#discovering-startups"
                className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Search className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Discovering Startups</h3>
                  <p className="text-sm text-gray-500">Finding investment opportunities</p>
                </div>
              </Link>
              <Link
                href="#risk-assessment"
                className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Risk Assessment</h3>
                  <p className="text-sm text-gray-500">Evaluating startup potential</p>
                </div>
              </Link>
              <Link
                href="#making-investments"
                className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Making Investments</h3>
                  <p className="text-sm text-gray-500">Investment process & confirmation</p>
                </div>
              </Link>
              <Link
                href="#portfolio-management"
                className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <PieChart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Portfolio Management</h3>
                  <p className="text-sm text-gray-500">Tracking your investments</p>
                </div>
              </Link>
              <Link
                href="#token-rewards"
                className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Coins className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Token Rewards</h3>
                  <p className="text-sm text-gray-500">Understanding blockchain rewards</p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Getting Started Section */}
        <section id="getting-started" className="mb-16 scroll-mt-24">
          <div className="flex items-center mb-6">
            <Wallet className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Getting Started</h2>
          </div>
          <Separator className="mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Creating Your Account</h3>
              <ol className="space-y-4">
                <li className="flex">
                  <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary text-primary">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Visit the VentureWise registration page</p>
                    <p className="text-gray-600">
                      Navigate to the{" "}
                      <Link href="/register" className="text-primary hover:underline">
                        registration page
                      </Link>{" "}
                      to begin the account creation process.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary text-primary">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Fill in your basic information</p>
                    <p className="text-gray-600">Enter your name, email address, and create a secure password.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary text-primary">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Select "Investor" as your role</p>
                    <p className="text-gray-600">
                      This will give you access to all investor-specific features on the platform.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary text-primary">
                    4
                  </div>
                  <div>
                    <p className="font-medium">Verify your email address</p>
                    <p className="text-gray-600">
                      Click the verification link sent to your email to activate your account.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Connecting Your Wallet</h3>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex">
                  <Info className="h-5 w-5 text-yellow-400 mr-2" />
                  <p className="text-sm text-yellow-700">
                    You'll need to have MetaMask installed to connect your wallet. If you don't have it yet,{" "}
                    <a
                      href="https://metamask.io/download/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium underline"
                    >
                      download it here
                    </a>
                    .
                  </p>
                </div>
              </div>
              <ol className="space-y-4">
                <li className="flex">
                  <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary text-primary">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Click "Connect Wallet" in your profile</p>
                    <p className="text-gray-600">
                      After logging in, navigate to your profile and click the "Connect Wallet" button.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary text-primary">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Approve the connection in MetaMask</p>
                    <p className="text-gray-600">
                      A MetaMask popup will appear. Review the connection request and approve it.
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary text-primary">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Verify your wallet address</p>
                    <p className="text-gray-600">
                      Your wallet address will be displayed in your profile. Ensure it's correct.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>

          <div className="bg-primary/5 rounded-lg p-6">
            <h4 className="flex items-center text-lg font-semibold mb-3">
              <CheckCircle className="h-5 w-5 text-primary mr-2" />
              Why Connect a Wallet?
            </h4>
            <p className="text-gray-700 mb-4">Connecting your wallet is essential for:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Making secure investments in startups</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Receiving token rewards from startups</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Verifying your identity on the blockchain</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Tracking your investments transparently</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Discovering Startups Section */}
        <section id="discovering-startups" className="mb-16 scroll-mt-24">
          <div className="flex items-center mb-6">
            <Search className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Discovering Startups</h2>
          </div>
          <Separator className="mb-8" />

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Finding Investment Opportunities</h3>
            <p className="text-gray-700 mb-6">
              VentureWise provides multiple ways to discover promising startups that match your investment criteria.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-lg mb-3">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Browse Startups</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Explore the full catalog of verified startups on the platform.</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">View all available investment opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Sort by newest, trending, or funding goal</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Discover startups across all industries</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-lg mb-3">
                    <Filter className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Filter & Search</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Narrow down options based on specific criteria.</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Filter by industry, location, or funding stage</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Search for specific keywords or technologies</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Set investment amount range preferences</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* <Card>
                <CardHeader>
                  <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-lg mb-3">
                    <Star className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Featured Startups</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Discover highlighted opportunities curated by VentureWise.</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">View startups with strong traction</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Explore trending opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Discover innovative business models</span>
                    </li>
                  </ul>
                </CardContent>
              </Card> */}
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h4 className="text-lg font-semibold mb-3">Startup Profile Information</h4>
              <p className="text-gray-700 mb-4">
                When viewing a startup's profile, you'll find comprehensive information to help you make informed
                investment decisions:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Info className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Business Overview</p>
                    <p className="text-sm text-gray-600">
                      Company description, problem being solved, and solution offered.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Team Information</p>
                    <p className="text-sm text-gray-600">Founder backgrounds, expertise, and previous ventures.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Financial Details</p>
                    <p className="text-sm text-gray-600">
                      Funding goal, current valuation, revenue (if applicable), and equity offering.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Traction & Metrics</p>
                    <p className="text-sm text-gray-600">
                      User growth, key performance indicators, and market validation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <div className="flex">
                <Info className="h-5 w-5 text-blue-400 mr-2" />
                <div>
                  <p className="text-sm text-blue-700 font-medium">Pro Tip: Save Interesting Startups</p>
                  <p className="text-sm text-blue-700">
                    Use the "Save" feature to bookmark startups you're interested in for later review. This helps you
                    build a shortlist of potential investments without committing immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Risk Assessment Section */}
        <section id="risk-assessment" className="mb-16 scroll-mt-24">
          <div className="flex items-center mb-6">
            <Shield className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Risk Assessment</h2>
          </div>
          <Separator className="mb-8" />

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Evaluating Startup Potential</h3>
            <p className="text-gray-700 mb-6">
              VentureWise provides tools to help you assess the risk and potential of each startup before investing.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-lg font-medium mb-3">AI-Powered Risk Analysis</h4>
                <p className="text-gray-600 mb-4">
                  Our proprietary AI system analyzes multiple factors to provide a comprehensive risk assessment for
                  each startup.
                </p>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Factors Analyzed</h5>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Market size and growth potential</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Founder experience and track record</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Business model viability</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Competitive landscape</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Financial projections and current traction</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-3">Risk Score Interpretation</h4>
                <p className="text-gray-600 mb-4">
                  Each startup receives a risk score that helps you understand its investment potential.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-16 h-4 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium">Low Risk (70-100)</p>
                      <p className="text-sm text-gray-600">Strong fundamentals with high growth potential.</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-16 h-4 bg-yellow-500 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium">Moderate Risk (40-69)</p>
                      <p className="text-sm text-gray-600">Promising with some areas that need development.</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-16 h-4 bg-red-500 rounded-full mr-3"></div>
                    <div>
                      <p className="font-medium">High Risk (0-39)</p>
                      <p className="text-sm text-gray-600">Significant challenges or uncertainties present.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
              <div className="flex">
                <Info className="h-5 w-5 text-yellow-400 mr-2" />
                <div>
                  <p className="text-sm text-yellow-700 font-medium">Important Note on Risk Assessment</p>
                  <p className="text-sm text-yellow-700">
                    While our AI-powered risk assessment provides valuable insights, it should be used as one of many
                    tools in your investment decision process. Always conduct your own due diligence and consider
                    consulting with financial advisors before making investment decisions.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-semibold mb-3">Additional Due Diligence</h4>
              <p className="text-gray-700 mb-4">
                Beyond our risk assessment tools, consider these additional steps before investing:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Review Documentation</p>
                    <p className="text-sm text-gray-600">
                      Examine the startup's pitch deck, business plan, and financial projections.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Research the Team</p>
                    <p className="text-sm text-gray-600">
                      Look up the founders' backgrounds, previous ventures, and online presence.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Search className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Market Research</p>
                    <p className="text-sm text-gray-600">
                      Verify the market size and competitive landscape independently.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Financial Analysis</p>
                    <p className="text-sm text-gray-600">Assess the valuation, revenue projections, and burn rate.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Making Investments Section */}
        <section id="making-investments" className="mb-16 scroll-mt-24">
          <div className="flex items-center mb-6">
            <DollarSign className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Making Investments</h2>
          </div>
          <Separator className="mb-8" />

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">The Investment Process</h3>
            <p className="text-gray-700 mb-6">
              Once you've found a startup you want to invest in, the process is straightforward and secure.
            </p>

            <div className="relative mb-12">
              <div className="absolute left-8 top-0 h-full w-0.5 bg-gray-200"></div>

              <div className="relative mb-8">
                <div className="flex items-center mb-4">
                  <div className="absolute left-0 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                    1
                  </div>
                  <div className="pl-24">
                    <h4 className="text-lg font-semibold">Select Investment Amount</h4>
                    <p className="text-gray-600">
                      On the startup's profile, click "Invest" and specify how much you want to invest. The system will
                      calculate the equity percentage you'll receive.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative mb-8">
                <div className="flex items-center mb-4">
                  <div className="absolute left-0 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                    2
                  </div>
                  <div className="pl-24">
                    <h4 className="text-lg font-semibold">Submit Investment Request</h4>
                    <p className="text-gray-600">
                      Review the investment details and submit your request. The startup founder will be notified of
                      your interest.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative mb-8">
                <div className="flex items-center mb-4">
                  <div className="absolute left-0 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                    3
                  </div>
                  <div className="pl-24">
                    <h4 className="text-lg font-semibold">Founder Approval</h4>
                    <p className="text-gray-600">
                      The startup founder reviews your investment request and decides whether to accept it. You'll be
                      notified of their decision.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative mb-8">
                <div className="flex items-center mb-4">
                  <div className="absolute left-0 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                    4
                  </div>
                  <div className="pl-24">
                    <h4 className="text-lg font-semibold">Complete Payment</h4>
                    <p className="text-gray-600">
                      Once approved, you'll be prompted to complete the payment through your connected wallet. The
                      transaction is recorded on the blockchain.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center mb-4">
                  <div className="absolute left-0 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                    5
                  </div>
                  <div className="pl-24">
                    <h4 className="text-lg font-semibold">Receive Confirmation</h4>
                    <p className="text-gray-600">
                      After the payment is processed, you'll receive a confirmation of your investment, including equity
                      details and any token rewards.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
              <div className="flex">
                <Info className="h-5 w-5 text-blue-400 mr-2" />
                <div>
                  <p className="text-sm text-blue-700 font-medium">Investment Minimums and Maximums</p>
                  <p className="text-sm text-blue-700">
                    Each startup sets its own minimum and maximum investment amounts. These limits are clearly displayed
                    on the startup's profile page. Some startups may also limit the number of investors they accept.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-green-500" />
                    Secure Transactions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    All investments are processed through secure blockchain transactions, ensuring transparency and
                    security.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-500" />
                    Digital Agreements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    Investment terms are documented in digital agreements that are stored securely and accessible at any
                    time.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Coins className="h-5 w-5 mr-2 text-yellow-500" />
                    Instant Token Rewards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    If the startup offers token rewards, they are automatically distributed to your wallet upon
                    investment confirmation.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Portfolio Management Section */}
        <section id="portfolio-management" className="mb-16 scroll-mt-24">
          <div className="flex items-center mb-6">
            <PieChart className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Portfolio Management</h2>
          </div>
          <Separator className="mb-8" />

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Tracking Your Investments</h3>
            <p className="text-gray-700 mb-6">
              VentureWise provides comprehensive tools to monitor and manage your startup investments.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-lg font-medium mb-3">Portfolio Dashboard</h4>
                <p className="text-gray-600 mb-4">
                  Your investor dashboard gives you a complete overview of your investment portfolio.
                </p>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Key Features</h5>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Total investment amount across all startups</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Portfolio diversification by industry</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Total equity owned across startups</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Token rewards balance and history</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Investment performance metrics</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-3">Investment Details</h4>
                <p className="text-gray-600 mb-4">
                  For each investment, you can access detailed information and track progress.
                </p>
                <ul className="space-y-4">
                  <li className="flex">
                    <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary text-primary">
                      <BarChart3 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Startup Performance</p>
                      <p className="text-gray-600 text-sm">Track key metrics and milestones achieved by the startup.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary text-primary">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Investment Documents</p>
                      <p className="text-gray-600 text-sm">Access all agreements and transaction records.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary text-primary">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Founder Communication</p>
                      <p className="text-gray-600 text-sm">Direct messaging with startup founders for updates.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary text-primary">
                      <Coins className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Token Management</p>
                      <p className="text-gray-600 text-sm">View and manage tokens received from your investments.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h4 className="text-lg font-semibold mb-3">Filtering and Sorting</h4>
              <p className="text-gray-700 mb-4">
                Easily organize and analyze your investments with powerful filtering and sorting options:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Filter className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Filter by Date</p>
                    <p className="text-sm text-gray-600">View investments made within specific time periods.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Filter className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Filter by Amount</p>
                    <p className="text-sm text-gray-600">Sort investments by amount invested.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Filter className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Filter by Industry</p>
                    <p className="text-sm text-gray-600">View investments in specific sectors.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Filter className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Filter by Status</p>
                    <p className="text-sm text-gray-600">Track investments by their current status.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <div className="flex">
                <Info className="h-5 w-5 text-blue-400 mr-2" />
                <div>
                  <p className="text-sm text-blue-700 font-medium">Portfolio Analytics</p>
                  <p className="text-sm text-blue-700">
                    Use our advanced analytics tools to gain insights into your investment performance, diversification,
                    and potential opportunities for future investments. These analytics can help you make more informed
                    decisions about your portfolio strategy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Token Rewards Section */}
        <section id="token-rewards" className="mb-16 scroll-mt-24">
          <div className="flex items-center mb-6">
            <Coins className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Token Rewards</h2>
          </div>
          <Separator className="mb-8" />

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Understanding Token Rewards</h3>
            <p className="text-gray-700 mb-6">
              Many startups on VentureWise offer token rewards as an additional incentive for investors. Here's what you
              need to know:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-lg font-medium mb-3">What Are Token Rewards?</h4>
                <p className="text-gray-600 mb-4">
                  Token rewards are digital assets issued by startups that represent value or utility within their
                  ecosystem. They provide additional benefits beyond traditional equity.
                </p>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Benefits of Tokens</h5>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Potential for value appreciation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Early access to products or services</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Voting rights in certain platform decisions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Discounts on startup products or services</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-3">Managing Your Tokens</h4>
                <p className="text-gray-600 mb-4">
                  VentureWise makes it easy to track and manage the tokens you receive from your investments.
                </p>
                <ul className="space-y-4">
                  <li className="flex">
                    <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary text-primary">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Token Dashboard</p>
                      <p className="text-gray-600 text-sm">
                        View all your tokens in one place, including their current value and history.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary text-primary">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Token Transfers</p>
                      <p className="text-gray-600 text-sm">
                        Send or receive tokens directly through your connected wallet.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary text-primary">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Token Utility</p>
                      <p className="text-gray-600 text-sm">
                        Learn how to use your tokens within each startup's ecosystem.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary text-primary">
                      4
                    </div>
                    <div>
                      <p className="font-medium">Transaction History</p>
                      <p className="text-gray-600 text-sm">
                        Track all token-related transactions with complete transparency.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <Info className="h-5 w-5 text-yellow-400 mr-2" />
                <div>
                  <p className="text-sm text-yellow-700 font-medium">Important Note on Tokens</p>
                  <p className="text-sm text-yellow-700">
                    Token values can be volatile and may fluctuate based on various factors. While tokens offer exciting
                    opportunities, they also come with risks. Consider them as a bonus to your equity investment, not
                    the primary reason for investing in a startup.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary/5 rounded-lg p-8 text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Investing in Promising Startups?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            VentureWise provides all the tools you need to discover, evaluate, and invest in the next generation of
            innovative companies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Button size="lg" asChild>
                <Link href="/investor">
                  Go to Your Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <>
                <Button size="lg" asChild>
                  <Link href="/register">
                    Create Your Account
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
              </>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What is the minimum investment amount?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Minimum investment amounts vary by startup. Each startup sets its own minimum, which is clearly
                  displayed on their profile page. Some startups accept investments as low as $100, while others may
                  have higher minimums.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How do I receive returns on my investments?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Returns can come in several forms: equity appreciation (realized during exit events like acquisitions
                  or IPOs), dividends (if the startup distributes profits), or through token value appreciation and
                  utility.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Are my investments protected?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  While VentureWise verifies startups on the platform, investing in early-stage companies inherently
                  carries risk. We provide tools to help you assess risk, but we recommend diversifying your investments
                  and only investing what you can afford to lose.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I sell my equity or tokens?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Equity in private companies is generally illiquid until an exit event. However, tokens may be
                  transferable depending on their design and the startup's policies. Each startup provides information
                  about liquidity options in their profile.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What fees does VentureWise charge investors?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  VentureWise charges a small transaction fee on completed investments. There are no subscription fees
                  or hidden charges for using the platform. All fees are clearly displayed before you complete an
                  investment.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How do I communicate with startups I've invested in?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  After investing, you'll have access to a direct messaging system to communicate with the startup
                  founders. You'll also receive regular updates from the startups in your portfolio.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Additional Help?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our support team is available to assist you with any questions or issues you may encounter while using
            VentureWise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild>
              <a href="mailto:support@venturewise.com">Contact Support</a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/how-it-works/founder">View Founder Guide</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
