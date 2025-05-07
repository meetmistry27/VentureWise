"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Coins, Copy, Lock, Shield } from "lucide-react"

export function BlockchainSimulation({
  investmentAmount,
  tokenRewards,
  equityPercentage,
  startup,
  progress,
  transactionHash,
  isLoading,
}) {
  const [copied, setCopied] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [stepProgress, setStepProgress] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  })

  useEffect(() => {
    if (progress < 25) {
      setCurrentStep(1)
      setStepProgress({ ...stepProgress, 1: progress * 4 })
    } else if (progress < 50) {
      setCurrentStep(2)
      setStepProgress({ ...stepProgress, 1: 100, 2: (progress - 25) * 4 })
    } else if (progress < 75) {
      setCurrentStep(3)
      setStepProgress({ ...stepProgress, 1: 100, 2: 100, 3: (progress - 50) * 4 })
    } else {
      setCurrentStep(4)
      setStepProgress({ ...stepProgress, 1: 100, 2: 100, 3: 100, 4: (progress - 75) * 4 })
    }
  }, [progress])

  const copyToClipboard = () => {
    if (transactionHash) {
      navigator.clipboard.writeText(transactionHash)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Blockchain Transaction</CardTitle>
          <CardDescription>Your investment is being securely processed on the blockchain</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg border">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    stepProgress[1] === 100 ? "bg-emerald-100 text-emerald-600" : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {stepProgress[1] === 100 ? <CheckCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div className="font-medium">Validating Investment</div>
                    <div className="text-sm text-gray-500">{stepProgress[1]}%</div>
                  </div>
                  <Progress value={stepProgress[1]} className="h-2 mt-2" />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    stepProgress[2] === 100 ? "bg-emerald-100 text-emerald-600" : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {stepProgress[2] === 100 ? <CheckCircle className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div className="font-medium">Creating Smart Contract</div>
                    <div className="text-sm text-gray-500">{stepProgress[2]}%</div>
                  </div>
                  <Progress value={stepProgress[2]} className="h-2 mt-2" />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    stepProgress[3] === 100 ? "bg-emerald-100 text-emerald-600" : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {stepProgress[3] === 100 ? <CheckCircle className="h-5 w-5" /> : <Coins className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div className="font-medium">Minting VWT Tokens</div>
                    <div className="text-sm text-gray-500">{stepProgress[3]}%</div>
                  </div>
                  <Progress value={stepProgress[3]} className="h-2 mt-2" />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    stepProgress[4] === 100 ? "bg-emerald-100 text-emerald-600" : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {stepProgress[4] === 100 ? <CheckCircle className="h-5 w-5" /> : <Shield className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div className="font-medium">Finalizing Transaction</div>
                    <div className="text-sm text-gray-500">{stepProgress[4]}%</div>
                  </div>
                  <Progress value={stepProgress[4]} className="h-2 mt-2" />
                </div>
              </div>
            </div>

            {transactionHash && (
              <div className="mt-8 p-4 bg-emerald-50 border border-emerald-100 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-emerald-800">Transaction Complete</div>
                  <Badge className="bg-emerald-100 text-emerald-800">Success</Badge>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="text-sm text-gray-600">Transaction Hash:</div>
                  <code className="text-xs bg-white px-2 py-1 rounded border flex-1">{transactionHash}</code>
                  <button onClick={copyToClipboard} className="p-1 hover:bg-gray-100 rounded" title="Copy to clipboard">
                    <Copy className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
                <div className="mt-4 text-sm text-emerald-700">
                  Your investment has been successfully recorded on the blockchain. You can view the transaction details
                  on the blockchain explorer.
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="h-4 w-4 text-emerald-600" />
                  <div className="font-medium">Investment</div>
                </div>
                <div className="text-xl font-bold">₹{investmentAmount.toLocaleString()}</div>
                <div className="text-xs text-gray-500 mt-1">{equityPercentage}% equity</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Coins className="h-4 w-4 text-emerald-600" />
                  <div className="font-medium">Token Rewards</div>
                </div>
                <div className="text-xl font-bold">{tokenRewards} VWT</div>
                <div className="text-xs text-gray-500 mt-1">VentureWise Tokens</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-emerald-600" />
                  <div className="font-medium">Security</div>
                </div>
                <div className="text-xl font-bold">Blockchain</div>
                <div className="text-xs text-gray-500 mt-1">Immutable record</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Investment Summary</CardTitle>
          <CardDescription>Review the details of your investment in {startup.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b">
              <div className="text-gray-500">Startup</div>
              <div className="font-medium">{startup.name}</div>
            </div>
            <div className="flex justify-between py-2 border-b">
              <div className="text-gray-500">Investment Amount</div>
              <div className="font-medium">₹{investmentAmount.toLocaleString()}</div>
            </div>
            <div className="flex justify-between py-2 border-b">
              <div className="text-gray-500">Equity Percentage</div>
              <div className="font-medium">{equityPercentage}%</div>
            </div>
            <div className="flex justify-between py-2 border-b">
              <div className="text-gray-500">Token Rewards</div>
              <div className="font-medium">{tokenRewards} VWT</div>
            </div>
            <div className="flex justify-between py-2 border-b">
              <div className="text-gray-500">Transaction Status</div>
              <div className="font-medium flex items-center gap-1">
                {progress === 100 ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span>Complete</span>
                  </>
                ) : (
                  <>
                    <Clock className="h-4 w-4 text-amber-500" />
                    <span>Processing</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex justify-between py-2">
              <div className="text-gray-500">Date</div>
              <div className="font-medium">{new Date().toLocaleDateString()}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
