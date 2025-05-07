"use client"

import { useState } from "react"
import {
  ArrowUpRight,
  BarChart3,
  ChevronDown,
  Filter,
  LineChart,
  PieChart,
  Search,
  Star,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { InvestorHeader } from "@/components/investor-header"
import { StartupCard } from "@/components/startup-card"
import { FeaturedStartup } from "@/components/featured-startup"
import { InvestorFooter } from "@/components/investor-footer"
import { useEffect } from "react"

export default function InvestorDashboard() {
  const [activeFilter, setActiveFilter] = useState("all")

  // Mock data for startups
  // const featuredStartup = {
  //   id: "1",
  //   name: "MediConnect",
  //   tagline: "AI-powered healthcare platform connecting patients with specialists",
  //   logo: "/placeholder.svg?height=80&width=80",
  //   industry: "Healthtech",
  //   location: "Bangalore",
  //   fundingGoal: 5000000,
  //   fundingRaised: 3750000,
  //   riskLevel: "Low Risk",
  //   riskScore: 82,
  //   daysLeft: 15,
  //   traction: "20,000+ monthly active users",
  //   growth: "+45% MoM",
  //   team: 12,
  //   description:
  //     "MediConnect is revolutionizing healthcare access in India by connecting patients with specialists through an AI-powered platform that provides accurate diagnoses and treatment recommendations.",
  //   highlights: [
  //     "Partnerships with 200+ hospitals",
  //     "45% month-over-month growth",
  //     "Featured in YourStory's Top 10 Healthtech Startups",
  //   ],
  //   investors: 48,
  //   minInvestment: 10000,
  // }

  // const startups = [
  //   {
  //     id: "2",
  //     name: "FinEase",
  //     tagline: "Simplified financial management for small businesses",
  //     logo: "/placeholder.svg?height=80&width=80",
  //     industry: "Fintech",
  //     location: "Mumbai",
  //     fundingGoal: 3000000,
  //     fundingRaised: 1200000,
  //     riskLevel: "Moderate Risk",
  //     riskScore: 65,
  //     daysLeft: 22,
  //     traction: "5,000+ businesses onboarded",
  //     growth: "+28% MoM",
  //     team: 8,
  //     minInvestment: 5000,
  //   },
  //   {
  //     id: "3",
  //     name: "EduSpark",
  //     tagline: "Personalized learning paths for K-12 students",
  //     logo: "/placeholder.svg?height=80&width=80",
  //     industry: "Edtech",
  //     location: "Delhi",
  //     fundingGoal: 2500000,
  //     fundingRaised: 1800000,
  //     riskLevel: "Low Risk",
  //     riskScore: 78,
  //     daysLeft: 18,
  //     traction: "15,000+ active students",
  //     growth: "+35% MoM",
  //     team: 10,
  //     minInvestment: 7500,
  //   },
  //   {
  //     id: "4",
  //     name: "GreenHarvest",
  //     tagline: "Smart farming solutions for urban areas",
  //     logo: "/placeholder.svg?height=80&width=80",
  //     industry: "AgriTech",
  //     location: "Pune",
  //     fundingGoal: 4000000,
  //     fundingRaised: 2500000,
  //     riskLevel: "Low Risk",
  //     riskScore: 75,
  //     daysLeft: 12,
  //     traction: "100+ urban farms deployed",
  //     growth: "+22% MoM",
  //     team: 15,
  //     minInvestment: 15000,
  //   },
  //   {
  //     id: "5",
  //     name: "QuickCommerce",
  //     tagline: "10-minute delivery for local businesses",
  //     logo: "/placeholder.svg?height=80&width=80",
  //     industry: "E-commerce",
  //     location: "Bangalore",
  //     fundingGoal: 6000000,
  //     fundingRaised: 1500000,
  //     riskLevel: "Moderate Risk",
  //     riskScore: 62,
  //     daysLeft: 30,
  //     traction: "50,000+ monthly orders",
  //     growth: "+60% MoM",
  //     team: 25,
  //     minInvestment: 20000,
  //   },
  //   {
  //     id: "6",
  //     name: "SecureChain",
  //     tagline: "Blockchain security for enterprise applications",
  //     logo: "/placeholder.svg?height=80&width=80",
  //     industry: "Cybersecurity",
  //     location: "Hyderabad",
  //     fundingGoal: 3500000,
  //     fundingRaised: 2800000,
  //     riskLevel: "Low Risk",
  //     riskScore: 80,
  //     daysLeft: 8,
  //     traction: "20+ enterprise clients",
  //     growth: "+18% MoM",
  //     team: 12,
  //     minInvestment: 25000,
  //   },
  // ]

  // // Mock data for portfolio
  // const portfolioStats = {
  //   totalInvested: 1250000,
  //   activeInvestments: 8,
  //   averageReturn: 18.5,
  //   pendingOpportunities: 3,
  // }

  // const portfolioInvestments = [
  //   {
  //     id: "p1",
  //     name: "TechSolutions",
  //     logo: "/placeholder.svg?height=60&width=60",
  //     invested: 200000,
  //     currentValue: 260000,
  //     returnPercentage: 30,
  //     date: "2023-10-15",
  //   },
  //   {
  //     id: "p2",
  //     name: "HealthAI",
  //     logo: "/placeholder.svg?height=60&width=60",
  //     invested: 150000,
  //     currentValue: 187500,
  //     returnPercentage: 25,
  //     date: "2023-11-20",
  //   },
  //   {
  //     id: "p3",
  //     name: "EcoEnergy",
  //     logo: "/placeholder.svg?height=60&width=60",
  //     invested: 300000,
  //     currentValue: 330000,
  //     returnPercentage: 10,
  //     date: "2024-01-05",
  //   },
  // ]

  // Definition of a startup object structure
const Startup = {
  id: String,              // Unique identifier
  name: String,            // Company name
  tagline: String,         // Brief description of value proposition
  logo: String,            // URL path to logo image
  industry: String,        // Industry category
  location: String,        // City/region
  fundingGoal: Number,     // Total funding amount targeted (in currency)
  fundingRaised: Number,   // Current amount raised (in currency)
  riskLevel: String,       // Risk assessment label
  riskScore: Number,       // Numerical risk assessment (0-100)
  daysLeft: Number,        // Days remaining in funding round
  monthlyActiveUsers: String,        // Current user/customer metrics
  growth: String,          // Growth rate
  teamSize: Number,            // Team size
  minInvestment: Number,   // Minimum investment amount
  description: String,     // Detailed company description (optional)
  highlights: Array,       // List of key achievements (optional)
  investors: Number        // Number of current investors (optional)
 };

 const [startups, setStartups] = useState([]);
 useEffect(() => {
  async function fetchAllStartups() {
    try {
      const response = await fetch('/api/investor');
      const data = await response.json();
      setStartups(data);
    } catch (error) {
      console.error('Error fetching startups:', error);
    }
  }

  fetchAllStartups();
}, []);


  //const startups = fetchAllStartups();
  console.log(startups)
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All Industries");
  //const [activeFilter, setActiveFilter] = useState("all");


  //Filter startups based on active filter
  const filteredStartups = startups.filter((startup) => {
    const matchesRiskLevel =
      activeFilter === "all" ||
      (activeFilter === "low" && startup.riskLevel === "Low Risk") ||
      (activeFilter === "moderate" && startup.riskLevel === "Moderate Risk");
  
    const matchesSearch =
      !searchQuery ||
      startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      startup.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      startup.location.toLowerCase().includes(searchQuery.toLowerCase());
  
    const matchesIndustry =
      selectedIndustry === "All Industries" || !selectedIndustry || startup.industry === selectedIndustry;
  
    return matchesRiskLevel && matchesSearch && matchesIndustry;
  });
  

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <InvestorHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 bg-gradient-to-b from-emerald-600 to-emerald-700 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Discover High-Potential Startups Ready for Investment
                </h1>
                <p className="max-w-[600px] text-emerald-100 md:text-xl">
                  VentureWise uses AI-powered risk assessment to identify promising startups. Invest with confidence
                  starting from just ₹5,000.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-white text-emerald-700 hover:bg-emerald-50">Browse Opportunities</Button>
                  <Button variant="outline" className="text-white border-white hover:bg-emerald-500">
                    How It Works
                  </Button>
                </div>
              </div>
              <div className="relative p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-emerald-400"></div>
                      <span className="text-sm font-medium">Investment Opportunities</span>
                    </div>
                    <span className="text-sm font-medium">May 2024</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/20 p-4 rounded-lg">
                      <div className="text-sm text-emerald-100">Available Startups</div>
                      <div className="text-3xl font-bold">42</div>
                      <div className="text-xs text-emerald-100 flex items-center gap-1 mt-1">
                        <TrendingUp className="h-3 w-3" /> +12 this month
                      </div>
                    </div>
                    <div className="bg-white/20 p-4 rounded-lg">
                      <div className="text-sm text-emerald-100">Avg. Return</div>
                      <div className="text-3xl font-bold">24%</div>
                      <div className="text-xs text-emerald-100 flex items-center gap-1 mt-1">
                        <TrendingUp className="h-3 w-3" /> +3% from last quarter
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/20 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Funding Success Rate</span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2 bg-white/30" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-white/20 p-3 rounded-lg text-center">
                      <div className="text-xs text-emerald-100">Min Investment</div>
                      <div className="text-lg font-bold">₹5K</div>
                    </div>
                    <div className="bg-white/20 p-3 rounded-lg text-center">
                      <div className="text-xs text-emerald-100">Avg Investment</div>
                      <div className="text-lg font-bold">₹25K</div>
                    </div>
                    <div className="bg-white/20 p-3 rounded-lg text-center">
                      <div className="text-xs text-emerald-100">Investors</div>
                      <div className="text-lg font-bold">5.2K</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Dashboard */}
        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="opportunities" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="opportunities">Investment Opportunities</TabsTrigger>
                <TabsTrigger value="portfolio">My Portfolio</TabsTrigger>
                <TabsTrigger value="insights">Market Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="opportunities" className="space-y-8">
                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                  <div className="relative w-full md:w-1/2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input placeholder="Search startups by name, industry, or location" className="pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                  </div>
                  <div className="flex gap-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Filter size={16} />
                          Filter
                          <ChevronDown size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setActiveFilter("all")}>All Startups</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setActiveFilter("low")}>Low Risk Only</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setActiveFilter("moderate")}>
                          Moderate Risk Only
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Funding Goal: Low to High</DropdownMenuItem>
                        <DropdownMenuItem>Funding Goal: High to Low</DropdownMenuItem>
                        <DropdownMenuItem>Days Left: Least to Most</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-2">
                          Industry
                          <ChevronDown size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSelectedIndustry("All Industries")}>All Industries</DropdownMenuItem>
<DropdownMenuItem onClick={() => setSelectedIndustry("Healthtech")}>Healthtech</DropdownMenuItem>
<DropdownMenuItem onClick={() => setSelectedIndustry("Fintech")}>Fintech</DropdownMenuItem>
<DropdownMenuItem onClick={() => setSelectedIndustry("Edtech")}>Edtech</DropdownMenuItem>
<DropdownMenuItem onClick={() => setSelectedIndustry("E-commerce")}>E-commerce</DropdownMenuItem>
<DropdownMenuItem onClick={() => setSelectedIndustry("AgriTech")}>AgriTech</DropdownMenuItem>
<DropdownMenuItem onClick={() => setSelectedIndustry("Cybersecurity")}>Cybersecurity</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Button className="bg-emerald-600 hover:bg-emerald-700">Find Matches</Button>
                  </div>
                </div>

                {/* Featured Startup
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-6">Featured Opportunity</h2>
                  <FeaturedStartup startup={featuredStartup} />
                </div> */}

                {/* Startup Listings */}
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Top Opportunities</h2>
                    <Button variant="ghost" className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                      View All
                      <ArrowUpRight size={16} />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {startups?.length > 0 ? (
    startups.map((startup) => (
      <StartupCard key={startup._id} startup={startup} />
    ))
  ) : (
    <p className="text-gray-500 col-span-full">No startup opportunities available.</p>
  )}
</div>


                </div>
              </TabsContent>

              <TabsContent value="portfolio" className="space-y-8">
                {/* Portfolio Overview */}
                {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Total Invested</CardDescription>
                      <CardTitle className="text-2xl">₹{portfolioStats.totalInvested.toLocaleString()}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-emerald-600 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" /> +15% from last quarter
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Active Investments</CardDescription>
                      <CardTitle className="text-2xl">{portfolioStats.activeInvestments}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-emerald-600 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" /> +2 new this quarter
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Average Return</CardDescription>
                      <CardTitle className="text-2xl">{portfolioStats.averageReturn}%</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-emerald-600 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" /> +3.5% from last year
                      </div>
                    </CardContent>
                  </Card> */}

                  {/* <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Pending Opportunities</CardDescription>
                      <CardTitle className="text-2xl">{portfolioStats.pendingOpportunities}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" size="sm" className="w-full">
                        Review
                      </Button>
                    </CardContent>
                  </Card>
                </div> */}

                {/* Portfolio Performance Chart */}
                {/* <Card>
                  <CardHeader>
                    <CardTitle>Portfolio Performance</CardTitle>
                    <CardDescription>Track your investment growth over time</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <LineChart className="h-16 w-16 mx-auto mb-4 text-emerald-600 opacity-50" />
                      <p>Portfolio performance chart would appear here</p>
                      <p className="text-sm">Showing historical returns and projections</p>
                    </div>
                  </CardContent>
                </Card> */}

                {/* Active Investments */}
                {/* <div>
                  <h2 className="text-2xl font-bold mb-6">Active Investments</h2>
                  <div className="space-y-4">
                    {portfolioInvestments.map((investment) => (
                      <Card key={investment.id}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-12 w-12 border">
                                <AvatarImage src={investment.logo || "/placeholder.svg"} alt={investment.name} />
                                <AvatarFallback>{investment.name.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold">{investment.name}</h3>
                                <p className="text-sm text-gray-500">
                                  Invested on {new Date(investment.date).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">₹{investment.currentValue.toLocaleString()}</span>
                                <Badge
                                  variant={investment.returnPercentage > 0 ? "success" : "destructive"}
                                  className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                                >
                                  +{investment.returnPercentage}%
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-500">Initial: ₹{investment.invested.toLocaleString()}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div> */}
              </TabsContent>

              <TabsContent value="insights" className="space-y-8">
                {/* Market Trends */}
                <Card>
                  <CardHeader>
                    <CardTitle>Market Trends</CardTitle>
                    <CardDescription>Latest trends in startup investments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">Top Performing Industries</h3>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <PieChart className="h-4 w-4" />
                            <span className="sr-only">View chart</span>
                          </Button>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Healthtech</span>
                            <span className="text-sm font-medium">32%</span>
                          </div>
                          <Progress value={32} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Fintech</span>
                            <span className="text-sm font-medium">28%</span>
                          </div>
                          <Progress value={28} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">AI/ML</span>
                            <span className="text-sm font-medium">24%</span>
                          </div>
                          <Progress value={24} className="h-2" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">Funding Stages</h3>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <BarChart3 className="h-4 w-4" />
                            <span className="sr-only">View chart</span>
                          </Button>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Seed</span>
                            <span className="text-sm font-medium">45%</span>
                          </div>
                          <Progress value={45} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Series A</span>
                            <span className="text-sm font-medium">30%</span>
                          </div>
                          <Progress value={30} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Series B</span>
                            <span className="text-sm font-medium">15%</span>
                          </div>
                          <Progress value={15} className="h-2" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">Geographic Distribution</h3>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <PieChart className="h-4 w-4" />
                            <span className="sr-only">View chart</span>
                          </Button>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Bangalore</span>
                            <span className="text-sm font-medium">38%</span>
                          </div>
                          <Progress value={38} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Mumbai</span>
                            <span className="text-sm font-medium">22%</span>
                          </div>
                          <Progress value={22} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Delhi NCR</span>
                            <span className="text-sm font-medium">18%</span>
                          </div>
                          <Progress value={18} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Investment Insights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Success Factors</CardTitle>
                      <CardDescription>What makes startups succeed</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-emerald-100 p-2 mt-1">
                          <Users className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Strong Founding Team</h4>
                          <p className="text-sm text-gray-500">
                            Startups with experienced founders are 2.5x more likely to succeed.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-emerald-100 p-2 mt-1">
                          <TrendingUp className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Consistent Growth</h4>
                          <p className="text-sm text-gray-500">
                            Startups with 20%+ MoM growth for 6+ months show higher success rates.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-emerald-100 p-2 mt-1">
                          <Wallet className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Capital Efficiency</h4>
                          <p className="text-sm text-gray-500">
                            Startups with lower burn rates relative to growth have 30% higher valuations.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Investor Insights</CardTitle>
                      <CardDescription>Learn from successful investors</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Investor" />
                          <AvatarFallback>RK</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">Rajan Kapoor</h4>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 fill-emerald-500 text-emerald-500" />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            "I focus on teams that demonstrate resilience and adaptability. My best performing
                            investments have been in startups that pivoted effectively based on market feedback."
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Investor" />
                          <AvatarFallback>SP</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">Shalini Patel</h4>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 fill-emerald-500 text-emerald-500" />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            "Diversification is key. I allocate 60% to low-risk startups and 40% to higher-risk,
                            higher-reward opportunities. This strategy has yielded consistent returns over time."
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Upcoming Events */}
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>Connect with founders and fellow investors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-start gap-4">
                          <div className="bg-emerald-100 text-emerald-700 p-3 rounded-lg text-center min-w-[60px]">
                            <div className="text-sm font-medium">MAY</div>
                            <div className="text-xl font-bold">15</div>
                          </div>
                          <div>
                            <h4 className="font-medium">Startup Pitch Day: Healthtech Edition</h4>
                            <p className="text-sm text-gray-500">
                              10 pre-vetted healthtech startups will pitch their ideas to investors.
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">Virtual</Badge>
                              <span className="text-xs text-gray-500">7:00 PM - 9:00 PM</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Register
                        </Button>
                      </div>

                      <div className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-start gap-4">
                          <div className="bg-emerald-100 text-emerald-700 p-3 rounded-lg text-center min-w-[60px]">
                            <div className="text-sm font-medium">MAY</div>
                            <div className="text-xl font-bold">22</div>
                          </div>
                          <div>
                            <h4 className="font-medium">Investor Networking Breakfast</h4>
                            <p className="text-sm text-gray-500">
                              Connect with fellow investors and discuss market trends.
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">Bangalore</Badge>
                              <span className="text-xs text-gray-500">8:30 AM - 10:30 AM</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Register
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-start gap-4">
                          <div className="bg-emerald-100 text-emerald-700 p-3 rounded-lg text-center min-w-[60px]">
                            <div className="text-sm font-medium">JUN</div>
                            <div className="text-xl font-bold">05</div>
                          </div>
                          <div>
                            <h4 className="font-medium">Startup Valuation Masterclass</h4>
                            <p className="text-sm text-gray-500">Learn how to accurately value early-stage startups.</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">Virtual</Badge>
                              <span className="text-xs text-gray-500">6:00 PM - 8:00 PM</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Register
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button variant="ghost" className="w-full text-emerald-600 hover:text-emerald-700">
                      View All Events
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-12 bg-gray-50 border-t">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                  Investor Success Stories
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Hear from our investors</h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of investors who have found success with VentureWise.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=60&width=60" alt="Investor" />
                      <AvatarFallback>AM</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">Aditya Mehta</h3>
                      <p className="text-sm text-gray-500">Small Business Owner</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "As a first-time investor, I was hesitant to invest in startups. VentureWise made it easy with their
                    risk assessment tools. I've now invested in 5 startups with an average return of 22%."
                  </p>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-emerald-500 text-emerald-500" />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=60&width=60" alt="Investor" />
                      <AvatarFallback>PR</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">Priya Reddy</h3>
                      <p className="text-sm text-gray-500">IT Professional</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "The detailed analytics and risk assessment helped me make informed decisions. I started with just
                    ₹10,000 and have gradually built a diverse portfolio of tech startups."
                  </p>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-emerald-500 text-emerald-500" />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=60&width=60" alt="Investor" />
                      <AvatarFallback>RJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">Rajiv Joshi</h3>
                      <p className="text-sm text-gray-500">Retired Teacher</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "I wanted to diversify my retirement portfolio. VentureWise's low minimum investment amounts allowed
                    me to spread my risk across multiple startups. The returns have exceeded my expectations."
                  </p>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-emerald-500 text-emerald-500" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-emerald-600 text-white">
          <div className="container px-4 md:px-6 text-center">
            <div className="mx-auto max-w-3xl space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to grow your wealth with startups?
              </h2>
              <p className="text-emerald-100 md:text-xl">
                Join thousands of investors who are building wealth through startup investments. Start with as little as
                ₹5,000.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                <Button className="bg-white text-emerald-600 hover:bg-emerald-50">Create Account</Button>
                <Button variant="outline" className="text-white border-white hover:bg-emerald-700">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <InvestorFooter />
    </div>
  )
}
