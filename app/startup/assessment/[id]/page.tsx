"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { AssessmentResult } from "@/components/assessment-result"

export default function AssessmentPage({ params }) {
  const { id } = params
  const [formData, setFormData] = useState({
    industry: "",
    location: "",
    market_size_estimate: "",
    market_growth_rate: "",
    founder_experience_years: "",
    founder_previous_exits: "",
    founder_education_level: "",
    team_size: "",
    monthly_active_users: "",
    revenue_last_month: "",
    growth_rate_last_3_months: "",
    pilot_partnerships: false,
    investors_count: "",
    burn_rate: "",
    runway: "",
  })

  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("market")

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   setLoading(true)
  //   setError(null)

  //   try {
  //     // Convert string values to appropriate types
  //     const processedData = {
  //       ...formData,
  //       market_size_estimate: Number.parseFloat(formData.market_size_estimate),
  //       market_growth_rate: Number.parseFloat(formData.market_growth_rate),
  //       founder_experience_years: Number.parseInt(formData.founder_experience_years),
  //       founder_previous_exits: Number.parseInt(formData.founder_previous_exits),
  //       team_size: Number.parseInt(formData.team_size),
  //       monthly_active_users: Number.parseInt(formData.monthly_active_users),
  //       revenue_last_month: Number.parseFloat(formData.revenue_last_month),
  //       growth_rate_last_3_months: Number.parseFloat(formData.growth_rate_last_3_months),
  //       burn_rate: Number.parseInt(formData.burn_rate),
  //       runway: Number.parseInt(formData.runway),
  //       investors_count: Number.parseInt(formData.investors_count),
  //       pilot_partnerships: formData.pilot_partnerships ? "TRUE" : "FALSE",
  //     }

  //     // For demo purposes, we'll simulate a response
  //     // setTimeout(() => {
  //     //   const mockResponse = {
  //     //     risk_label: ["Low Risk", "Moderate Risk", "High Risk"][Math.floor(Math.random() * 3)],
  //     //     cluster: Math.floor(Math.random() * 5) + 1,
  //     //     score: Math.floor(Math.random() * 100),
  //     //   }
  //     //   setPrediction(mockResponse)
  //     //   setLoading(false)
  //     // }, 1500)
      
  //     try {
  //       const res = await fetch(`/api/startups/assessment/${id}`, {
  //         method: 'PUT',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(processedData),
  //       });
    
  //       if (!res.ok) {
  //         const error = await res.json();
  //         throw new Error(error.message || 'Failed to update startup');
  //       }
    
  //       const data = await res.json();
  //       console.log('Startup updated:', data);
  //       // Optional: show success toast or redirect
  //     } catch (err) {
  //       console.error('Error updating startup:', err.message);
  //       // Optional: show error toast
  //     }

  //     // Uncomment for real API integration
      
  //     const response = await fetch("http://127.0.0.1:5000/predict", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify(processedData)
  //     })
  //     console.log(response)
  //     if (!response.ok) {
  //       throw new Error("API request failed")
  //     }

  //     const result = await response.json()
  //     setPrediction(result)
      
  //   } catch (err) {
  //     setError("Error making prediction: " + err.message)
  //     setLoading(false)
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      // Convert string values to appropriate types
      const processedData = {
        ...formData,
        market_size_estimate: Number.parseFloat(formData.market_size_estimate),
        market_growth_rate: Number.parseFloat(formData.market_growth_rate),
        founder_experience_years: Number.parseInt(formData.founder_experience_years),
        founder_previous_exits: Number.parseInt(formData.founder_previous_exits),
        team_size: Number.parseInt(formData.team_size),
        monthly_active_users: Number.parseInt(formData.monthly_active_users),
        revenue_last_month: Number.parseFloat(formData.revenue_last_month),
        growth_rate_last_3_months: Number.parseFloat(formData.growth_rate_last_3_months),
        burn_rate: Number.parseInt(formData.burn_rate),
        runway: Number.parseInt(formData.runway),
        investors_count: Number.parseInt(formData.investors_count),
        pilot_partnerships: !!formData.pilot_partnerships,
        status: "active",
      };
  
      // Save the data to your Next.js API if needed
      try {
        const res = await fetch(`/api/startups/assessment/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(processedData),
        });
    
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message || 'Failed to update startup');
        }
    
        console.log('Startup updated in database');
      } catch (err) {
        console.error('Error updating startup in database:', err.message);
        // Continue anyway - this shouldn't block the prediction
      }
  
      // Make prediction request to Flask backend
      console.log("Sending prediction request to Flask backend:", processedData);
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(processedData),
        // No need for credentials: 'include' unless you're using authentication
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API request failed: ${response.status} ${errorText}`);
      }
  
      const result = await response.json();
      console.log("Prediction result:", result);
      setPrediction(result);

      const resultData ={
        ...processedData,
        riskAssessment : result
      }

      try {
        const res = await fetch(`/api/startups/assessment/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(resultData),
        });
    
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.message || 'Failed to update startup');
        }
    
        console.log('Startup updated in database');
      } catch (err) {
        console.error('Error updating startup in database:', err.message);
        // Continue anyway - this shouldn't block the prediction
      }

      setLoading(false);
    } catch (err) {
      console.error("Error:", err);
      setError("Error making prediction: " + err.message);
      setLoading(false);
    }
  }


  const isTabComplete = (tab) => {
    switch (tab) {
      case "market":
        return (
          //!!formData.industry && 
          // !!formData.location && 
          !!formData.market_size_estimate && !!formData.market_growth_rate
        )
      case "founder":
        return (
          !!formData.founder_experience_years && !!formData.founder_previous_exits && !!formData.founder_education_level
        )
      case "business":
        return (
          //!!formData.team_size &&
          //!!formData.monthly_active_users &&
          !!formData.revenue_last_month &&
          !!formData.growth_rate_last_3_months 
          //!!formData.investors_count
        )
      default:
        return false
    }
  }

  const getCompletionPercentage = () => {
    let completed = 0
    const total = 3 // Total number of tabs

    if (isTabComplete("market")) completed++
    if (isTabComplete("founder")) completed++
    if (isTabComplete("business")) completed++

    return (completed / total) * 100
  }

  // const handleSubmit = async () => {
  //   try {
  //     const res = await fetch(`/api/startups/${startupId}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });
  
  //     if (!res.ok) {
  //       const error = await res.json();
  //       throw new Error(error.message || 'Failed to update startup');
  //     }
  
  //     const data = await res.json();
  //     console.log('Startup updated:', data);
  //     // Optional: show success toast or redirect
  //   } catch (err) {
  //     console.error('Error updating startup:', err.message);
  //     // Optional: show error toast
  //   }
  // };
  

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-emerald-600" />
            <span className="text-xl font-bold">VentureWise</span>
          </div>
          <Link href="/" className="flex items-center text-sm font-medium text-gray-500 hover:text-emerald-600">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="flex-1 container py-8 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 space-y-4">
            <h1 className="text-3xl font-bold">Startup Risk Assessment</h1>
            <p className="text-gray-500">
              Complete the form below to get a comprehensive risk assessment for your startup. Our AI model will analyze
              your data and provide insights to help you improve your chances of success.
            </p>

            {!prediction && (
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Assessment Progress</span>
                  <span>{Math.round(getCompletionPercentage())}%</span>
                </div>
                <Progress value={getCompletionPercentage()} className="h-2" />
              </div>
            )}
          </div>

          {!prediction ? (
            <Card>
              <CardHeader>
                <CardTitle>Startup Information</CardTitle>
                <CardDescription>Provide details about your startup to receive an accurate assessment.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="market" className="relative">
                        Market
                        {isTabComplete("market") && (
                          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-emerald-500" />
                        )}
                      </TabsTrigger>
                      <TabsTrigger value="founder" className="relative">
                        Founder
                        {isTabComplete("founder") && (
                          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-emerald-500" />
                        )}
                      </TabsTrigger>
                      <TabsTrigger value="business" className="relative">
                        Business
                        {isTabComplete("business") && (
                          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-emerald-500" />
                        )}
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="market" className="space-y-4 mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="industry">Industry</Label>
                          <Select value={formData.industry} onValueChange={(value) => handleChange("industry", value)}>
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
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Select value={formData.location} onValueChange={(value) => handleChange("location", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Location" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Bangalore">Bangalore</SelectItem>
                              <SelectItem value="Mumbai">Mumbai</SelectItem>
                              <SelectItem value="Delhi">Delhi</SelectItem>
                              <SelectItem value="Hyderabad">Hyderabad</SelectItem>
                              <SelectItem value="Pune">Pune</SelectItem>
                              <SelectItem value="Chennai">Chennai</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="market_size_estimate">Market Size Estimate (₹ in Crores)</Label>
                          <Input
                            type="number"
                            id="market_size_estimate"
                            value={formData.market_size_estimate}
                            onChange={(e) => handleChange("market_size_estimate", e.target.value)}
                            placeholder="e.g., 100"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="market_growth_rate">Market Growth Rate (%)</Label>
                          <Input
                            type="number"
                            id="market_growth_rate"
                            value={formData.market_growth_rate}
                            onChange={(e) => handleChange("market_growth_rate", e.target.value)}
                            placeholder="e.g., 15"
                            step="0.01"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          type="button"
                          onClick={() => setActiveTab("founder")}
                          className="bg-emerald-600 hover:bg-emerald-700"
                        >
                          Next: Founder Information
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="founder" className="space-y-4 mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="founder_experience_years">Founder Experience (Years)</Label>
                          <Input
                            type="number"
                            id="founder_experience_years"
                            value={formData.founder_experience_years}
                            onChange={(e) => handleChange("founder_experience_years", e.target.value)}
                            placeholder="e.g., 5"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="founder_previous_exits">Founder Previous Exits</Label>
                          <Input
                            type="number"
                            id="founder_previous_exits"
                            value={formData.founder_previous_exits}
                            onChange={(e) => handleChange("founder_previous_exits", e.target.value)}
                            placeholder="e.g., 1"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="founder_education_level">Founder Education Level</Label>
                          <Select
                            value={formData.founder_education_level}
                            onValueChange={(value) => handleChange("founder_education_level", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Education" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="High School">High School</SelectItem>
                              <SelectItem value="Bachelors">Bachelors</SelectItem>
                              <SelectItem value="Masters">Masters</SelectItem>
                              <SelectItem value="MBA">MBA</SelectItem>
                              <SelectItem value="PhD">PhD</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={() => setActiveTab("market")}>
                          Back
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setActiveTab("business")}
                          className="bg-emerald-600 hover:bg-emerald-700"
                        >
                          Next: Business Information
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="business" className="space-y-4 mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="team_size">Team Size</Label>
                          <Input
                            type="number"
                            id="team_size"
                            value={formData.team_size}
                            onChange={(e) => handleChange("team_size", e.target.value)}
                            placeholder="e.g., 10"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="monthly_active_users">Monthly Active Users</Label>
                          <Input
                            type="number"
                            id="monthly_active_users"
                            value={formData.monthly_active_users}
                            onChange={(e) => handleChange("monthly_active_users", e.target.value)}
                            placeholder="e.g., 5000"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="revenue_last_month">Revenue Last Month (₹ in Lakhs)</Label>
                          <Input
                            type="number"
                            id="revenue_last_month"
                            value={formData.revenue_last_month}
                            onChange={(e) => handleChange("revenue_last_month", e.target.value)}
                            placeholder="e.g., 10"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="growth_rate_last_3_months">Growth Rate Last 3 Months (%)</Label>
                          <Input
                            type="number"
                            id="growth_rate_last_3_months"
                            value={formData.growth_rate_last_3_months}
                            onChange={(e) => handleChange("growth_rate_last_3_months", e.target.value)}
                            placeholder="e.g., 20"
                            step="0.01"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="burn_rate">Burn Rate in ₹(in Lakhs)</Label>
                          <Input
                            type="number"
                            id="burn_rate"
                            value={formData.burn_rate}
                            onChange={(e) => handleChange("burn_rate", e.target.value)}
                            placeholder="e.g., 20"
                            step="0.01"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="runway">Runway in ₹</Label>
                          <Input
                            type="number"
                            id="runway"
                            value={formData.runway}
                            onChange={(e) => handleChange("runway", e.target.value)}
                            placeholder="e.g., 20"
                            step="0.01"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="investors_count">Investors Count</Label>
                          <Input
                            type="number"
                            id="investors_count"
                            value={formData.investors_count}
                            onChange={(e) => handleChange("investors_count", e.target.value)}
                            placeholder="e.g., 2"
                          />
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="pilot_partnerships"
                            checked={formData.pilot_partnerships}
                            onCheckedChange={(checked) => handleChange("pilot_partnerships", checked)}
                          />
                          <Label htmlFor="pilot_partnerships">Has Pilot Partnerships</Label>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={() => setActiveTab("founder")}>
                          Back
                        </Button>
                        <Button type="submit" onClick = {handleSubmit} className="bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
                          {loading ? "Processing..." : "Assess Risk"}
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </form>
              </CardContent>
            </Card>
          ) : (
            <AssessmentResult prediction={prediction} onReset={() => setPrediction(null)} />
          )}

          {error && <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-md">{error}</div>}
        </div>
      </main>

      <footer className="w-full border-t py-6">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-16 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            <span className="font-semibold">VentureWise</span>
          </div>
          <p className="text-xs text-gray-500">© {new Date().getFullYear()} VentureWise. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
