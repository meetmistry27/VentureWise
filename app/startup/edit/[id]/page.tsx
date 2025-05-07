"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { StartupHeader } from "@/components/startup-header"
import { StartupFooter } from "@/components/startup-footer"

export default function EditStartupPage({ params }) {
  const router = useRouter()
  const { toast } = useToast()
  const { id } = params
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    description: "",
    industry: "",
    location: "",
    fundingGoal: "",
    equity: "",
    minInvestment: "",
    tokenRewardRate: "",
    team: "",
    traction: "",
    growth: "",
    campaignEndDate: "",
    status: "draft",
  })

  useEffect(() => {
    const fetchStartup = async () => {
      try {
        setIsLoading(true)
        setError(null)
        
        // Get auth token from localStorage
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        
        if (!token || !userId) {
          router.push('/login')
          return
        }
        
        // Fetch startup data
        const response = await fetch(`/api/startups/edit/${id}`, {
          headers: {
            'Authorization': `Bearer ${token} ${userId}`
          }
        })
        
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Failed to fetch startup')
        }
        
        const data = await response.json()
        
        if (data.success && data.data) {
          // Format the date
          let formattedData = {...data.data}
          if (formattedData.campaignEndDate) {
            const date = new Date(formattedData.campaignEndDate)
            formattedData.campaignEndDate = date.toISOString().split('T')[0]
          }
          
          setFormData(formattedData)
        } else {
          throw new Error(data.message || 'No startup data found')
        }
      } catch (err) {
        console.error("Error fetching startup:", err)
        setError(err.message || 'Failed to load startup details')
        toast({
          title: "Error",
          description: err.message || 'Failed to load startup details',
          variant: "destructive"
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchStartup()
    }
  }, [id, router, toast])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)
    
    try {
      // Get auth token from localStorage
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')
      
      if (!token || !userId) {
        router.push('/login')
        return
      }
      
      // Send update request
      const response = await fetch(`/api/startups/edit/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token} ${userId}`
        },
        body: JSON.stringify(formData)
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update startup')
      }
      
      toast({
        title: "Success",
        description: "Startup updated successfully",
      })
      
      // Redirect to dashboard or startup page
      router.push('/startup/dashboard')
    } catch (err) {
      console.error("Error updating startup:", err)
      setError(err.message || 'Failed to update startup')
      toast({
        title: "Error",
        description: err.message || 'Failed to update startup',
        variant: "destructive"
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleStatusChange = async (status) => {
    try {
      setIsSaving(true)
      setError(null)
      
      // Get auth token from localStorage
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')
      
      if (!token || !userId) {
        router.push('/login')
        return
      }
      
      // Update just the status field
      const response = await fetch(`/api/startups/edit/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token} ${userId}`
        },
        body: JSON.stringify({
          ...formData,
          status
        })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || `Failed to ${status === 'active' ? 'publish' : 'unpublish'} startup`)
      }
      
      // Update local state
      setFormData(prev => ({ ...prev, status }))
      
      toast({
        title: "Success",
        description: status === 'active' 
          ? "Startup published successfully" 
          : "Startup unpublished successfully",
      })
    } catch (err) {
      console.error("Error updating status:", err)
      setError(err.message || `Failed to ${status === 'active' ? 'publish' : 'unpublish'} startup`)
      toast({
        title: "Error",
        description: err.message || `Failed to ${status === 'active' ? 'publish' : 'unpublish'} startup`,
        variant: "destructive"
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <StartupHeader />
      
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
          <span className="ml-2">Loading startup details...</span>
        </div>
      ) : (
        <main className="flex-1 container py-8 px-4 md:px-6">
          <div className="mb-6">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">Edit Startup</h1>
                <p className="text-gray-500 mt-1">Update your startup details and funding information</p>
              </div>
              <div className="flex gap-2">
                {formData.status === "draft" && (
                  <Button
                    className="bg-emerald-600 hover:bg-emerald-700"
                    onClick={() => handleStatusChange("active")}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Publishing...
                      </>
                    ) : (
                      "Publish Campaign"
                    )}
                  </Button>
                )}
                {formData.status === "active" && (
                  <Button
                    variant="outline"
                    className="text-amber-600 border-amber-600 hover:bg-amber-50"
                    onClick={() => handleStatusChange("draft")}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Unpublishing...
                      </>
                    ) : (
                      "Unpublish"
                    )}
                  </Button>
                )}
              </div>
            </div>

            {error && (
              <Card className="mb-8 border-red-200 bg-red-50">
                <CardContent className="p-4">
                  <p className="text-red-600">{error}</p>
                </CardContent>
              </Card>
            )}

            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="funding">Funding</TabsTrigger>
                <TabsTrigger value="team">Team & Traction</TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit}>
                <TabsContent value="basic">
                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle>Basic Information</CardTitle>
                      <CardDescription>Update the essential details about your startup</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Startup Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g., MediConnect"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tagline">Tagline *</Label>
                          <Input
                            id="tagline"
                            name="tagline"
                            value={formData.tagline}
                            onChange={handleChange}
                            placeholder="e.g., AI-powered healthcare platform connecting patients with specialists"
                            required
                          />
                          <p className="text-xs text-gray-500">
                            A short, catchy description of your startup (max 200 chars)
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description">Description *</Label>
                          <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe your startup, its mission, and value proposition..."
                            rows={5}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="industry">Industry *</Label>
                            <Select
                              value={formData.industry}
                              onValueChange={(value) => handleSelectChange("industry", value)}
                              required
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Industry" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Healthtech">Healthtech</SelectItem>
                                <SelectItem value="Fintech">Fintech</SelectItem>
                                <SelectItem value="Edtech">Edtech</SelectItem>
                                <SelectItem value="E-commerce">E-commerce</SelectItem>
                                <SelectItem value="SaaS">SaaS</SelectItem>
                                <SelectItem value="AI/ML">AI/ML</SelectItem>
                                <SelectItem value="IoT">IoT</SelectItem>
                                <SelectItem value="Consumer Tech">Consumer Tech</SelectItem>
                                <SelectItem value="AgriTech">AgriTech</SelectItem>
                                <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                                <SelectItem value="CleanTech">CleanTech</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="location">Location *</Label>
                            <Select
                              value={formData.location}
                              onValueChange={(value) => handleSelectChange("location", value)}
                              required
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select Location" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Bangalore">Bangalore</SelectItem>
                                <SelectItem value="Mumbai">Mumbai</SelectItem>
                                <SelectItem value="Delhi">Delhi NCR</SelectItem>
                                <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                                <SelectItem value="Pune">Pune</SelectItem>
                                <SelectItem value="Chennai">Chennai</SelectItem>
                                <SelectItem value="Kolkata">Kolkata</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="funding">
                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle>Funding Details</CardTitle>
                      <CardDescription>Update your funding goals and equity offering</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="fundingGoal">Funding Goal (₹) *</Label>
                          <Input
                            id="fundingGoal"
                            name="fundingGoal"
                            type="number"
                            value={formData.fundingGoal}
                            onChange={handleChange}
                            placeholder="e.g., 5000000"
                            required
                          />
                          <p className="text-xs text-gray-500">Total amount you aim to raise</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="equity">Equity Offered (%) *</Label>
                          <Input
                            id="equity"
                            name="equity"
                            type="number"
                            step="0.01"
                            min="0.01"
                            max="100"
                            value={formData.equity}
                            onChange={handleChange}
                            placeholder="e.g., 5"
                            required
                          />
                          <p className="text-xs text-gray-500">Percentage of equity you're offering to investors</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="minInvestment">Minimum Investment (₹) *</Label>
                          <Input
                            id="minInvestment"
                            name="minInvestment"
                            type="number"
                            value={formData.minInvestment}
                            onChange={handleChange}
                            placeholder="e.g., 10000"
                            required
                          />
                          <p className="text-xs text-gray-500">Minimum amount an investor can invest</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tokenRewardRate">Token Reward Rate *</Label>
                          <Input
                            id="tokenRewardRate"
                            name="tokenRewardRate"
                            type="number"
                            value={formData.tokenRewardRate}
                            onChange={handleChange}
                            placeholder="e.g., 10"
                            required
                          />
                          <p className="text-xs text-gray-500">Number of VWT tokens per ₹1,000 invested</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="campaignEndDate">Campaign End Date *</Label>
                          <Input
                            id="campaignEndDate"
                            name="campaignEndDate"
                            type="date"
                            value={formData.campaignEndDate}
                            onChange={handleChange}
                            required
                          />
                          <p className="text-xs text-gray-500">When your funding campaign will end</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="status">Campaign Status</Label>
                          <Select
                            value={formData.status}
                            onValueChange={(value) => handleSelectChange("status", value)}
                            required
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="funded">Funded</SelectItem>
                              <SelectItem value="closed">Closed</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-gray-500">Current status of your funding campaign</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="team">
                  <Card className="mb-8">
                    <CardHeader>
                      <CardTitle>Traction & Team</CardTitle>
                      <CardDescription>Update your startup's progress and team details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="traction">Traction</Label>
                          <Input
                            id="traction"
                            name="traction"
                            value={formData.traction || ""}
                            onChange={handleChange}
                            placeholder="e.g., 20,000+ monthly active users"
                          />
                          <p className="text-xs text-gray-500">Key metrics showing your startup's progress</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="growth">Growth</Label>
                          <Input
                            id="growth"
                            name="growth"
                            value={formData.growth || ""}
                            onChange={handleChange}
                            placeholder="e.g., +45% MoM"
                          />
                          <p className="text-xs text-gray-500">Your growth rate (month-over-month, year-over-year)</p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="team">Team Size *</Label>
                          <Input
                            id="team"
                            name="team"
                            type="number"
                            value={formData.team}
                            onChange={handleChange}
                            placeholder="e.g., 12"
                            required
                          />
                          <p className="text-xs text-gray-500">Number of team members</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <div className="flex justify-between mt-8">
                  <Button variant="outline" type="button" onClick={() => router.back()}>
                    Cancel
                  </Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700" type="submit" disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </div>
              </form>
            </Tabs>
          </div>
        </main>
      )}

      <StartupFooter />
    </div>
  )
}