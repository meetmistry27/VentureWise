"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { startupAPI } from "@/lib/api"
import { StartupHeader } from "@/components/startup-header"
import { StartupFooter } from "@/components/startup-footer"

export default function CreateStartupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    tagline: "",
    description: "",
    //industry: "",
    //location: "",
    fundingGoal: "",
    equity: "",
    minInvestment: "",
    tokenRewardRate: "10",
    //team: "",
    //traction: "",
    //growth: "",
    campaignEndDate: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Convert string values to appropriate types
      const startupData = {
        ...formData,
        fundingGoal: Number(formData.fundingGoal),
        equity: Number(formData.equity) / 100, // Convert from percentage to decimal
        minInvestment: Number(formData.minInvestment),
        tokenRewardRate: Number(formData.tokenRewardRate),
        team: Number(formData.team),
        campaignEndDate: new Date(formData.campaignEndDate),
        status: "draft", // Start as draft
        riskAssessment: {
          riskLevel: "Moderate Risk", // Default risk level
          riskScore: 50, // Default risk score
          cluster: 3, // Default cluster
        },
        highlights: [], // Empty highlights for now
        projectedReturns: [
          { year: 1, multiplier: 1.2 },
          { year: 2, multiplier: 1.8 },
          { year: 3, multiplier: 2.5 },
          { year: 4, multiplier: 3.2 },
          { year: 5, multiplier: 4.0 },
        ],

      }
      const token = localStorage.getItem("token")
      const userId =localStorage.getItem("userId")
      
      const response =await fetch("/api/startups/create", {
        method: "POST", // ✅ Must be POST
        headers: {
          Authorization: `Bearer ${token} ${userId}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(startupData), // ✅ Add the request body
      })

      toast({
        title: "Startup Created",
        description: "Your startup has been created successfully!",
      })

      // Redirect to the startup dashboard
      router.push("/startup/dashboard")
    } catch (error) {
      console.error("Error creating startup:", error)
      toast({
        title: "Error",
        description: "Failed to create startup. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <StartupHeader />

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
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Create a New Startup</h1>
            <p className="text-gray-500 mt-1">
              Fill in the details below to create your startup profile and start raising funds
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Provide the essential details about your startup</CardDescription>
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
                    <p className="text-xs text-gray-500">A short, catchy description of your startup (max 200 chars)</p>
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
                    {/* <div className="space-y-2">
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
                    </div> */}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Funding Details</CardTitle>
                <CardDescription>Set your funding goals and equity offering</CardDescription>
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
                </div>
              </CardContent>
            </Card>

            {/* <Card className="mb-8">
              <CardHeader>
                <CardTitle>Traction & Team</CardTitle>
                <CardDescription>Share your startup's progress and team details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="traction">Traction</Label>
                    <Input
                      id="traction"
                      name="traction"
                      value={formData.traction}
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
                      value={formData.growth}
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
                  </div> */}
                {/* </div>
              </CardContent>
            </Card> */}

            <div className="flex justify-between mt-8">
              <Button variant="outline" type="button" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700" type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Startup"}
              </Button>
            </div>
          </form>
        </div>
      </main>

      <StartupFooter />
    </div>
  )
}
