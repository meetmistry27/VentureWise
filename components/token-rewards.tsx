"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Coins, Gift, Shield, Star, Wallet } from "lucide-react"

export function TokenRewards({ investmentAmount, tokenRewards, startup }) {
  const [activeTab, setActiveTab] = useState("about")

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden border-2 border-emerald-100">
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">VentureWise Token Rewards</h3>
              <p className="text-emerald-100">Earn rewards for your investment</p>
            </div>
            <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Coins className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm text-gray-500 mb-1">Your Investment</div>
              <div className="text-3xl font-bold">₹{investmentAmount.toLocaleString()}</div>
              <div className="text-sm text-gray-500 mt-2">in {startup.name}</div>

              <div className="mt-6">
                <div className="text-sm text-gray-500 mb-1">Token Rewards</div>
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Coins className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="text-3xl font-bold">{tokenRewards} VWT</div>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  VentureWise Tokens (VWT) at {startup.tokenRewardRate} VWT per ₹1,000 invested
                </div>
              </div>

              <div className="mt-6 bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                <div className="flex items-start gap-3">
                  <Gift className="h-5 w-5 text-emerald-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-emerald-800">Bonus Rewards</h4>
                    <p className="text-sm text-emerald-700 mt-1">
                      Early investors receive a 10% token bonus! Your bonus tokens will be unlocked when the funding
                      goal is reached.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <Tabs defaultValue="about" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="about">About VWT</TabsTrigger>
                  <TabsTrigger value="benefits">Benefits</TabsTrigger>
                  <TabsTrigger value="redeem">Redeem</TabsTrigger>
                </TabsList>
                <div className="mt-4">
                  <TabsContent value="about" className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Coins className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">VentureWise Tokens (VWT)</h4>
                        <p className="text-sm text-gray-500">Blockchain-powered investor rewards</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      VWT are utility tokens on the VentureWise platform that provide investors with exclusive benefits.
                      Tokens are earned through investments and can be redeemed for platform perks, startup discounts,
                      and more.
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-white p-3 rounded-md border">
                        <div className="text-xs text-gray-500">Token Type</div>
                        <div className="font-medium">ERC-20 Utility</div>
                      </div>
                      <div className="bg-white p-3 rounded-md border">
                        <div className="text-xs text-gray-500">Blockchain</div>
                        <div className="font-medium">Polygon</div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="benefits" className="space-y-4">
                    <h4 className="font-medium">Token Benefits</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 bg-white p-3 rounded-md border">
                        <Star className="h-5 w-5 text-emerald-600 mt-0.5" />
                        <div>
                          <div className="font-medium">Priority Access</div>
                          <p className="text-xs text-gray-500">
                            Early access to new investment opportunities before they're publicly available
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 bg-white p-3 rounded-md border">
                        <Shield className="h-5 w-5 text-emerald-600 mt-0.5" />
                        <div>
                          <div className="font-medium">Reduced Fees</div>
                          <p className="text-xs text-gray-500">
                            Lower platform fees when you stake VWT tokens in your account
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 bg-white p-3 rounded-md border">
                        <Gift className="h-5 w-5 text-emerald-600 mt-0.5" />
                        <div>
                          <div className="font-medium">Exclusive Perks</div>
                          <p className="text-xs text-gray-500">
                            Access to startup discounts, events, and networking opportunities
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="redeem" className="space-y-4">
                    <h4 className="font-medium">Redeem Your Tokens</h4>
                    <p className="text-sm text-gray-600">
                      After completing your investment, your tokens will be available in your VentureWise wallet. You
                      can redeem them for various benefits on the platform.
                    </p>
                    <div className="bg-white p-4 rounded-md border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Wallet className="h-5 w-5 text-emerald-600" />
                          <span className="font-medium">Your VWT Wallet</span>
                        </div>
                        <Badge variant="outline" className="bg-emerald-50">
                          Coming Soon
                        </Badge>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        Connect your crypto wallet or use our custodial solution to manage your VWT tokens
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Token Utility Ecosystem</CardTitle>
          <CardDescription>How VWT tokens create value in the VentureWise platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="h-20 w-20 mx-auto bg-emerald-100 rounded-full flex items-center justify-center">
                  <Coins className="h-10 w-10 text-emerald-600" />
                </div>
                <p className="mt-4 text-sm text-gray-500">Token Ecosystem Visualization</p>
                <p className="text-xs text-gray-400">(Interactive visualization coming soon)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
