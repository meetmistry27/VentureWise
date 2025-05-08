"use client"

import { useState, useEffect } from "react"
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

export default function InvestorDashboard() {
  const [startups, setStartups] = useState([]);
  const [filteredStartups, setFilteredStartups] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState("all");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [sortOption, setSortOption] = useState("");
  
  // Fetch all startups on component mount
  useEffect(() => {
    async function fetchAllStartups() {
      try {
        const response = await fetch('/api/investor');
        const data = await response.json();
        setStartups(data);
        setFilteredStartups(data);
      } catch (error) {
        console.error('Error fetching startups:', error);
      }
    }

    fetchAllStartups();
  }, []);

  // Apply filters whenever any filter changes
  useEffect(() => {
    let result = [...startups];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(startup => 
        startup.name?.toLowerCase().includes(query) || 
        startup.industry?.toLowerCase().includes(query) || 
        startup.location?.toLowerCase().includes(query)
      );
    }
    
    // Apply risk filter
    if (riskFilter !== "all") {
      result = result.filter(startup => {
        if (riskFilter === "low") return startup.riskAssessment.riskLevel === "Low Risk";
        if (riskFilter === "moderate") return startup.riskAssessment.riskLevel === "Moderate Risk";
        if (riskFilter === "high") return startup.riskAssessment.riskLevel === "High Risk";
        return true;
      });
    }
    
    // Apply industry filter
    if (industryFilter !== "all") {
      result = result.filter(startup => 
        startup.industry === industryFilter
      );
    }
    
    // Apply sorting
    if (sortOption === "fundingLowToHigh") {
      result.sort((a, b) => a.fundingGoal - b.fundingGoal);
    } else if (sortOption === "fundingHighToLow") {
      result.sort((a, b) => b.fundingGoal - a.fundingGoal);
    } else if (sortOption === "daysLeft") {
      result.sort((a, b) => a.daysLeft - b.daysLeft);
    }
    
    setFilteredStartups(result);
  }, [searchQuery, riskFilter, industryFilter, sortOption, startups]);

  // Get unique industries for the industry dropdown
  const uniqueIndustries = [...new Set(startups.map(startup => startup.industry))].filter(Boolean);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle filter reset
  const resetFilters = () => {
    setSearchQuery("");
    setRiskFilter("all");
    setIndustryFilter("all");
    setSortOption("");
  };

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
                {/* <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-white text-emerald-700 hover:bg-emerald-50">Browse Opportunities</Button>
                  <Button variant="outline" className="text-white border-white hover:bg-emerald-500">
                    How It Works
                  </Button>
                </div> */}
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
                      <div className="text-3xl font-bold">{startups.length || 0}</div>
                      {/* <div className="text-xs text-emerald-100 flex items-center gap-1 mt-1">
                        <TrendingUp className="h-3 w-3" /> +12 this month
                      </div> */}
                    </div>
                    {/* <div className="bg-white/20 p-4 rounded-lg">
                      <div className="text-sm text-emerald-100">Avg. Return</div>
                      <div className="text-3xl font-bold">24%</div>
                      <div className="text-xs text-emerald-100 flex items-center gap-1 mt-1">
                        <TrendingUp className="h-3 w-3" /> +3% from last quarter
                      </div>
                    </div> */}
                  </div>
                  {/* <div className="bg-white/20 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Funding Success Rate</span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <Progress value={78} className="h-2 bg-white/30" />
                  </div> */}
                  {/* <div className="grid grid-cols-3 gap-2">
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
                    </div> */}
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Dashboard */}
        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="opportunities" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="opportunities">Investment Opportunities</TabsTrigger>
                {/* <TabsTrigger value="portfolio">My Portfolio</TabsTrigger> */}
                <TabsTrigger value="insights">Market Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="opportunities" className="space-y-8">
                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                  <div className="relative w-full md:w-1/2">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input 
                      placeholder="Search startups by name, industry, or location" 
                      className="pl-10"
                      value={searchQuery}
                      onChange={handleSearchChange}
                    />
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
                        <DropdownMenuItem onClick={() => setRiskFilter("all")}>All Startups</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setRiskFilter("low")}>Low Risk Only</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setRiskFilter("moderate")}>
                          Moderate Risk Only
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setRiskFilter("high")}>
                          High Risk Only
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setSortOption("fundingLowToHigh")}>Funding Goal: Low to High</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortOption("fundingHighToLow")}>Funding Goal: High to Low</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortOption("daysLeft")}>Days Left: Least to Most</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={resetFilters}>Reset All Filters</DropdownMenuItem>
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
                        <DropdownMenuItem onClick={() => setIndustryFilter("all")}>All Industries</DropdownMenuItem>
                        {uniqueIndustries.map((industry) => (
                          <DropdownMenuItem 
                            key={industry} 
                            onClick={() => setIndustryFilter(industry)}
                          >
                            {industry}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={resetFilters}>Reset Filters</Button>
                  </div>
                </div>

                {/* Filter Active Stats */}
                {(searchQuery || riskFilter !== "all" || industryFilter !== "all" || sortOption) && (
                  <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-between">
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-sm font-medium">Active Filters:</span>
                      
                      {searchQuery && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          Search: "{searchQuery}"
                        </Badge>
                      )}
                      
                      {riskFilter !== "all" && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          Risk: {riskFilter === "low" ? "Low" : riskFilter === "moderate" ? "Moderate" : "High"}
                        </Badge>
                      )}
                      
                      {industryFilter !== "all" && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          Industry: {industryFilter}
                        </Badge>
                      )}
                      
                      {sortOption && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          Sort: {
                            sortOption === "fundingLowToHigh" ? "Funding (Low to High)" : 
                            sortOption === "fundingHighToLow" ? "Funding (High to Low)" : 
                            "Days Left"
                          }
                        </Badge>
                      )}
                    </div>
                    
                    <span className="text-sm">
                      Showing {filteredStartups.length} of {startups.length} startups
                    </span>
                  </div>
                )}

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
                    {filteredStartups?.length > 0 ? (
                      filteredStartups.map((startup) => (
                        <StartupCard key={startup._id} startup={startup} />
                      ))
                    ) : (
                      <div className="col-span-full text-center py-12">
                        <div className="text-gray-500 mb-2">No startups match your current filters</div>
                        <Button onClick={resetFilters} variant="outline">Reset All Filters</Button>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="portfolio" className="space-y-8">
                {/* Your portfolio content */}
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
                {/* <Card>
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
                </Card> */}
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
        {/* <section className="w-full py-12 md:py-24 bg-emerald-600 text-white">
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
        </section> */}
      </main>

      <InvestorFooter />
    </div>
  )
}
