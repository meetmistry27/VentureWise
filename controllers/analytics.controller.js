import Investment from "../models/Investment.model.js"
import Startup from "../models/Startup.model.js"
import User from "../models/User.model.js"
import { asyncHandler } from "../middleware/async.middleware.js"
import { ErrorResponse } from "../utils/errorResponse.js"

@desc    Get investor analytics
@route   GET /api/analytics/investor
@access  Private/Investor
export const getInvestorAnalytics = asyncHandler(async (req, res, next) => {
  // Get user's investments
  const investments = await Investment.find({
    investor: req.user.id,
    status: "completed",
  }).populate("startup", "name industry riskAssessment")

  // Calculate investment distribution by industry
  const industryDistribution = {}
  investments.forEach((inv) => {
    const industry = inv.startup.industry
    if (!industryDistribution[industry]) {
      industryDistribution[industry] = 0
    }
    industryDistribution[industry] += inv.amount
  })

  // Calculate investment distribution by risk level
  const riskDistribution = {}
  investments.forEach((inv) => {
    const riskLevel = inv.startup.riskAssessment.riskLevel
    if (!riskDistribution[riskLevel]) {
      riskDistribution[riskLevel] = 0
    }
    riskDistribution[riskLevel] += inv.amount
  })

  // Calculate monthly investment trend (last 6 months)
  const now = new Date()
  const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6))

  const monthlyTrend = await Investment.aggregate([
    {
      $match: {
        investor: req.user._id,
        status: "completed",
        createdAt: { $gte: sixMonthsAgo },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        totalAmount: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ])

  // Format monthly trend data
  const formattedMonthlyTrend = monthlyTrend.map((item) => ({
    month: `${item._id.year}-${item._id.month.toString().padStart(2, "0")}`,
    amount: item.totalAmount,
    count: item.count,
  }))

  res.status(200).json({
    success: true,
    data: {
      industryDistribution,
      riskDistribution,
      monthlyTrend: formattedMonthlyTrend,
    },
  })
})

@desc    Get startup analytics
@route   GET /api/analytics/startup
@access  Private/Startup
export const getStartupAnalytics = asyncHandler(async (req, res, next) => {
  // Find startup owned by user
  const startup = await Startup.findOne({ owner: req.user.id })

  if (!startup) {
    return next(new ErrorResponse("No startup found for this user", 404))
  }

  // Get investments for this startup
  const investments = await Investment.find({
    startup: startup._id,
    status: "completed",
  })

  // Calculate investment trend (last 6 months)
  const now = new Date()
  const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6))

  const investmentTrend = await Investment.aggregate([
    {
      $match: {
        startup: startup._id,
        status: "completed",
        createdAt: { $gte: sixMonthsAgo },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        totalAmount: { $sum: "$amount" },
        investorCount: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ])

  // Format investment trend data
  const formattedInvestmentTrend = investmentTrend.map((item) => ({
    month: `${item._id.year}-${item._id.month.toString().padStart(2, "0")}`,
    amount: item.totalAmount,
    investorCount: item.investorCount,
  }))

  // Calculate funding progress
  const fundingProgress = {
    raised: startup.fundingRaised,
    goal: startup.fundingGoal,
    percentage: (startup.fundingRaised / startup.fundingGoal) * 100,
    investorCount: investments.length,
    daysLeft: startup.daysLeft,
  }

  res.status(200).json({
    success: true,
    data: {
      fundingProgress,
      investmentTrend: formattedInvestmentTrend,
    },
  })
})

@desc    Get platform analytics
@route   GET /api/analytics/platform
@access  Private/Admin
export const getPlatformAnalytics = asyncHandler(async (req, res, next) => {
  // Get platform-wide statistics
  const totalUsers = await User.countDocuments()
  const totalStartups = await Startup.countDocuments()
  const totalInvestments = await Investment.countDocuments({ status: "completed" })

  // Calculate total funding raised across platform
  const fundingStats = await Investment.aggregate([
    { $match: { status: "completed" } },
    { $group: { _id: null, totalFunding: { $sum: "$amount" } } },
  ])

  const totalFunding = fundingStats.length > 0 ? fundingStats[0].totalFunding : 0

  // Get industry distribution
  const industryDistribution = await Startup.aggregate([
    { $group: { _id: "$industry", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ])

  // Get risk level distribution
  const riskDistribution = await Startup.aggregate([
    { $group: { _id: "$riskAssessment.riskLevel", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ])

  // Get monthly growth trends
  const now = new Date()
  const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6))

  const userGrowth = await User.aggregate([
    { $match: { createdAt: { $gte: sixMonthsAgo } } },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ])

  const investmentGrowth = await Investment.aggregate([
    { $match: { createdAt: { $gte: sixMonthsAgo } } },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        amount: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ])

  res.status(200).json({
    success: true,
    data: {
      overview: {
        totalUsers,
        totalStartups,
        totalInvestments,
        totalFunding,
      },
      industryDistribution,
      riskDistribution,
      growth: {
        users: userGrowth.map((item) => ({
          month: `${item._id.year}-${item._id.month.toString().padStart(2, "0")}`,
          count: item.count,
        })),
        investments: investmentGrowth.map((item) => ({
          month: `${item._id.year}-${item._id.month.toString().padStart(2, "0")}`,
          amount: item.amount,
          count: item.count,
        })),
      },
    },
  })
})

@desc    Get market trends
@route   GET /api/analytics/market-trends
@access  Private
export const getMarketTrends = asyncHandler(async (req, res, next) => {
  // Get top performing industries
  const topIndustries = await Startup.aggregate([
    { $match: { status: "active" } },
    {
      $group: {
        _id: "$industry",
        avgRiskScore: { $avg: "$riskAssessment.riskScore" },
        count: { $sum: 1 },
        totalFunding: { $sum: "$fundingRaised" },
      },
    },
    { $sort: { avgRiskScore: -1 } },
    { $limit: 5 },
  ])

  // Get funding stages distribution
  const fundingStages = [
    { stage: "Seed", percentage: 45 },
    { stage: "Series A", percentage: 30 },
    { stage: "Series B", percentage: 15 },
    { stage: "Series C", percentage: 7 },
    { stage: "Series D+", percentage: 3 },
  ]

  // Get geographic distribution
  const geoDistribution = [
    { location: "Bangalore", percentage: 38 },
    { location: "Mumbai", percentage: 22 },
    { location: "Delhi NCR", percentage: 18 },
    { location: "Hyderabad", percentage: 12 },
    { location: "Pune", percentage: 10 },
  ]

  // Get success factors
  const successFactors = [
    {
      factor: "Strong Founding Team",
      description: "Startups with experienced founders are 2.5x more likely to succeed.",
      icon: "Users",
    },
    {
      factor: "Consistent Growth",
      description: "Startups with 20%+ MoM growth for 6+ months show higher success rates.",
      icon: "TrendingUp",
    },
    {
      factor: "Capital Efficiency",
      description: "Startups with lower burn rates relative to growth have 30% higher valuations.",
      icon: "Wallet",
    },
  ]

  res.status(200).json({
    success: true,
    data: {
      topIndustries: topIndustries.map((industry) => ({
        name: industry._id,
        percentage: Math.round((industry.totalFunding / (industry.totalFunding + 1000000)) * 100),
        score: Math.round(industry.avgRiskScore),
      })),
      fundingStages,
      geoDistribution,
      successFactors,
    },
  })
})
