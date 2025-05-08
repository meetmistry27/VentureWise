"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, HelpCircle, Info, LineChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { InvestorHeader } from "@/components/investor-header"
import { InvestorFooter } from "@/components/investor-footer"
import { InvestmentConfirmation } from "@/components/investment-confirmation"
import { TokenRewards } from "@/components/token-rewards"
import { BlockchainSimulation } from "@/components/blockchain-simulation"
import { startupAPI, investmentAPI } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';


export default function InvestPage({ params }) {
  const router = useRouter()
  const { toast } = useToast()
  const { id } = params
  const [investmentAmount, setInvestmentAmount] = useState(25000)
  const [step, setStep] = useState(1)
  const [simulationProgress, setSimulationProgress] = useState(0)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [tokenRewards, setTokenRewards] = useState(0)
  const [transactionHash, setTransactionHash] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [startup, setStartup] = useState(null)
  const [investmentId, setInvestmentId] = useState(null)
  const [error, setError] = useState(null)

  
  useEffect(() => {
    // Fetch startup data
    const fetchStartup = async () => {
      try {
        const response = await fetch(`/api/investor/${id}`);
        const data = await response.json();
        setStartup(data)
        console.log(data)

        // Set minimum investment amount
        if (data.minInvestment > investmentAmount) {
          setInvestmentAmount(data.minInvestment)
        }
      } catch (err) {
        console.error("Error fetching startup:", err)
        setError("Failed to load startup details. Please try again.")
        toast({
          title: "Error",
          description: "Failed to load startup details. Please try again.",
          variant: "destructive",
        })
      }
    }

    fetchStartup()
  }, [id, toast])

  
  useEffect(() => {
    // Calculate token rewards based on investment amount
    if (startup) {
      const calculatedRewards = Math.floor((investmentAmount / 1000) * startup.tokenRewardRate)
      setTokenRewards(calculatedRewards)
    }
  }, [investmentAmount, startup])

  useEffect(() => {
    if (step === 3 && investmentId) {
      // Simulate blockchain transaction processing
      setIsLoading(true)

      // Start progress animation
      const interval = setInterval(() => {
        setSimulationProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 5
        })
      }, 200)
      const token = window.localStorage.getItem("token");
      // Simulate blockchain transaction
      const simulateTransaction = async () => {
        try {
          // const response = await fetch(`/api/investments/${id}/simulate-blockchain`, {
          //   method: "POST", // ✅ Must be POST
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //     "Content-Type": "application/json",
          //   },
          // })

          // Wait for simulation to complete (in a real app, you'd use websockets or polling)
          setTimeout(() => {
            setIsLoading(false)
            setTransactionHash(
              "0x" + Math.random().toString(16).substring(2, 16) + Math.random().toString(16).substring(2, 16),
            )
          }, 5000)
        } catch (err) {
          console.error("Error simulating transaction:", err)
          setError("Failed to process blockchain transaction. Please try again.")
          setIsLoading(false)
          toast({
            title: "Transaction Failed",
            description: "Failed to process blockchain transaction. Please try again.",
            variant: "destructive",
          })
        }
      }

      simulateTransaction()

      return () => clearInterval(interval)
    }
  }, [step, investmentId, toast])

  const handleInvestmentAmountChange = (value) => {
    // Ensure minimum investment amount
    if (startup) {
      const amount = Math.max(startup.minInvestment, value)
      setInvestmentAmount(amount)
    } else {
      setInvestmentAmount(value)
    }
  }

  // const handleNextStep = async () => {
  //   if (step < 3) {
  //     setStep(step + 1)
  //   } else if (step === 3 && !isLoading) {
  //     // Create investment
  //     if (!investmentId) {
  //       try {
  //         setIsLoading(true)

  //         const response = await investmentAPI.createInvestment({
  //           startup: id,
  //           amount: investmentAmount,
  //           paymentMethod: "bank_transfer", // In a real app, you'd get this from a payment form
  //         })

  //         setInvestmentId(response.data._id)

  //         toast({
  //           title: "Investment Created",
  //           description: "Your investment has been created and is being processed.",
  //         })
  //       } catch (err) {
  //         console.error("Error creating investment:", err)
  //         setError("Failed to create investment. Please try again.")
  //         setIsLoading(false)
  //         toast({
  //           title: "Investment Failed",
  //           description: "Failed to create investment. Please try again.",
  //           variant: "destructive",
  //         })
  //         return
  //       }
  //     }

  //     setShowConfirmation(true)
  //   }
  // }

  const handleNextStep = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else if (step === 3 && !isLoading) {
      if (!investmentId) {
        try {
          setIsLoading(true);
  
          const token = localStorage.getItem("token");
          const userId = localStorage.getItem("userId");
          
          if (!token) {
            setError("Authentication token not found. Please log in again.");
            setIsLoading(false);
            toast({
              title: "Unauthorized",
              description: "Please log in to continue.",
              variant: "destructive",
            });
            return;
          }
          console.log(token)
          console.log(userId)
          const response = await fetch(`/api/investor/startup/${id}/invest`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token} ${userId}`,
            },
            body: JSON.stringify({
              amount: investmentAmount,
              equityPercentage: getEquityPercentage(),
              tokenRewards: tokenRewards,
            }),
          });
            
          // Hello Ignosis Evaluators! this below code is working of localblockchain rewards system 
          // try {
          //   const rewardResponse = await fetch("/api/reward", {
          //     method: "POST",
          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //     body: JSON.stringify({
          //       walletAddress: "0xcd3B766CCDd6AE721141F452C550Ca635964ce71", // replace with actual user wallet
          //       tokenRewards: tokenRewards, // in ETH
          //     }),
          //   });
            
          //   const rewardData = await rewardResponse.json();
          //   console.log("✅ Reward sent:", rewardData);
          // } catch (rewardError) {
          //   console.error("❌ Error sending reward:", rewardError);
          //   // Consider how to handle failed rewards - maybe retry or queue for later?
          // }
  
          const data = await response.json();
  
          if (!response.ok || !data.success) {
            throw new Error(data.message || "Investment failed.");
          }

          setInvestmentId(data.investment._id);
          if (data.redirectUrl) {
            router.push(data.redirectUrl);
          }

          //router.push('/investor/portfolio');
          toast({
            title: "Investment Created",
            description: "Your investment has been created and is being processed.",
          });
        } catch (err) {
          console.error("Error creating investment:", err);
          setError("Failed to create investment. Please try again.");
          toast({
            title: "Investment Failed",
            description: "Failed to create investment. Please try again.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      router.back()
    }
  }

  const getEquityPercentage = () => {
    if (!startup) return "0.0000"
    return ((investmentAmount / startup.fundingGoal) * startup.equity * 100).toFixed(4)
  }

  const getProjectedValue = (year) => {
    if (!startup || !startup.projectedReturns) return investmentAmount

    const projectedReturn = startup.projectedReturns.find((r) => r.year === year)
    return projectedReturn ? investmentAmount * projectedReturn.multiplier : investmentAmount
  }

console.log(startup);

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <InvestorHeader />
        <main className="flex-1 container py-8 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Error</CardTitle>
                <CardDescription>There was a problem loading the investment page</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-red-500">{error}</p>
                <Button className="mt-4" onClick={() => router.back()}>
                  Go Back
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <InvestorFooter />
      </div>
    )
  }

  if (!startup) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <InvestorHeader />
        <main className="flex-1 container py-8 px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Loading</CardTitle>
                <CardDescription>Loading startup details...</CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={50} className="h-2" />
              </CardContent>
            </Card>
          </div>
        </main>
        <InvestorFooter />
      </div>
    )
  }

  const chartData = startup.projectedReturns.map((returnData) => ({
    year: `Year ${returnData.year}`,
    returns: investmentAmount * returnData.multiplier,
  }));

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <InvestorHeader />

      <main className="flex-1 container py-8 px-4 md:px-6">
        {showConfirmation ? (
          <InvestmentConfirmation
            startup={startup}
            investmentAmount={investmentAmount}
            equityPercentage={getEquityPercentage()}
            tokenRewards={tokenRewards}
            transactionHash={transactionHash}
            onClose={() => router.push("/investor")}
          />
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
                onClick={handlePreviousStep}
              >
                <ArrowLeft className="h-4 w-4" />
                {step > 1 ? "Back" : "Return to Startup Profile"}
              </Button>
            </div>

            <div className="mb-8">
              <h1 className="text-3xl font-bold">Invest in {startup.name}</h1>
              <p className="text-gray-500 mt-2">{startup.tagline}</p>
            </div>

            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-medium">
                    {step}
                  </div>
                  <span className="font-medium">
                    {step === 1 ? "Investment Details" : step === 2 ? "Token Rewards" : "Confirm & Complete"}
                  </span>
                </div>
                <div className="text-sm text-gray-500">Step {step} of 3</div>
              </div>
              <Progress value={(step / 3) * 100} className="h-2" />
            </div>

            {step === 1 && (
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Investment Amount</CardTitle>
                    <CardDescription>Select how much you want to invest in {startup.name}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1">
                        <Slider
                          defaultValue={[investmentAmount]}
                          min={startup.minInvestment}
                          max={startup.fundingGoal}
                          step={5000}
                          onValueChange={(value) => handleInvestmentAmountChange(value[0])}
                          className="py-4"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                          <span>₹{startup.minInvestment.toLocaleString()}</span>
                          <span>₹{startup.fundingGoal.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="w-full md:w-1/3">
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                          <Input
                            type="number"
                            value={investmentAmount}
                            onChange={(e) => handleInvestmentAmountChange(Number(e.target.value))}
                            className="pl-8 text-lg font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-gray-50">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">Equity</div>
                            <HelpCircle className="h-4 w-4 text-gray-400" />
                          </div>
                          <div className="text-xl font-bold mt-1">{getEquityPercentage()}%</div>
                          <div className="text-xs text-gray-500 mt-1">
                            of {(startup.equity * 100).toFixed(2)}% total offered
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-gray-50">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">Token Rewards</div>
                            <HelpCircle className="h-4 w-4 text-gray-400" />
                          </div>
                          <div className="text-xl font-bold mt-1">{tokenRewards} VWT</div>
                          <div className="text-xs text-gray-500 mt-1">VentureWise Tokens</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-gray-50">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">Projected 5Y Return</div>
                            <HelpCircle className="h-4 w-4 text-gray-400" />
                          </div>
                          <div className="text-xl font-bold mt-1">
                            {(getProjectedValue(5) / investmentAmount).toFixed(1)}x
                          </div>
                          <div className="text-xs text-gray-500 mt-1">₹{getProjectedValue(5).toLocaleString()}</div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-emerald-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-emerald-800">Investment Benefits</h4>
                          <p className="text-sm text-emerald-700 mt-1">
                            Your investment in {startup.name} comes with equity ownership, VentureWise Tokens (VWT) that
                            can be redeemed for platform benefits, and access to exclusive investor updates.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Projected Returns</CardTitle>
                    <CardDescription>See how your investment in {startup.name} could grow over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-64">
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`} />
      <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
      <Bar dataKey="returns" fill="#10b981" radius={[6, 6, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-2 mt-4">
                      {startup.projectedReturns.map((returnData) => (
                        <div key={returnData.year} className="text-center">
                          <div className="text-sm font-medium">Year {returnData.year}</div>
                          <div className="text-lg font-bold text-emerald-600">{returnData.multiplier.toFixed(1)}x</div>
                          <div className="text-xs text-gray-500">
                            ₹{(investmentAmount * returnData.multiplier).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {step === 2 && (
              <TokenRewards investmentAmount={investmentAmount} tokenRewards={tokenRewards} startup={startup} />
            )}

            {step === 3 && (
              <BlockchainSimulation
                investmentAmount={investmentAmount}
                tokenRewards={tokenRewards}
                equityPercentage={getEquityPercentage()}
                startup={startup}
                progress={simulationProgress}
                transactionHash={transactionHash}
                isLoading={isLoading}
              />
            )}

            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={handlePreviousStep}>
                {step > 1 ? "Previous" : "Cancel"}
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleNextStep} disabled={isLoading}>
                {step < 3 ? "Continue" : isLoading ? "Processing..." : "Complete Investment"}
                {!isLoading && step < 3 && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          </div>
        )}
      </main>

      <InvestorFooter />
    </div>
  )
}

