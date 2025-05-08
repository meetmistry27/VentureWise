import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function StartupCard({ startup }) {
  const fundingPercentage = (startup.fundingRaised / startup.fundingGoal) * 100

  const getRiskBadgeColor = (riskLevel: any) => {
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
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-md overflow-hidden relative border">
                <Image src={startup.logo || "/placeholder.svg"} alt={startup.name} fill className="object-cover" />
              </div>
              <div>
                <h3 className="font-semibold">{startup.name}</h3>
                <p className="text-xs text-gray-500">
                  {startup.industry} • {startup.location}
                </p>
              </div>
            </div>
            <Badge className={getRiskBadgeColor(startup.riskAssessment.riskLevel)}>{startup.riskAssessment.riskLevel}</Badge>
          </div>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{startup.tagline}</p>

          <div className="space-y-4">
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

            <div className="grid grid-cols-1 gap-2 text-sm">
                {/* <div className="bg-gray-50 p-2 rounded-md">
                  <div className="text-xs text-gray-500">Risk Score</div>
                  <div className="font-medium">{startup.riskAssessment.riskScore}/100</div>
                </div> */}
              <div className="bg-gray-50 p-2 rounded-md">
                <div className="text-xs text-gray-500">Min Investment</div>
                <div className="font-medium">₹{(startup.minInvestment / 1000).toFixed(0)}K</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-gray-50 p-2 rounded-md">
                <div className="text-xs text-gray-500">Traction</div>
                <div className="font-medium">{startup.monthlyActiveUsers}</div>
              </div>
              <div className="bg-gray-50 p-2 rounded-md">
                <div className="text-xs text-gray-500">Team Size</div>
                <div className="font-medium">{startup.teamSize} members</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 border-t bg-gray-50">
        {/* <Button variant="outline" size="sm">
          Add to Watchlist
        </Button> */}
        <Link href={`/investor/startup/${startup.id}/invest`}>
          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-1">
            Invest Now
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
