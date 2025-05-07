// import mongoose from "mongoose"

// const StartupSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Please provide a startup name"],
//       trim: true,
//       maxlength: [100, "Name cannot be more than 100 characters"],
//     },
//     tagline: {
//       type: String,
//       required: [true, "Please provide a tagline"],
//       maxlength: [200, "Tagline cannot be more than 200 characters"],
//     },
//     description: {
//       type: String,
//       required: [true, "Please provide a description"],
//     },
//     logo: {
//       type: String,
//       default: "/placeholder.svg?height=80&width=80",
//     },
//     industry: {
//       type: String,
//       required: [true, "Please provide an industry"],
//       enum: [
//         "Healthtech",
//         "Fintech",
//         "Edtech",
//         "E-commerce",
//         "SaaS",
//         "AI/ML",
//         "IoT",
//         "Consumer Tech",
//         "AgriTech",
//         "Cybersecurity",
//         "CleanTech",
//         "Biotech",
//         "Logistics",
//         "Real Estate",
//         "Other",
//       ],
//     },
//     location: {
//       type: String,
//       required: [true, "Please provide a location"],
//     },
//     fundingGoal: {
//       type: Number,
//       required: [true, "Please provide a funding goal"],
//     },
//     fundingRaised: {
//       type: Number,
//       default: 0,
//     },
//     equity: {
//       type: Number,
//       required: [true, "Please provide equity percentage offered"],
//       min: [0.01, "Equity must be at least 0.01%"],
//       max: [100, "Equity cannot exceed 100%"],
//     },
//     minInvestment: {
//       type: Number,
//       required: [true, "Please provide minimum investment amount"],
//     },
//     tokenRewardRate: {
//       type: Number,
//       default: 10, // 10 tokens per ₹1000 invested
//     },
//     riskAssessment: {
//       riskLevel: {
//         type: String,
//         enum: ["Low Risk", "Moderate Risk", "High Risk"],
//         default: "Moderate Risk",
//       },
//       riskScore: {
//         type: Number,
//         min: 0,
//         max: 100,
//         default: 50,
//       },
//       cluster: {
//         type: Number,
//         min: 1,
//         max: 5,
//         default: 3,
//       },
//     },
//     traction: String,
//     growth: String,
//     team: {
//       type: Number,
//       default: 1,
//     },
//     highlights: [String],
//     pitchDeck: String,
//     financials: {
//       revenueLastMonth: Number,
//       growthRateLastThreeMonths: Number,
//       burnRate: Number,
//       runway: Number,
//     },
//     projectedReturns: [
//       {
//         year: Number,
//         multiplier: Number,
//       },
//     ],
//     campaignEndDate: {
//       type: Date,
//       required: [true, "Please provide a campaign end date"],
//     },
//     status: {
//       type: String,
//       enum: ["draft", "pending", "active", "funded", "closed"],
//       default: "draft",
//     },
//     owner: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     teamMembers: [
//       {
//         name: String,
//         role: String,
//         bio: String,
//         image: String,
//         linkedIn: String,
//       },
//     ],
//     investors: {
//       type: Number,
//       default: 0,
//     },
//     updates: [
//       {
//         title: String,
//         content: String,
//         date: {
//           type: Date,
//           default: Date.now,
//         },
//       },
//     ],
//   },
//   { timestamps: true },
// )

// // Virtual for days left in campaign
// StartupSchema.virtual("daysLeft").get(function () {
//   const now = new Date()
//   const endDate = new Date(this.campaignEndDate)
//   const diffTime = Math.abs(endDate - now)
//   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
//   return diffDays > 0 ? diffDays : 0
// })

// // Virtual for funding percentage
// StartupSchema.virtual("fundingPercentage").get(function () {
//   return (this.fundingRaised / this.fundingGoal) * 100
// })

// // Set virtuals to true when converting to JSON
// StartupSchema.set("toJSON", { virtuals: true })
// StartupSchema.set("toObject", { virtuals: true })

// const Startup = mongoose.models.Startup || mongoose.model('Startup', StartupSchema);

// export default Startup


import mongoose from "mongoose";

const StartupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a startup name"],
      trim: true,
      maxlength: [100, "Name cannot be more than 100 characters"],
    },
    tagline: {
      type: String,
      required: [true, "Please provide a tagline"],
      maxlength: [200, "Tagline cannot be more than 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    logo: {
      type: String,
      default: "/placeholder.svg?height=80&width=80",
    },
    industry: {
      type: String,
      required: [false, "Please provide an industry"],
      enum: [
        "Healthtech",
        "Fintech",
        "Edtech",
        "E-commerce",
        "SaaS",
        "AI/ML",
        "IoT",
        "Consumer Tech",
        "AgriTech",
        "Cybersecurity",
        "CleanTech",
        "Biotech",
        "Logistics",
        "Real Estate",
        "Other",
      ],
    },
    location: {
      type: String,
      required: [false, "Please provide a location"],
    },
    fundingGoal: {
      type: Number,
      required: [true, "Please provide a funding goal"],
    },
    fundingRaised: {
      type: Number,
      default: 0,
    },
    equity: {
      type: Number,
      required: [true, "Please provide equity percentage offered"],
      min: [0.01, "Equity must be at least 0.01%"],
      max: [100, "Equity cannot exceed 100%"],
    },
    minInvestment: {
      type: Number,
      required: [true, "Please provide minimum investment amount"],
    },
    tokenRewardRate: {
      type: Number,
      default: 10, // 10 tokens per ₹1000 invested
    },
    riskAssessment: {
      riskLevel: {
        type: String,
        enum: ["Low Risk", "Moderate Risk", "High Risk"],
        default: "Moderate Risk",
      },
      riskScore: {
        type: Number,
        min: 0,
        max: 100,
        default: 50,
      },
      cluster: {
        type: Number,
        min: 0,
        max: 5,
        default: 3,
      },
    },
    traction: String,
    growth: String,

    // Renamed from "team"
    teamSize: {
      type: Number,
      default: 1,
    },

    // New market and founder fields
    marketSizeEstimate: {
      type: Number,
    },
    marketGrowthRate: {
      type: Number,
    },
    
  founderExperienceYears: {
      type: Number,
    },
    founderPreviousExits: {
      type: Number,
    },
    monthlyActiveUsers: {
      type: Number,
    },
    pilotPartnerships: {
      type: String,
      enum: ["TRUE", "FALSE"],
    },

    highlights: [String],
    pitchDeck: String,
    // financials: {
    //   revenueLastMonth: Number,
    //   growthRateLastThreeMonths: Number,
    //   burnRate: Number,
    //   runway: Number,
    // },

    revenueLastMonth:{
      type: Number,
    },

    growthRateLast_3Months:{
      type: Number,
    },

    burnRate:{
      type: Number,
    },

    runway:{
      type: Number,
    },

    projectedReturns: [
      {
        year: Number,
        multiplier: Number,
      },
    ],
    campaignEndDate: {
      type: Date,
      required: [true, "Please provide a campaign end date"],
    },
    status: {
      type: String,
      enum: ["draft", "pending", "active", "funded", "closed"],
      default: "draft",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    teamMembers: [
      {
        name: String,
        role: String,
        bio: String,
        image: String,
        linkedIn: String,
      },
    ],

    // Renamed from "investors"
    investorsCount: {
      type: Number,
      default: 0,
    },

    updates: [
      {
        title: String,
        content: String,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

// Virtual for days left in campaign
StartupSchema.virtual("daysLeft").get(function () {
  const now = new Date();
  const endDate = new Date(this.campaignEndDate);
  const diffTime = Math.abs(endDate - now);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
});

// Virtual for funding percentage
StartupSchema.virtual("fundingPercentage").get(function () {
  return (this.fundingRaised / this.fundingGoal) * 100;
});

// Set virtuals to true when converting to JSON
StartupSchema.set("toJSON", { virtuals: true });
StartupSchema.set("toObject", { virtuals: true });

const Startup = mongoose.models.Startup || mongoose.model("Startup", StartupSchema);

export default Startup;
