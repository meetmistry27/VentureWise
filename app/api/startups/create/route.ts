// // // /app/api/startups/route.ts
// // import { NextResponse } from "next/server"
// // import dbConnect from "../../../lib/dbconnect";
// // import Startup  from "../../../models/Startup.model"

// // export async function POST(req: Request) {
// //   try {
// //     console.log("after")
// //     await dbConnect()
// //     console.log("after")
// //     const body = await req.json()

// //     const {
// //       name,
// //       tagline,
// //       description,
// //       industry,
// //       location,
// //       fundingGoal,
// //       equity,
// //       minInvestment,
// //       tokenRewardRate,
// //       team,
// //       traction,
// //       growth,
// //       campaignEndDate,
// //       status,
// //       riskAssessment,
// //       highlights,
// //       projectedReturns,
// //     } = body

// //     if (
// //       !name ||
// //       !tagline ||
// //       !description ||
// //       !industry ||
// //       !location ||
// //       !fundingGoal ||
// //       !equity ||
// //       !minInvestment ||
// //       !tokenRewardRate ||
// //       !team ||
// //       !campaignEndDate
// //     ) {
// //       return NextResponse.json(
// //         { message: "Missing required fields." },
// //         { status: 400 }
// //       )
// //     }

// //     const newStartup = new Startup({
// //       name,
// //       tagline,
// //       description,
// //       industry,
// //       location,
// //       fundingGoal,
// //       equity,
// //       minInvestment,
// //       tokenRewardRate,
// //       team,
// //       traction,
// //       growth,
// //       campaignEndDate,
// //       status: status || "draft",
// //       riskAssessment: riskAssessment || {
// //         riskLevel: "Moderate Risk",
// //         riskScore: 50,
// //         cluster: 3,
// //       },
// //       highlights: highlights || [],
// //       projectedReturns: projectedReturns || [
// //         { year: 1, multiplier: 1.2 },
// //         { year: 2, multiplier: 1.8 },
// //         { year: 3, multiplier: 2.5 },
// //         { year: 4, multiplier: 3.2 },
// //         { year: 5, multiplier: 4.0 },
// //       ],
// //     })

// //     await newStartup.save()

// //     return NextResponse.json({ message: "Startup created successfully" }, { status: 201 })
// //   } catch (error) {
// //     console.error("Error creating startup:", error)
// //     return NextResponse.json(
// //       { message: "Internal Server Error", error: error.message },
// //       { status: 500 }
// //     )
// //   }
// // }
// // /app/api/startups/route.ts

// import { NextResponse } from "next/server"
// //import { getServerSession } from "next-auth/next"
// //import { authOptions } from "../auth/[...nextauth]/route"
// import dbConnect from "../../../../lib/dbconnect"
// import Startup from "../../../../models/Startup.model"
// //mport { getToken } from "next-auth/jwt"
// //import { cookies } from "next/headers"

// export async function POST(req: Request) {
//   try {
//     await dbConnect()
    
//     // Get the authenticated user from the session or token
//     //const token = localStorage.getItem("token")
    
//     // if (!token) {
//     //   return NextResponse.json(
//     //     { message: "Authentication required." },
//     //     { status: 401 }
//     //   )
//     // }
    

//     // This is the user ID from the token
    
//     const body = await req.json();L

//     const {
//       owner,
//       name,
//       tagline,
//       description,
//       industry,
//       location,
//       fundingGoal,
//       equity,
//       minInvestment,
//       tokenRewardRate,
//       team,
//       traction,
//       growth,
//       campaignEndDate,
//       status,
//       riskAssessment,
//       highlights,
//       projectedReturns,
//     } = body

//     if (
//       !name ||
//       !tagline ||
//       !description ||
//       !industry ||
//       !location ||
//       !fundingGoal ||
//       !equity ||
//       !minInvestment ||
//       !tokenRewardRate ||
//       !team ||
//       !campaignEndDate
//     ) {
//       return NextResponse.json(
//         { message: "Missing required fields." },
//         { status: 400 }
//       )
//     }

//     const newStartup = new Startup({
//       owner,
//       name,
//       tagline,
//       description,
//       industry,
//       location,
//       fundingGoal,
//       equity,
//       minInvestment,
//       tokenRewardRate,
//       team,
//       traction,
//       growth,
//       campaignEndDate,
//       status: status || "draft",
// // Set the owner field to the authenticated user's ID
//       riskAssessment: riskAssessment || {
//         riskLevel: "Moderate Risk",
//         riskScore: 50,
//         cluster: 3,
//       },
//       highlights: highlights || [],
//       projectedReturns: projectedReturns || [
//         { year: 1, multiplier: 1.2 },
//         { year: 2, multiplier: 1.8 },
//         { year: 3, multiplier: 2.5 },
//         { year: 4, multiplier: 3.2 },
//         { year: 5, multiplier: 4.0 },
//       ],
//     })

//     await newStartup.save()

//     return NextResponse.json({ 
//       message: "Startup created successfully",
//       startup: newStartup
//     }, { status: 201 })
//   } catch (error) {
//     console.error("Error creating startup:", error)
//     return NextResponse.json(
//       { message: "Internal Server Error", error: error.message },
//       { status: 500 }
//     )
//   }
// }

import { NextResponse } from "next/server"
import dbConnect from "@/lib/dbconnect"
import Startup from "@/models/Startup.model"
import jwt from "jsonwebtoken"

export async function POST(req: Request) {
  try {
    await dbConnect()

    const authHeader = req.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]
    const userId = authHeader.split(" ")[2]

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    } catch (error) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 })
    }

    const body = await req.json()

    const newStartup = await Startup.create({
      ...body,
      owner: userId,
    })

    return NextResponse.json({ success: true, startup: newStartup }, { status: 201 })
  } catch (error: any) {
    console.error("Error creating startup:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
