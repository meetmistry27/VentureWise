"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { BarChart3, Building, ChevronRight, Edit, LineChart, Loader2, Plus, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/AuthContext"
import { startupAPI } from "@/lib/api"
import { StartupHeader } from "@/components/startup-header"
import { StartupFooter } from "@/components/startup-footer"
import { id } from "ethers"
//import { id } from param

export default function StartupDashboard() {
  const [startups, setStartups] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [refresh, setRefresh] = useState(false)


  
  useEffect(() => {
    const fetchStartups = async () => {
      const token = localStorage.getItem("token")
      const userId = localStorage.getItem("userId")
      try {
        // In a real app, we would filter by owner
        const response = await fetch("/api/startups/dashboard", {
          method: "POST", // ✅ Must be POST
          headers: {
            Authorization: `Bearer ${token} ${userId}`,
            "Content-Type": "application/json",
          },
        })
        // Filter startups by the current user (owner)
        
        const data = await response.json()
        console.log(data)
        const userStartups = data.startups

        setStartups(userStartups)
      } catch (err) {
        console.error("Error fetching startups:", err)
        setError("Failed to load your startups. Please try again.")
        toast({
          title: "Error",
          description: "Failed to load your startups. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStartups()

    // if (token) {
    //   fetchStartups()
    // } else {
    //   setLoading(false)
    // }
  }, [user, toast, refresh])

  const handleCreateStartup = () => {
    router.push("/startup/create")
  }

  // Mock data for the dashboard
  const mockFundingStats = {
    totalRaised: startups.reduce((sum, startup) => sum + (startup.fundingRaised || 0), 0),
    totalGoal: startups.reduce((sum, startup) => sum + (startup.fundingGoal || 0), 0),
    totalInvestors: startups.reduce((sum, startup) => sum + (startup.investorsCount || 0), 0),
    averageInvestment:
      startups.length > 0
        ? Math.round(
            startups.reduce((sum, startup) => sum + (startup.fundingRaised || 0), 0) /
              startups.reduce((sum, startup) => sum + (startup.investorsCount || 0), 1),
          )
        : 0,
  }

  const handleDelist = async (startupId) => {
    try {
      const res = await fetch(`/api/startups/by-id/${startupId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Closed' }),
      });
  
      if (!res.ok) throw new Error('Failed to update startup status');
  
      const data = await res.json();
      console.log('Startup status updated:', data);
      setRefresh(prev => !prev)
      // Optionally refresh UI or show toast
    } catch (err) {
      console.error(err.message);
    }
  };
  
  
  // Mock monthly trend data
  const mockMonthlyTrend = [
    { month: "Jan", amount: 0 },
    { month: "Feb", amount: 0 },
    { month: "Mar", amount: 0 },
    { month: "Apr", amount: 150000 },
    { month: "May", amount: 320000 },
    { month: "Jun", amount: 480000 },
  ]

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <StartupHeader />
        <main className="flex-1 container py-8 px-4 md:px-6">
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
              <p className="text-gray-500">Loading your startups...</p>
            </div>
          </div>
        </main>
        <StartupFooter />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <StartupHeader />

      <main className="flex-1 container py-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Startup Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage your startup and track your funding progress</p>
          </div>
          <Button onClick={handleCreateStartup} className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New Startup
          </Button>
        </div>

        {error && (
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <p className="text-red-600">{error}</p>
            </CardContent>
          </Card>
        )}

        {startups.length === 0 ? (
          <Card className="border-2 border-dashed border-gray-200 bg-gray-50">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
              <Building className="h-12 w-12 text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold mb-2">No Startups Yet</h2>
              <p className="text-gray-500 mb-6 max-w-md">
                You haven't created any startups yet. Create your first startup to start raising funds and connecting
                with investors.
              </p>
              <Button onClick={handleCreateStartup} className="bg-emerald-600 hover:bg-emerald-700">
                Create Your First Startup
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="startups">My Startups</TabsTrigger>
              {/* <TabsTrigger value="analytics">Analytics</TabsTrigger> */}
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              {/* Funding Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Raised</CardDescription>
                    <CardTitle className="text-2xl">₹{mockFundingStats.totalRaised.toLocaleString()}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* <div className="text-xs text-emerald-600 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" /> +15% from last month
                    </div> */}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Funding Goal</CardDescription>
                    <CardTitle className="text-2xl">₹{mockFundingStats.totalGoal.toLocaleString()}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* <div className="text-xs text-gray-500 flex items-center gap-1">
                      {((startups.totalRaised / startups.totalGoal) * 100).toFixed(1)}% complete
                    </div> */}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Investors</CardDescription>
                    <CardTitle className="text-2xl">{mockFundingStats.totalInvestors}</CardTitle>
                  </CardHeader>
                  <CardContent>
                      {/* <div className="text-xs text-emerald-600 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" /> +5 new this week
                      </div> */}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Avg. Investment</CardDescription>
                    <CardTitle className="text-2xl">₹{mockFundingStats.averageInvestment.toLocaleString()}</CardTitle>
                  </CardHeader>
                  {/* <CardContent>
                    {/* <div className="text-xs text-emerald-600 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" /> +8% from last month
                    </div> */}
                  {/* </CardContent> */}
                </Card>
              </div>

              {/* Funding Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Funding Progress</CardTitle>
                  <CardDescription>Track your funding campaign progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {startups.map((startup) => (
                      <div key={startup._id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-md overflow-hidden relative border">
                              <Image
                                src={startup.logo || "/placeholder.svg?height=40&width=40"}
                                alt={startup.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium">{startup.name}</h3>
                              <p className="text-xs text-gray-500">{startup.industry}</p>
                            </div>
                          </div>
                          <Badge
                            className={
                              startup.status === "active"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-amber-100 text-amber-800"
                            }
                          >
                            { startup.status }
                            {/* {startup.status === "active" ? "Active Campaign" : "Draft"} */}
                          </Badge>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>
                              ₹{(startup.fundingRaised || 0).toLocaleString()} of ₹
                              {(startup.fundingGoal || 0).toLocaleString()}
                            </span>
                            <span>{((startup.fundingRaised / startup.fundingGoal) * 100 || 0).toFixed(1)}% Funded</span>
                          </div>
                          <Progress value={(startup.fundingRaised / startup.fundingGoal) * 100 || 0} className="h-2" />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>{startup.investorsCount || 0} investors</span>
                            <span>{startup.daysLeft || 30} days left</span>
                          </div>
                        </div>

                        {/* <div className="flex justify-end">
                          <Link href={`/startup/edit/${startup._id}`}>
                            <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700">
                              Manage
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </Link>
                        </div> */}

                        {/* <div className="flex justify-start">
                          <Link href={`/analytics/${startup.name}`}>
                            <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700">
                              Analytics
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </Link>
                        </div> */}

                        <div className="flex justify-around">
                          <Link href={`/startup/assessment/${startup._id}`}>
                            <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700">
                              Assess Your Startup
                              <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>

                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              {/* <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates and investments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-3 rounded-lg border">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <Users className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">New Investor</h4>
                          <Badge variant="outline" className="text-xs">
                            2 hours ago
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Investor Rajiv S. invested ₹25,000 in {startups[0]?.name || "your startup"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-3 rounded-lg border">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">Funding Milestone</h4>
                          <Badge variant="outline" className="text-xs">
                            1 day ago
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {startups[0]?.name || "Your startup"} reached 50% of funding goal
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-3 rounded-lg border">
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <BarChart3 className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">Risk Assessment Updated</h4>
                          <Badge variant="outline" className="text-xs">
                            3 days ago
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Risk score for {startups[0]?.name || "your startup"} improved to{" "}
                          {startups[0]?.riskAssessment?.riskScore || 75}/100
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="ghost" className="w-full text-emerald-600 hover:text-emerald-700">
                    View All Activity
                  </Button>
                </CardFooter>
              </Card> */}
            </TabsContent>

            <TabsContent value="startups" className="space-y-8">
              {/* Startups List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {startups.map((startup) => (
                  <Card key={startup._id} className="overflow-hidden">
                    <CardHeader className="pb-2 flex flex-row justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-md overflow-hidden relative border">
                          <Image
                            src={startup.logo || "/placeholder.svg?height=48&width=48"}
                            alt={startup.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <CardTitle>{startup.name}</CardTitle>
                          <CardDescription>{startup.industry}</CardDescription>
                        </div>
                      </div>
                      <Badge
                        className={
                          startup.status === "active"
                            ? "bg-emerald-100 text-emerald-800"
                            : startup.status === "funded"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                        }
                      >
                        { startup.status }
                        {/* {startup.status} === "active" ? "Active" : startup.status === "funded" ? "Funded" : "Draft"} */}
                      </Badge>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-gray-600 line-clamp-2 mb-4">{startup.tagline}</p>

                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Funding Progress</span>
                            <span>{((startup.fundingRaised / startup.fundingGoal) * 100 || 0).toFixed(1)}% Funded</span>
                          </div>
                          <Progress value={(startup.fundingRaised / startup.fundingGoal) * 100 || 0} className="h-2" />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>
                              ₹{(startup.fundingRaised || 0).toLocaleString()} of ₹
                              {(startup.fundingGoal || 0).toLocaleString()}
                            </span>
                            <span>{startup.daysLeft || 30} days left</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="bg-gray-50 p-2 rounded-md">
                            <div className="text-xs text-gray-500">Investors</div>
                            <div className="font-medium">{startup.investorsCount || 0}</div>
                          </div>
                          {/* <div className="bg-gray-50 p-2 rounded-md">
                            <div className="text-xs text-gray-500">Risk Score</div>
                            <div className="font-medium">{startup.riskAssessment?.riskScore || 0}/100</div>
                          </div> */}
                          <div className="bg-gray-50 p-2 rounded-md">
                            <div className="text-xs text-gray-500">Min Investment</div>
                            <div className="font-medium">₹{(startup.minInvestment || 0).toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                      <Link href={`/analytics/${startup.name}`}>
                        <Button variant="outline">Analytics</Button>
                      </Link>
                      <div className="flex items-center gap-2">
  <Link href={`/startup/edit/${startup._id}`}>
    <Button className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-1">
      <Edit className="h-4 w-4" />
      Edit
    </Button>
  </Link>
  <Button onClick={() => handleDelist(startup._id)} className="bg-red-600 hover:bg-red-700 flex items-center gap-1">
  Delist
</Button>

</div>


                    </CardFooter>
                  </Card>
                ))}

                {/* Create New Startup Card */}
                <Card className="border-2 border-dashed border-gray-200 bg-gray-50">
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                    <Plus className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Create New Startup</h3>
                    <p className="text-gray-500 mb-6">Add another startup to your portfolio and start raising funds</p>
                    <Button onClick={handleCreateStartup} className="bg-emerald-600 hover:bg-emerald-700">
                      Create Startup
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* <TabsContent value="analytics" className="space-y-8">
              {/* Funding Trend */}
              {/* <Card>
                <CardHeader>
                  <CardTitle>Funding Trend</CardTitle>
                  <CardDescription>Monthly funding progress over time</CardDescription>
                </CardHeader>
                <CardContent className="h-80 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <LineChart className="h-16 w-16 text-emerald-200" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-sm text-gray-500">Funding Trend Chart</p>
                      <p className="text-xs text-gray-400">(Visual representation)</p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4">
                    {mockMonthlyTrend.map((item, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div
                          className="bg-emerald-100 w-8 rounded-t-sm"
                          style={{ height: `${(item.amount / 500000) * 150}px` }}
                        ></div>
                        <span className="text-xs mt-1">{item.month}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card> */}

              {/* Investor Demographics */}
              {/* <Card>
                <CardHeader>
                  <CardTitle>Investor Demographics</CardTitle>
                  <CardDescription>Breakdown of your investor base</CardDescription>
                </CardHeader>
                <CardContent className="h-64 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BarChart3 className="h-16 w-16 text-emerald-200" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-sm text-gray-500">Investor Demographics Chart</p>
                      <p className="text-xs text-gray-400">(Visual representation)</p>
                    </div>
                  </div>
                </CardContent>
              </Card> */}

              {/* Performance Metrics */}
              {/* <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Key metrics for your startups</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {startups.map((startup) => (
                      <div key={startup._id} className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md overflow-hidden relative border">
                            <Image
                              src={startup.logo || "/placeholder.svg?height=40&width=40"}
                              alt={startup.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <h3 className="font-medium">{startup.name}</h3>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="bg-gray-50 p-3 rounded-md">
                            <div className="text-xs text-gray-500">Conversion Rate</div>
                            <div className="font-medium text-lg">4.8%</div>
                            <div className="text-xs text-emerald-600 flex items-center gap-1 mt-1">
                              <TrendingUp className="h-3 w-3" /> +0.5% from last month
                            </div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-md">
                            <div className="text-xs text-gray-500">Avg. Time to Invest</div>
                            <div className="font-medium text-lg">3.2 days</div>
                            <div className="text-xs text-emerald-600 flex items-center gap-1 mt-1">
                              <TrendingUp className="h-3 w-3" /> -0.8 days from last month
                            </div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-md">
                            <div className="text-xs text-gray-500">Profile Views</div>
                            <div className="font-medium text-lg">1,248</div>
                            <div className="text-xs text-emerald-600 flex items-center gap-1 mt-1">
                              <TrendingUp className="h-3 w-3" /> +15% from last month
                            </div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-md">
                            <div className="text-xs text-gray-500">Investor Retention</div>
                            <div className="font-medium text-lg">92%</div>
                            <div className="text-xs text-emerald-600 flex items-center gap-1 mt-1">
                              <TrendingUp className="h-3 w-3" /> +3% from last month
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div> */}
                {/* </CardContent> */}
              {/* </Card> */}
            {/* </TabsContent> */}
          </Tabs>
        )}
      </main>

      <StartupFooter />
    </div>
  )
}
