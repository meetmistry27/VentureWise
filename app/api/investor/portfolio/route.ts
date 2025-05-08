// /app/api/investor/portfolio/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getInvestmentsByInvestorId } from "./portfolio"

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization")

    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
    
    const parts = authHeader.split(" ")
    const userId = parts[2]  // index 0: "Bearer", 1: token, 2: userId
    
    if (!userId) {
      return NextResponse.json({ message: "User ID missing in token" }, { status: 400 })
    }
    

    const investments = await getInvestmentsByInvestorId(userId)
    //console.log("From Bsckend route.ts")
    //console.log(investments)
    return NextResponse.json(investments)
  } catch (error) {
    console.error("[PORTFOLIO_GET]", error)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}