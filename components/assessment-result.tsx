"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle, XCircle } from "lucide-react"

export function AssessmentResult({ prediction, onReset }) {
  const getColorByRisk = (risk) => {
    switch (risk) {
      case "Low Risk":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          border: "border-green-200",
          icon: <CheckCircle className="h-8 w-8 text-green-600" />,
        }
      case "Moderate Risk":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-800",
          border: "border-yellow-200",
          icon: <AlertCircle className="h-8 w-8 text-yellow-600" />,
        }
      case "High Risk":
        return {
          bg: "bg-red-100",
          text: "text-red-800",
          border: "border-red-200",
          icon: <XCircle className="h-8 w-8 text-red-600" />,
        }
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          border: "border-gray-200",
          icon: <AlertCircle className="h-8 w-8 text-gray-600" />,
        }
    }
  }

  const colors = getColorByRisk(prediction.risk_label)

  const getAnalysis = (risk) => {
    switch (risk) {
      case "Low Risk":
        return {
          title: "Strong Potential",
          description:
            "This startup shows strong indicators with good market potential and experienced management. It's positioned well for growth and has a higher likelihood of success based on our analysis.",
          recommendations: [
            "Consider scaling operations to capture more market share",
            "Explore additional funding rounds to accelerate growth",
            "Invest in talent acquisition to maintain competitive advantage",
            "Develop strategic partnerships to expand reach",
          ],
        }
      case "Moderate Risk":
        return {
          title: "Promising with Concerns",
          description:
            "This startup has some promising aspects but also areas of concern that may need attention. With strategic improvements, it could reduce its risk profile significantly.",
          recommendations: [
            "Focus on improving key metrics in weaker areas",
            "Consider bringing in experienced advisors or mentors",
            "Validate product-market fit with additional customer research",
            "Optimize cash flow management and reduce unnecessary expenses",
          ],
        }
      case "High Risk":
        return {
          title: "Significant Challenges",
          description:
            "This startup shows several risk factors that may impact its potential for success and funding. Immediate attention to core issues is recommended.",
          recommendations: [
            "Pivot or refine business model to address market needs more effectively",
            "Strengthen the founding team in areas of weakness",
            "Focus on achieving product-market fit before scaling",
            "Consider bootstrapping or smaller funding rounds until key metrics improve",
          ],
        }
      default:
        return {
          title: "Analysis Unavailable",
          description: "We couldn't generate a detailed analysis for this startup.",
          recommendations: [],
        }
    }
  }

  const analysis = getAnalysis(prediction.risk_label)

  return (
    <Card className={`border-2 ${colors.border}`}>
      <CardHeader className={`${colors.bg}`}>
        <div className="flex items-center gap-4">
          {colors.icon}
          <div>
            <CardTitle className="text-2xl">{prediction.risk_label}</CardTitle>
            {/* <CardDescription className={`${colors.text}`}>
              Cluster {prediction.cluster} · Risk Score: {prediction.score}/100
            </CardDescription> */}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">{analysis.title}</h3>
          <p className="text-gray-600">{analysis.description}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Recommendations:</h3>
          <ul className="space-y-2">
            {analysis.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-emerald-500 text-xs font-medium text-emerald-600">
                  {index + 1}
                </span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Next Steps</h3>
          <p className="text-gray-600 mb-4">
            Based on your assessment, we recommend the following actions to improve your startup's chances of success:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4 bg-white">
              <h4 className="font-medium mb-2">For {prediction.risk_label} startups:</h4>
              <ul className="text-sm space-y-1">
                <li>• Schedule a consultation with our experts</li>
                <li>• Review our detailed report with actionable insights</li>
                <li>• Connect with potential investors in our network</li>
                <li>• Access resources tailored to your risk profile</li>
              </ul>
            </div>
            <div className="border rounded-lg p-4 bg-white">
              <h4 className="font-medium mb-2">Available Resources:</h4>
              <ul className="text-sm space-y-1">
                <li>• Founder mentorship program</li>
                <li>• Pitch deck review service</li>
                <li>• Market research reports</li>
                <li>• Investor matching platform</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <Button variant="outline" onClick={onReset}>
          Start New Assessment
        </Button>
        <Button className="bg-emerald-600 hover:bg-emerald-700">Download Full Report</Button>
      </CardFooter>
    </Card>
  )
}
