import mongoose from "mongoose"
import dotenv from "dotenv"
import User from "./models/User.model.js"
import Startup from "./models/Startup.model.js"
import Investment from "./models/Investment.model.js"
import TokenTransaction from "./models/Token.model.js"

// Load env vars
dotenv.config()

// Connect to DB
mongoose.connect(process.env.MONGODB_URI)

// Sample data
const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "password123",
    role: "admin",
  },
  {
    name: "Investor User",
    email: "investor@example.com",
    password: "password123",
    role: "investor",
    tokenBalance: 500,
    totalInvested: 250000,
  },
  {
    name: "Startup User",
    email: "startup@example.com",
    password: "password123",
    role: "startup",
  },
]

const startups = [
  {
    name: "MediConnect",
    tagline: "AI-powered healthcare platform connecting patients with specialists",
    description:
      "MediConnect is revolutionizing healthcare access in India by connecting patients with specialists through an AI-powered platform that provides accurate diagnoses and treatment recommendations.",
    industry: "Healthtech",
    location: "Bangalore",
    fundingGoal: 5000000,
    fundingRaised: 3750000,
    equity: 0.05,
    minInvestment: 10000,
    tokenRewardRate: 10,
    riskAssessment: {
      riskLevel: "Low Risk",
      riskScore: 82,
      cluster: 1,
    },
    traction: "20,000+ monthly active users",
    growth: "+45% MoM",
    team: 12,
    highlights: [
      "Partnerships with 200+ hospitals",
      "45% month-over-month growth",
      "Featured in YourStory's Top 10 Healthtech Startups",
    ],
    campaignEndDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
    status: "active",
    projectedReturns: [
      { year: 1, multiplier: 1.2 },
      { year: 2, multiplier: 1.8 },
      { year: 3, multiplier: 2.5 },
      { year: 4, multiplier: 3.2 },
      { year: 5, multiplier: 4.0 },
    ],
    investors: 48,
  },
  {
    name: "FinEase",
    tagline: "Simplified financial management for small businesses",
    description:
      "FinEase provides an easy-to-use financial management platform for small businesses in India, helping them manage invoices, expenses, and taxes efficiently.",
    industry: "Fintech",
    location: "Mumbai",
    fundingGoal: 3000000,
    fundingRaised: 1200000,
    equity: 0.07,
    minInvestment: 5000,
    tokenRewardRate: 12,
    riskAssessment: {
      riskLevel: "Moderate Risk",
      riskScore: 65,
      cluster: 3,
    },
    traction: "5,000+ businesses onboarded",
    growth: "+28% MoM",
    team: 8,
    highlights: [
      "Integration with major accounting software",
      "Featured in Economic Times",
      "Winner of NASSCOM Fintech Challenge 2023",
    ],
    campaignEndDate: new Date(Date.now() + 22 * 24 * 60 * 60 * 1000), // 22 days from now
    status: "active",
    projectedReturns: [
      { year: 1, multiplier: 1.1 },
      { year: 2, multiplier: 1.5 },
      { year: 3, multiplier: 2.2 },
      { year: 4, multiplier: 2.8 },
      { year: 5, multiplier: 3.5 },
    ],
    investors: 32,
  },
]

// Import data into DB
const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany()
    await Startup.deleteMany()
    await Investment.deleteMany()
    await TokenTransaction.deleteMany()

    // Create users
    const createdUsers = await User.create(users)

    // Get startup owner ID
    const startupOwner = createdUsers.find((user) => user.role === "startup")

    // Add owner to startups
    const startupsWithOwner = startups.map((startup) => ({
      ...startup,
      owner: startupOwner._id,
    }))

    // Create startups
    const createdStartups = await Startup.create(startupsWithOwner)

    // Get investor ID
    const investor = createdUsers.find((user) => user.role === "investor")

    // Create sample investments
    const investments = [
      {
        investor: investor._id,
        startup: createdStartups[0]._id,
        amount: 100000,
        equityPercentage: (100000 / createdStartups[0].fundingGoal) * createdStartups[0].equity,
        tokenRewards: Math.floor((100000 / 1000) * createdStartups[0].tokenRewardRate),
        status: "completed",
        transactionHash:
          "0x" + Math.random().toString(16).substring(2, 16) + Math.random().toString(16).substring(2, 16),
        paymentMethod: "bank_transfer",
        paymentDetails: {
          transactionId: "TXN" + Math.floor(Math.random() * 1000000),
        },
      },
      {
        investor: investor._id,
        startup: createdStartups[1]._id,
        amount: 50000,
        equityPercentage: (50000 / createdStartups[1].fundingGoal) * createdStartups[1].equity,
        tokenRewards: Math.floor((50000 / 1000) * createdStartups[1].tokenRewardRate),
        status: "completed",
        transactionHash:
          "0x" + Math.random().toString(16).substring(2, 16) + Math.random().toString(16).substring(2, 16),
        paymentMethod: "upi",
        paymentDetails: {
          transactionId: "TXN" + Math.floor(Math.random() * 1000000),
        },
      },
    ]

    await Investment.create(investments)

    // Create token transactions
    const tokenTransactions = [
      {
        user: investor._id,
        amount: investments[0].tokenRewards,
        type: "reward",
        description: `Investment reward for ${createdStartups[0].name}`,
        relatedInvestment: investments[0]._id,
        relatedStartup: createdStartups[0]._id,
        transactionHash: investments[0].transactionHash,
        status: "completed",
      },
      {
        user: investor._id,
        amount: investments[1].tokenRewards,
        type: "reward",
        description: `Investment reward for ${createdStartups[1].name}`,
        relatedInvestment: investments[1]._id,
        relatedStartup: createdStartups[1]._id,
        transactionHash: investments[1].transactionHash,
        status: "completed",
      },
    ]

    await TokenTransaction.create(tokenTransactions)

    console.log("Data Imported...")
    process.exit()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

// Delete data from DB
const deleteData = async () => {
  try {
    await User.deleteMany()
    await Startup.deleteMany()
    await Investment.deleteMany()
    await TokenTransaction.deleteMany()

    console.log("Data Destroyed...")
    process.exit()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

// Check command line args
if (process.argv[2] === "-i") {
  importData()
} else if (process.argv[2] === "-d") {
  deleteData()
} else {
  console.log("Please use -i to import data or -d to destroy data")
  process.exit()
}
