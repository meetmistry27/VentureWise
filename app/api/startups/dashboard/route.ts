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

    const startups = await Startup.find({ owner: userId })

    return NextResponse.json({ success: true, startups }, { status: 200 })
  } catch (error: any) {
    console.error("Error fetching dashboard startups:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
