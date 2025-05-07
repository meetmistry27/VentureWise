import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, CheckCircle, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function FeaturedStartup({ startup }) {
  const fundingPercentage = (startup.fundingRaised / startup.fundingGoal) * 100

  const getRiskBadgeColor = (riskLevel) => {
    switch (riskLevel) {
      case "Low Risk":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "Moderate Risk":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "High Risk":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <Card className="overflow-hidden border-2 hover:border-emerald-200 transition-all duration-300">
      <CardContent className="p-0">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-md overflow-hidden relative border">
                  <Image src={startup.logo || "/placeholder.svg"} alt={startup.name} fill className="object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-xl">{startup.name}</h3>
                    <Badge className={getRiskBadgeColor(startup.riskLevel)}>{startup.riskLevel}</Badge>
                  </div>
                  <p className="text-sm text-gray-500">
                    {startup.industry} • {startup.location}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-6">{startup.description}</p>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Funding Progress</span>
                  <span>
                    ₹{(startup.fundingRaised / 100000).toFixed(1)}L / ₹{(startup.fundingGoal / 100000).toFixed(1)}L
                  </span>
                </div>
                <Progress value={fundingPercentage} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{fundingPercentage.toFixed(0)}% Funded</span>
                  <span>{startup.daysLeft} days left</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="text-xs text-gray-500">Risk Score</div>
                  <div className="font-medium text-lg">{startup.riskScore}/100</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="text-xs text-gray-500">Min Investment</div>
                  <div className="font-medium text-lg">₹{(startup.minInvestment / 1000).toFixed(0)}K</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="text-xs text-gray-500">Investors</div>
                  <div className="font-medium text-lg">{startup.investors}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="text-xs text-gray-500">Traction</div>
                  <div className="font-medium">{startup.traction}</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="text-xs text-gray-500">Growth</div>
                  <div className="font-medium">{startup.growth}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 flex flex-col">
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Highlights</h4>
              <ul className="space-y-2">
                {startup.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold mb-3">Team</h4>
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-gray-500" />
                <span className="text-sm">{startup.team} team members</span>
              </div>
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <Avatar key={i} className="border-2 border-white h-8 w-8">
                    <AvatarImage src={`/placeholder.svg?height=32&width=32&text=${i + 1}`} alt="Team member" />
                    <AvatarFallback>TM</AvatarFallback>
                  </Avatar>
                ))}
                {startup.team > 5 && (
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 border-2 border-white text-xs font-medium">
                    +{startup.team - 5}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold mb-3">Recent Investors</h4>
              <div className="flex -space-x-2">
                {[...Array(Math.min(6, startup.investors))].map((_, i) => (
                  <Avatar key={i} className="border-2 border-white h-8 w-8">
                    <AvatarImage src={`/placeholder.svg?height=32&width=32&text=I${i + 1}`} alt="Investor" />
                    <AvatarFallback>IN</AvatarFallback>
                  </Avatar>
                ))}
                {startup.investors > 6 && (
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 border-2 border-white text-xs font-medium">
                    +{startup.investors - 6}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-auto space-y-4">
              <Link href={`/investor/startup/${startup.id}/invest`} className="w-full">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Invest Now</Button>
              </Link>
              <Button variant="outline" className="w-full">
                View Detailed Pitch
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 border-t bg-gray-50">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-emerald-50">
            VentureWise Verified
          </Badge>
          <Badge variant="outline">AI Analyzed</Badge>
        </div>
        <Link href={`/investor/startup/${startup.id}/invest`}>
          <Button size="sm" variant="ghost" className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
            View Full Profile
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
