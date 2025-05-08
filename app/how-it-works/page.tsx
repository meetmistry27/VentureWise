import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, Wallet, LineChart, Users, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp } from "lucide-react"

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-emerald-600" />
            <span className="text-xl font-bold">VentureWise</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <Link href="/how-it-works" className="text-sm font-medium text-emerald-600">
              How It Works
            </Link>
            {/* <Link href="/assessment" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              Risk Assessment
            </Link> */}
            {/* <Link href="/investor" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              For Investors
            </Link>
            <Link href="/startup/dashboard" className="text-sm font-medium hover:text-emerald-600 transition-colors">
              For Startups
            </Link> */}
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            {/* <Link href="/register">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Register</Button>
            </Link> */}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-emerald-600 to-emerald-700 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                How VentureWise Works
              </h1>
              <p className="max-w-[700px] text-emerald-100 md:text-xl">
                Your comprehensive guide to using our platform for startup investments and fundraising
              </p>
            </div>
          </div>
        </section>

        {/* Authentication Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
              <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700 mb-2">
                Passwordless Authentication
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Secure Login with MetaMask</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl">
                VentureWise uses passwordless authentication through MetaMask wallet addresses, providing a secure and
                seamless experience.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 md:gap-12">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    1
                  </div>
                  <CardTitle>Connect Your Wallet</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center mb-4">
                    <Wallet className="h-16 w-16 text-emerald-600 mb-4" />
                  </div>
                  <p className="text-gray-500">
                    Click on the "Login" button. You'll be prompted to connect your MetaMask wallet to the platform.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    2
                  </div>
                  <CardTitle>Account Creation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center mb-4">
                    <Users className="h-16 w-16 text-emerald-600 mb-4" />
                  </div>
                  <p className="text-gray-500">
                    For new users, a form will appear asking for your email and role (Investor or Startup). Your wallet
                    address will be pre-loaded from MetaMask.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    3
                  </div>
                  <CardTitle>Access Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center mb-4">
                    <BarChart3 className="h-16 w-16 text-emerald-600 mb-4" />
                  </div>
                  <p className="text-gray-500">
                    After login or registration, you'll be directed to your personalized dashboard based on your role
                    (Investor or Startup).
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* User Guides Section */}
        <section className="w-full py-12 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="startups" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="startups">For Startups</TabsTrigger>
                  <TabsTrigger value="investors">For Investors</TabsTrigger>
                </TabsList>
              </div>

              {/* For Startups Tab */}
              <TabsContent value="startups" className="space-y-16">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/2 space-y-4">
                    <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                      Step 1
                    </div>
                    <h3 className="text-2xl font-bold">Create Your Startup Profile</h3>
                    <p className="text-gray-500">
                      Get started by creating a comprehensive profile for your startup. Click on the "Create Startup"
                      button in your dashboard to begin.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>Enter your startup details including name, industry, and location</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>Upload your logo and pitch deck</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>Set your funding goals and timeline</span>
                      </li>
                    </ul>
                  </div>
                  <div className="md:w-1/2 bg-white p-4 rounded-xl shadow-md">
                    <div className="aspect-video relative bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=400&width=600"
                        alt="Create Startup Form"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                  <div className="md:w-1/2 space-y-4">
                    <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                      Step 2
                    </div>
                    <h3 className="text-2xl font-bold">Monitor Your Dashboard</h3>
                    <p className="text-gray-500">
                      Use your dashboard to monitor all details of your startups, track investments, and manage your
                      fundraising campaign.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>View all your listed startups in one place</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>Track funding progress and investor interest</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>Monitor key metrics and performance indicators</span>
                      </li>
                    </ul>
                  </div>
                  <div className="md:w-1/2 bg-white p-4 rounded-xl shadow-md">
                    <div className="aspect-video relative bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=400&width=600"
                        alt="Startup Dashboard"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/2 space-y-4">
                    <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                      Step 3
                    </div>
                    <h3 className="text-2xl font-bold">Utilize Risk Assessment</h3>
                    <p className="text-gray-500">
                      Leverage our AI-powered risk assessment model to identify strengths and areas for improvement in
                      your startup.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>Click the "Assess Startup" button on any of your startup cards</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>Receive a comprehensive risk analysis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>Get actionable recommendations to improve your risk score</span>
                      </li>
                    </ul>
                  </div>
                  <div className="md:w-1/2 bg-white p-4 rounded-xl shadow-md">
                    <div className="aspect-video relative bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=400&width=600"
                        alt="Risk Assessment"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                  <div className="md:w-1/2 space-y-4">
                    <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                      Step 4
                    </div>
                    <h3 className="text-2xl font-bold">Analyze Growth Trajectory</h3>
                    <p className="text-gray-500">
                      Use our analytics tools to understand your growth trajectory and make data-driven decisions.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>Click the "Analytics" button to access detailed insights</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>View growth projections and market comparisons</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>Track investor engagement and funding milestones</span>
                      </li>
                    </ul>
                  </div>
                  <div className="md:w-1/2 bg-white p-4 rounded-xl shadow-md">
                    <div className="aspect-video relative bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=400&width=600"
                        alt="Growth Analytics"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/2 space-y-4">
                    <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                      Step 5
                    </div>
                    <h3 className="text-2xl font-bold">Manage Your Startups</h3>
                    <p className="text-gray-500">
                      Keep your startup information up-to-date and manage your listings effectively.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>Edit startup information under the "My Startups" tab</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>Update financials, team information, and milestones</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>Delist startups when needed using the "Delist" button</span>
                      </li>
                    </ul>
                  </div>
                  <div className="md:w-1/2 bg-white p-4 rounded-xl shadow-md">
                    <div className="aspect-video relative bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=400&width=600"
                        alt="Startup Management"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* For Investors Tab */}
              <TabsContent value="investors" className="space-y-16">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/2 space-y-4">
                    <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                      Step 1
                    </div>
                    <h3 className="text-2xl font-bold">Browse Startup Opportunities</h3>
                    <p className="text-gray-500">
                      Explore all the listed startups directly on the website home page and discover investment
                      opportunities.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>View all available startups on the investor dashboard</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>See key metrics like risk level, funding goals, and industry</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>Click on any startup card to view detailed information</span>
                      </li>
                    </ul>
                  </div>
                  <div className="md:w-1/2 bg-white p-4 rounded-xl shadow-md">
                    <div className="aspect-video relative bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=400&width=600"
                        alt="Browse Startups"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                  <div className="md:w-1/2 space-y-4">
                    <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                      Step 2
                    </div>
                    <h3 className="text-2xl font-bold">Search and Filter</h3>
                    <p className="text-gray-500">
                      Find startups that match your investment criteria using our powerful search and filtering tools.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>Use the search bar to find startups by name, industry, or location</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>Filter startups by risk level (Low, Moderate)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>Filter by industry to focus on sectors you're interested in</span>
                      </li>
                    </ul>
                  </div>
                  <div className="md:w-1/2 bg-white p-4 rounded-xl shadow-md">
                    <div className="aspect-video relative bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=400&width=600"
                        alt="Search and Filter"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/2 space-y-4">
                    <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                      Step 3
                    </div>
                    <h3 className="text-2xl font-bold">Invest in Startups</h3>
                    <p className="text-gray-500">
                      Invest in promising startups directly through our platform with just a few clicks.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>Click the "Invest Now" button on any startup card</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>Enter your investment amount (minimum varies by startup)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>Complete the transaction using your connected wallet</span>
                      </li>
                    </ul>
                  </div>
                  <div className="md:w-1/2 bg-white p-4 rounded-xl shadow-md">
                    <div className="aspect-video relative bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=400&width=600"
                        alt="Invest in Startups"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                  <div className="md:w-1/2 space-y-4">
                    <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                      Step 4
                    </div>
                    <h3 className="text-2xl font-bold">Track Your Portfolio</h3>
                    <p className="text-gray-500">
                      Monitor all your investments and track their performance in the Portfolio section.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>Access the Portfolio section to see all your investments</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>View performance metrics and returns for each investment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <span>Track your overall portfolio growth and diversification</span>
                      </li>
                    </ul>
                  </div>
                  <div className="md:w-1/2 bg-white p-4 rounded-xl shadow-md">
                    <div className="aspect-video relative bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=400&width=600"
                        alt="Portfolio Tracking"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Profile Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
              <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700 mb-2">
                For All Users
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Manage Your Profile</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl">
                Both investors and startup founders can update their personal information and preferences through the
                profile section.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2 space-y-4">
                <h3 className="text-2xl font-bold">Profile Management</h3>
                <p className="text-gray-500">
                  Keep your personal information up-to-date and manage your account settings.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Update your name, email, and profile picture</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Manage notification preferences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>View your connected wallet information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span>Update your professional background and interests</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 bg-white p-4 rounded-xl shadow-md">
                <div className="aspect-video relative bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Profile Management"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {/* <section className="w-full py-12 md:py-24 bg-emerald-600 text-white">
          <div className="container px-4 md:px-6 text-center">
            <div className="mx-auto max-w-3xl space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to get started?</h2>
              <p className="text-emerald-100 md:text-xl">
                Join VentureWise today and be part of the future of startup investing and fundraising.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                <Link href="/register">
                  <Button className="bg-white text-emerald-600 hover:bg-emerald-50">Create Account</Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="text-white border-white hover:bg-emerald-700">
                    Login
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
            <LineChart className="h-5 w-5 text-emerald-600" />
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
