"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Coins, Copy, ExternalLink, Share2 } from "lucide-react"

export function InvestmentConfirmation({
  startup,
  investmentAmount,
  equityPercentage,
  tokenRewards,
  transactionHash,
  onClose,
}) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 mb-4">
          <CheckCircle className="h-10 w-10 text-emerald-600" />
        </div>
        <h1 className="text-3xl font-bold">Investment Successful!</h1>
        <p className="text-gray-500 mt-2">Your investment in {startup.name} has been processed successfully</p>
      </div>

      <Card className="mb-8 border-2 border-emerald-100">
        <CardHeader className="bg-emerald-50">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-md overflow-hidden relative border">
              <Image src={startup.logo || "/placeholder.svg"} alt={startup.name} fill className="object-cover" />
            </div>
            <div>
              <CardTitle>{startup.name}</CardTitle>
              <CardDescription>{startup.tagline}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-gray-500 mb-1">Investment Amount</div>
              <div className="text-2xl font-bold">₹{investmentAmount.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Equity</div>
              <div className="text-2xl font-bold">{equityPercentage}%</div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-500">Token Rewards</div>
              <Badge className="bg-emerald-100 text-emerald-800">Blockchain Verified</Badge>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <Coins className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <div className="text-xl font-bold">{tokenRewards} VWT</div>
                <div className="text-xs text-gray-500">VentureWise Tokens</div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="text-sm text-gray-500 mb-2">Transaction Hash</div>
            <div className="flex items-center gap-2">
              <code className="text-xs bg-gray-50 px-2 py-1 rounded border flex-1 truncate">{transactionHash}</code>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 flex justify-between">
          <div className="text-sm text-gray-500">
            {new Date().toLocaleDateString()} • {new Date().toLocaleTimeString()}
          </div>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </CardFooter>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-medium mb-2">What happens next?</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>You'll receive an email confirmation of your investment</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Your VWT tokens are now available in your VentureWise wallet</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>You'll get regular updates about {startup.name}'s progress</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Your investment will appear in your portfolio dashboard</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700" onClick={onClose}>
            View Portfolio
          </Button>
          <Link href="/investor" className="flex-1">
            <Button variant="outline" className="w-full">
              Explore More Startups
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
