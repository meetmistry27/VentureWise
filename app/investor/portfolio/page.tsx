"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronDown,
  DollarSign,
  Loader2,
  SortAsc,
  SortDesc,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { InvestorHeader } from "@/components/investor-header"
import { InvestorFooter } from "@/components/investor-footer"
import { investmentAPI } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import { id } from "ethers"

export default function PortfolioPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [investments, setInvestments] = useState([])
  const [filteredInvestments, setFilteredInvestments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortOrder, setSortOrder] = useState("desc") // desc = newest first
  const [filterType, setFilterType] = useState(null)
  const [filterValue, setFilterValue] = useState(null)
  const [stats, setStats] = useState({
    totalInvested: 0,
    totalInvestments: 0,
    averageInvestment: 0,
    totalEquity: 0,
    totalTokens: 0,
  })

  const investmentsPerPage = 10
  //const userId = localStorage.getItem("userId");  
  //const token = localStorage.getItem("token");  

  useEffect(() => {
    const userId = localStorage.getItem("userId");  
    const token = localStorage.getItem("token");
    const fetchInvestments = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/investor/portfolio`,{
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token} ${userId}`,
            }
        });
        //console.log(response)
        const data = await response.json();
        //console.log(data)

        // Sort investments by date (newest first by default)
        const sortedInvestments = data.sort((a, b) => {
          const dateA = new Date(a.createdAt)
          const dateB = new Date(b.createdAt)
          return sortOrder === "desc" ? dateB - dateA : dateA - dateB
        })

        setInvestments(sortedInvestments)
        setFilteredInvestments(sortedInvestments)

        // Calculate stats
        const totalInvested = sortedInvestments.reduce((sum, inv) => sum + inv.amount, 0)
        const totalEquity = sortedInvestments.reduce((sum, inv) => sum + inv.equityPercentage, 0)
        const totalTokens = sortedInvestments.reduce((sum, inv) => sum + inv.tokenRewards, 0)

        setStats({
          totalInvested,
          totalInvestments: sortedInvestments.length,
          averageInvestment: sortedInvestments.length > 0 ? totalInvested / sortedInvestments.length : 0,
          totalEquity,
          totalTokens,
        })
      } catch (err) {
        console.error("Error fetching investments:", err)
        setError("Failed to load your investments. Please try again.")
        toast({
          title: "Error",
          description: "Failed to load your investments. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchInvestments()
  }, [toast, sortOrder])

  // Filter investments by month
  const filterByMonth = (month) => {
    setFilterType("month")
    setFilterValue(month)

    const filtered = investments.filter((investment) => {
      const investmentDate = new Date(investment.createdAt)
      return investmentDate.getMonth() === month
    })

    setFilteredInvestments(filtered)
    setCurrentPage(1)
  }

  // Filter investments by amount range
  const filterByAmount = (min, max) => {
    setFilterType("amount")
    setFilterValue(`${min}-${max}`)

    const filtered = investments.filter((investment) => {
      return investment.amount >= min && (max === null || investment.amount <= max)
    })

    setFilteredInvestments(filtered)
    setCurrentPage(1)
  }

  // Clear filters
  const clearFilters = () => {
    setFilterType(null)
    setFilterValue(null)
    setFilteredInvestments(investments)
    setCurrentPage(1)
  }

  // Toggle sort order
  const toggleSortOrder = () => {
    const newOrder = sortOrder === "desc" ? "asc" : "desc"
    setSortOrder(newOrder)

    // Re-sort the filtered investments
    const sorted = [...filteredInvestments].sort((a, b) => {
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)
      return newOrder === "desc" ? dateB - dateA : dateA - dateB
    })

    setFilteredInvestments(sorted)
  }

  // Get current investments for pagination
  const indexOfLastInvestment = currentPage * investmentsPerPage
  const indexOfFirstInvestment = indexOfLastInvestment - investmentsPerPage
  const currentInvestments = filteredInvestments.slice(indexOfFirstInvestment, indexOfLastInvestment)
  const totalPages = Math.ceil(filteredInvestments.length / investmentsPerPage)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "processing":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "failed":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  // Format date
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy")
    } catch (error) {
      return "Invalid date"
    }
  }

  // Get month name from index
  const getMonthName = (monthIndex) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]
    return months[monthIndex]
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <InvestorHeader />
        <main className="flex-1 container py-8 px-4 md:px-6">
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
              <p className="text-gray-500">Loading your investments...</p>
            </div>
          </div>
        </main>
        <InvestorFooter />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <InvestorHeader />

      <main className="flex-1 container py-8 px-4 md:px-6">
        <div className="mb-6">
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Investment Portfolio</h1>
            <p className="text-gray-500 mt-1">Track and manage your startup investments</p>
          </div>

          {error && (
            <Card className="mb-8 border-red-200 bg-red-50">
              <CardContent className="p-4">
                <p className="text-red-600">{error}</p>
              </CardContent>
            </Card>
          )}

          {/* Portfolio Summary */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Portfolio Summary</CardTitle>
              <CardDescription>Overview of your investment portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                  <div className="text-sm text-emerald-700 mb-1">Total Invested</div>
                  <div className="text-2xl font-bold text-emerald-800">₹{stats.totalInvested.toLocaleString()}</div>
                  <div className="text-xs text-emerald-600 mt-1">Across {stats.totalInvestments} investments</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border">
                  <div className="text-sm text-gray-700 mb-1">Total Investments</div>
                  <div className="text-2xl font-bold">{stats.totalInvestments}</div>
                  <div className="text-xs text-gray-500 mt-1">Startups funded</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border">
                  <div className="text-sm text-gray-700 mb-1">Average Investment</div>
                  <div className="text-2xl font-bold">
                    ₹{stats.averageInvestment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Per startup</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border">
                  <div className="text-sm text-gray-700 mb-1">Total Equity</div>
                  <div className="text-2xl font-bold">{stats.totalEquity.toFixed(4)}%</div>
                  <div className="text-xs text-gray-500 mt-1">Cumulative ownership</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border">
                  <div className="text-sm text-gray-700 mb-1">Total Tokens</div>
                  <div className="text-2xl font-bold">{stats.totalTokens.toLocaleString()}</div>
                  <div className="text-xs text-gray-500 mt-1">VWT earned</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Filter and Sort Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">Your Investments</h2>
              {filterType && (
                <Badge variant="outline" className="flex items-center gap-1">
                  {filterType === "month" ? (
                    <>
                      <Calendar className="h-3 w-3" />
                      {getMonthName(filterValue)}
                    </>
                  ) : (
                    <>
                      <DollarSign className="h-3 w-3" />₹{filterValue.split("-")[0].toLocaleString()} -
                      {filterValue.split("-")[1] === "null"
                        ? " Above"
                        : ` ₹${filterValue.split("-")[1].toLocaleString()}`}
                    </>
                  )}
                  <Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-1" onClick={clearFilters}>
                    ×
                  </Button>
                </Badge>
              )}
            </div>

            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Filter by Month
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Select Month</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month) => (
                    <DropdownMenuItem key={month} onClick={() => filterByMonth(month)}>
                      {getMonthName(month)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    Filter by Amount
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Select Range</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => filterByAmount(0, 10000)}>Under ₹10,000</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => filterByAmount(10000, 50000)}>₹10,000 - ₹50,000</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => filterByAmount(50000, 100000)}>₹50,000 - ₹100,000</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => filterByAmount(100000, null)}>Above ₹100,000</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={toggleSortOrder}>
                {sortOrder === "desc" ? (
                  <>
                    <SortDesc className="h-4 w-4" />
                    Newest First
                  </>
                ) : (
                  <>
                    <SortAsc className="h-4 w-4" />
                    Oldest First
                  </>
                )}
              </Button>

              {filterType && (
                <Button variant="ghost" size="sm" className="flex items-center gap-1" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          {/* Investments List */}
          {filteredInvestments.length === 0 ? (
            <Card className="border-2 border-dashed border-gray-200 bg-gray-50">
              <CardContent className="p-8 flex flex-col items-center justify-center text-center">
                <TrendingUp className="h-12 w-12 text-gray-300 mb-4" />
                <h2 className="text-xl font-semibold mb-2">No Investments Found</h2>
                <p className="text-gray-500 mb-6 max-w-md">
                  {filterType
                    ? "No investments match your current filters. Try adjusting your filters or clear them to see all investments."
                    : "You haven't made any investments yet. Explore startups to begin building your portfolio."}
                </p>
                {filterType ? (
                  <Button onClick={clearFilters}>Clear Filters</Button>
                ) : (
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Link href="/investor">Explore Startups</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {currentInvestments.map((investment, index) => (
                  <Card key={investment._id || index} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="p-6 flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="h-12 w-12 rounded-md overflow-hidden relative border">
                                <Image
                                  src={investment.startup?.logo || "/placeholder.svg?height=48&width=48"}
                                  alt={investment.startup?.name || "Startup"}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="font-semibold">{investment.startup?.name || "Unnamed Startup"}</h3>
                                <p className="text-xs text-gray-500">
                                  {investment.startup?.industry || "Technology"} •{" "}
                                  {investment.startup?.location || "India"}
                                </p>
                              </div>
                            </div>
                            <Badge className={getStatusBadgeColor(investment.status)}>
                              {investment.status.charAt(0).toUpperCase() + investment.status.slice(1)}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <div className="text-gray-500">Investment Amount</div>
                              <div className="font-medium">₹{investment.amount.toLocaleString()}</div>
                            </div>

                            <div>
                              <div className="text-gray-500">Equity</div>
                              <div className="font-medium">{investment.equityPercentage.toFixed(4)}%</div>
                            </div>

                            <div>
                              <div className="text-gray-500">Token Rewards</div>
                              <div className="font-medium">{investment.tokenRewards} VWT</div>
                            </div>

                            <div>
                              <div className="text-gray-500">Date</div>
                              <div className="font-medium">{formatDate(investment.createdAt)}</div>
                            </div>
                          </div>

                          {investment.transactionHash && (
                            <div className="mt-4 pt-4 border-t">
                              <div className="text-xs text-gray-500">Transaction Hash</div>
                              <div className="text-xs font-mono bg-gray-50 p-1 rounded truncate">
                                {investment.transactionHash}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="bg-gray-50 p-6 md:w-64 flex flex-col justify-between border-t md:border-t-0 md:border-l">
                          <div>
                            <div className="text-sm font-medium mb-2">Risk Assessment</div>
                            <div className="flex items-center gap-2 mb-4">
                              <Badge
                                className={
                                  investment.startup?.riskAssessment?.riskLevel === "Low Risk"
                                    ? "bg-green-100 text-green-800"
                                    : investment.startup?.riskAssessment?.riskLevel === "Moderate Risk"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                }
                              >
                                {investment.startup?.riskAssessment?.riskLevel || "Moderate Risk"}
                              </Badge>
                              {/* <span className="text-sm">
                                {investment.startup?.riskAssessment?.riskScore || "65"}/100
                              </span> */}
                            </div>
                          </div>

                          <div className="mt-auto">
                            <Link href={`/investor/startup/${investment.startup?._id}/details`}>
                              <Button variant="outline" size="sm" className="w-full">
                                View Startup
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>

                  <div className="text-sm">
                    Page {currentPage} of {totalPages}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <InvestorFooter />
    </div>
  )
}
