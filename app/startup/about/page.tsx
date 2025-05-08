"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle,
  Info,
  Wallet,
  PlusCircle,
  BarChart3,
  Edit,
  Clock,
  DollarSign,
  Coins,
  Shield,
  FileText,
  Users,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/AuthContext"

export default function HowItWorksFounder() {
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
            <h1 className="text-2xl font-bold text-gray-900">Founder Guide</h1>
            <div className="flex items-center gap-4">
              <Link href="/investor/about">
                <Button variant="outline">Investor Guide</Button>
              </Link>
              {user ? (
                <Link href="/startup/dashboard">
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
            How VentureWise Works for <span className="text-primary">Founders</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600">
            Your comprehensive guide to raising capital, managing your startup profile, and connecting with investors on
            the VentureWise platform.
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
                href="#creating-startup"
                className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <PlusCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Creating Your Startup</h3>
                  <p className="text-sm text-gray-500">Profile setup & information</p>
                </div>
              </Link>
              <Link href="#dashboard" className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Dashboard Overview</h3>
                  <p className="text-sm text-gray-500">Managing your startup</p>
                </div>
              </Link>
              <Link
                href="#receiving-investments"
                className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Receiving Investments</h3>
                  <p className="text-sm text-gray-500">Investment process & approval</p>
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
                  <p className="text-sm text-gray-500">Managing token distribution</p>
                </div>
              </Link>
              <Link
                href="#profile-management"
                className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="bg-primary/10 p-2 rounded-full mr-3">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Profile Management</h3>
                  <p className="text-sm text-gray-500">Updating your information</p>
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
                    <p className="font-medium">Select "Founder" as your role</p>
                    <p className="text-gray-600">
                      This will give you access to all founder-specific features on the platform.
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
                <span>Receiving investments securely</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Distributing token rewards to investors</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Verifying your identity on the blockchain</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Accessing blockchain-based features</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Creating Your Startup Section */}
        <section id="creating-startup" className="mb-16 scroll-mt-24">
          <div className="flex items-center mb-6">
            <PlusCircle className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Creating Your Startup</h2>
          </div>
          <Separator className="mb-8" />

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Setting Up Your Startup Profile</h3>
            <p className="text-gray-700 mb-6">
              After creating your account and connecting your wallet, you'll need to create a detailed profile for your
              startup to attract potential investors.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-lg font-medium mb-3">Basic Information</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Startup Name</p>
                      <p className="text-gray-600 text-sm">Choose a clear, memorable name for your venture.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Industry Category</p>
                      <p className="text-gray-600 text-sm">Select the industry that best represents your startup.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-gray-600 text-sm">Specify where your startup is based.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Founding Date</p>
                      <p className="text-gray-600 text-sm">When your startup was established.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-3">Detailed Information</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Business Description</p>
                      <p className="text-gray-600 text-sm">A compelling overview of what your startup does.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Problem & Solution</p>
                      <p className="text-gray-600 text-sm">
                        Clearly articulate the problem you're solving and your solution.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Target Market</p>
                      <p className="text-gray-600 text-sm">Define your customer base and market size.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Business Model</p>
                      <p className="text-gray-600 text-sm">Explain how your startup generates revenue.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-lg font-medium mb-3">Financial Information</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Funding Goal</p>
                      <p className="text-gray-600 text-sm">The amount of capital you're looking to raise.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Equity Offering</p>
                      <p className="text-gray-600 text-sm">Percentage of equity you're willing to offer investors.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Current Valuation</p>
                      <p className="text-gray-600 text-sm">Your startup's estimated value.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Revenue (if applicable)</p>
                      <p className="text-gray-600 text-sm">Current or projected revenue figures.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-3">Team & Media</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Team Members</p>
                      <p className="text-gray-600 text-sm">Information about key team members and their expertise.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Logo & Images</p>
                      <p className="text-gray-600 text-sm">Upload your startup logo and relevant images.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Pitch Deck (optional)</p>
                      <p className="text-gray-600 text-sm">Upload a PDF of your pitch presentation.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Website & Social Links</p>
                      <p className="text-gray-600 text-sm">Add links to your online presence.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <div className="flex">
                <Info className="h-5 w-5 text-blue-400 mr-2" />
                <div>
                  <p className="text-sm text-blue-700 font-medium">Pro Tip: Complete Your Profile</p>
                  <p className="text-sm text-blue-700">
                    Startups with complete profiles receive up to 5x more investor interest. Take time to fill out all
                    sections thoroughly and provide compelling information about your venture.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Submitting for Verification</h3>
            <p className="text-gray-700 mb-6">
              After completing your startup profile, it will be reviewed by our team to ensure it meets our platform
              standards.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-orange-500" />
                    Pending Review
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    Your profile is being reviewed by our team. This typically takes 1-2 business days.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-green-500" />
                    Verified
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    Your profile has been approved and is now visible to potential investors on the platform.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center">
                    <Edit className="h-5 w-5 mr-2 text-blue-500" />
                    Needs Updates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">
                    Your profile requires additional information or changes before it can be approved.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Dashboard Overview Section */}
        <section id="dashboard" className="mb-16 scroll-mt-24">
          <div className="flex items-center mb-6">
            <BarChart3 className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
          </div>
          <Separator className="mb-8" />

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Your Startup Dashboard</h3>
            <p className="text-gray-700 mb-6">
              The dashboard is your command center for managing your startup on VentureWise. Here's what you can do:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-lg mb-3">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">View investor profile visits</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Track investment interest</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Monitor funding progress</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-lg mb-3">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Investor Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">View current investors</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Review investment requests</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Communicate with potential investors</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="bg-primary/10 w-12 h-12 flex items-center justify-center rounded-lg mb-3">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Document Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Upload business documents</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Share financial reports</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Manage pitch materials</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h4 className="text-lg font-semibold mb-3">Key Dashboard Features</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Edit className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Edit Startup Profile</p>
                    <p className="text-sm text-gray-600">Update your startup information as your business evolves.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Funding Progress</p>
                    <p className="text-sm text-gray-600">Track how much of your funding goal has been reached.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Investor Directory</p>
                    <p className="text-sm text-gray-600">View and contact your current investors.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Coins className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Token Management</p>
                    <p className="text-sm text-gray-600">Distribute and manage token rewards for your investors.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Receiving Investments Section */}
        <section id="receiving-investments" className="mb-16 scroll-mt-24">
          <div className="flex items-center mb-6">
            <DollarSign className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Receiving Investments</h2>
          </div>
          <Separator className="mb-8" />

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">The Investment Process</h3>
            <p className="text-gray-700 mb-6">
              Understanding how investments flow into your startup is crucial for managing your fundraising efforts.
            </p>

            <div className="relative mb-12">
              <div className="absolute left-8 top-0 h-full w-0.5 bg-gray-200"></div>

              <div className="relative mb-8">
                <div className="flex items-center mb-4">
                  <div className="absolute left-0 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                    1
                  </div>
                  <div className="pl-24">
                    <h4 className="text-lg font-semibold">Investment Request</h4>
                    <p className="text-gray-600">
                      An investor expresses interest in your startup and submits an investment request through the
                      platform.
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
                    <h4 className="text-lg font-semibold">Review & Approval</h4>
                    <p className="text-gray-600">
                      You'll receive a notification about the investment request. Review the investor's profile and
                      decide whether to accept or decline.
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
                    <h4 className="text-lg font-semibold">Payment Processing</h4>
                    <p className="text-gray-600">
                      Once approved, the investor completes the payment through their connected wallet. The transaction
                      is recorded on the blockchain.
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
                    <h4 className="text-lg font-semibold">Equity & Token Distribution</h4>
                    <p className="text-gray-600">
                      The equity percentage is recorded, and token rewards (if applicable) are automatically distributed
                      to the investor's wallet.
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
                    <h4 className="text-lg font-semibold">Investor Relationship</h4>
                    <p className="text-gray-600">
                      The investor is now part of your startup's investor community. You can communicate with them
                      through the platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
              <div className="flex">
                <Info className="h-5 w-5 text-yellow-400 mr-2" />
                <div>
                  <p className="text-sm text-yellow-700 font-medium">Important Note on Investment Approval</p>
                  <p className="text-sm text-yellow-700">
                    Take time to review each investment request carefully. Consider the investor's profile, past
                    investments, and potential value they can bring beyond capital. You have the right to decline
                    investments that don't align with your startup's vision.
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
              VentureWise allows you to offer token rewards to your investors in addition to traditional equity. Here's
              how it works:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-lg font-medium mb-3">What Are Token Rewards?</h4>
                <p className="text-gray-600 mb-4">
                  Token rewards are digital assets issued by your startup that represent value or utility within your
                  ecosystem. They can provide additional incentives for investors beyond equity ownership.
                </p>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Benefits of Token Rewards</h5>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Attract investors interested in blockchain technology</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Create additional value for early supporters</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Build a community around your startup</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm">Provide liquidity options for investors</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-3">Setting Up Token Rewards</h4>
                <ol className="space-y-4">
                  <li className="flex">
                    <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary text-primary">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Define Your Token Economics</p>
                      <p className="text-gray-600 text-sm">
                        Determine the total supply, distribution, and utility of your tokens.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary text-primary">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Configure Token Settings</p>
                      <p className="text-gray-600 text-sm">
                        In your startup profile, navigate to the "Token Rewards" section and set up your token
                        parameters.
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary text-primary">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Set Distribution Rules</p>
                      <p className="text-gray-600 text-sm">
                        Define how tokens will be distributed to investors (e.g., based on investment amount).
                      </p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="mr-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-primary text-primary">
                      4
                    </div>
                    <div>
                      <p className="font-medium">Activate Token Rewards</p>
                      <p className="text-gray-600 text-sm">
                        Enable token rewards for your startup to make them available to investors.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <div className="flex">
                <Info className="h-5 w-5 text-blue-400 mr-2" />
                <div>
                  <p className="text-sm text-blue-700 font-medium">Token Compliance</p>
                  <p className="text-sm text-blue-700">
                    Ensure your token offering complies with relevant regulations in your jurisdiction. VentureWise
                    provides the technical infrastructure, but regulatory compliance is your responsibility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Profile Management Section */}
        <section id="profile-management" className="mb-16 scroll-mt-24">
          <div className="flex items-center mb-6">
            <Users className="h-8 w-8 text-primary mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Profile Management</h2>
          </div>
          <Separator className="mb-8" />

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Managing Your Founder Profile</h3>
            <p className="text-gray-700 mb-6">
              Your personal profile as a founder is separate from your startup profile. Here's how to manage it:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-lg font-medium mb-3">Profile Information</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Personal Details</p>
                      <p className="text-gray-600 text-sm">Update your name, email, phone number, and location.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Profile Picture</p>
                      <p className="text-gray-600 text-sm">
                        Upload a professional photo to build trust with investors.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Bio & Experience</p>
                      <p className="text-gray-600 text-sm">
                        Share your background, expertise, and entrepreneurial journey.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Social Media Links</p>
                      <p className="text-gray-600 text-sm">
                        Connect your LinkedIn, Twitter, and other professional profiles.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-medium mb-3">Account Settings</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Password Management</p>
                      <p className="text-gray-600 text-sm">Change your password and set up security questions.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Notification Preferences</p>
                      <p className="text-gray-600 text-sm">
                        Control which updates you receive via email and in-app notifications.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Wallet Connection</p>
                      <p className="text-gray-600 text-sm">
                        Manage your connected MetaMask wallet or connect a different wallet.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-primary/10 p-1 rounded-full mr-3 mt-0.5">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Privacy Settings</p>
                      <p className="text-gray-600 text-sm">
                        Control what information is visible to investors and other users.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 p-4">
              <div className="flex">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <div>
                  <p className="text-sm text-green-700 font-medium">Why Your Profile Matters</p>
                  <p className="text-sm text-green-700">
                    Investors often invest in people as much as ideas. A complete, professional founder profile
                    significantly increases your chances of securing investment. Take time to craft a compelling
                    narrative about yourself and your vision.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary/5 rounded-lg p-8 text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Your Fundraising Journey?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            VentureWise provides all the tools you need to connect with investors and grow your startup.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Button size="lg" asChild>
                <Link href="/startup/dashboard">
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
                <CardTitle className="text-lg">How long does the startup verification process take?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  The verification process typically takes 1-2 business days. You'll receive an email notification once
                  your startup has been verified.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I have multiple startups on the platform?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, you can create profiles for multiple startups under the same founder account. Each startup will
                  have its own separate profile and dashboard.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How do I communicate with potential investors?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  VentureWise provides an in-platform messaging system that allows you to communicate directly with
                  interested investors. You can access this from your dashboard.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What fees does VentureWise charge?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  VentureWise charges a small success fee on completed investments. There are no upfront costs for
                  creating and maintaining your startup profile.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I update my startup information after verification?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, you can update your startup profile at any time. Major changes may require re-verification, but
                  minor updates are applied immediately.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How are token rewards distributed to investors?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Token rewards are automatically distributed to investors' wallets based on the rules you set up. The
                  distribution happens when the investment is confirmed on the blockchain.
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
              <Link href="/how-it-works/investor">View Investor Guide</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
