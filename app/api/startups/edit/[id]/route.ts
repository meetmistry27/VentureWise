     // /app/api/startup/edit/[id]/route.ts
import { NextResponse } from "next/server"
import dbConnect from "@/lib/dbconnect"
import Startup from "@/models/Startup.model"
import jwt from "jsonwebtoken"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()

    const authHeader = request.headers.get("authorization")
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

    const id = params.id
    
    // Fetch the startup
    const startup = await Startup.findById(id)

    // Return 404 if startup doesn't exist
    if (!startup) {
      return NextResponse.json({ success: false, message: "Startup not found" }, { status: 404 })
    }

    // Check if the current user is the owner of the startup
    if (startup.owner.toString() !== userId) {
      return NextResponse.json(
        { success: false, message: "You do not have permission to view this startup" },
        { status: 403 }
      )
    }

    return NextResponse.json({ success: true, data: startup }, { status: 200 })
  } catch (error: any) {
    console.error("Error fetching startup:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch startup details" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()

    const authHeader = request.headers.get("authorization")
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

    // Get the startup ID
    const id = params.id
    
    // Parse the request body
    const body = await request.json()
    
    // Check if the startup exists and if the user is the owner
    const existingStartup = await Startup.findById(id)

    if (!existingStartup) {
      return NextResponse.json({ success: false, message: "Startup not found" }, { status: 404 })
    }

    if (existingStartup.owner.toString() !== userId) {
      return NextResponse.json(
        { success: false, message: "You do not have permission to edit this startup" },
        { status: 403 }
      )
    }

    // Validate the data if status is being updated to active
    if (body.status === "active") {
      // Check if all required fields are present for an active campaign
      const requiredFields = [
        "name",
        "tagline",
        "description",
        "industry",
        "location",
        "fundingGoal",
        "equity",
        "minInvestment",
        "tokenRewardRate",
        "campaignEndDate",
        "team",
      ]
      
      const missingFields = requiredFields.filter(field => !body[field])
      
      if (missingFields.length > 0) {
        return NextResponse.json(
          { 
            success: false, 
            message: "Missing required fields", 
            fields: missingFields 
          }, 
          { status: 400 }
        )
      }

      // Validate that campaign end date is in the future
      if (new Date(body.campaignEndDate) <= new Date()) {
        return NextResponse.json(
          { success: false, message: "Campaign end date must be in the future" },
          { status: 400 }
        )
      }
    }

    // Update the startup
    const updatedStartup = await Startup.findByIdAndUpdate(
      id,
      {
        $set: {
          name: body.name,
          tagline: body.tagline,
          description: body.description,
          industry: body.industry,
          location: body.location,
          fundingGoal: body.fundingGoal,
          equity: body.equity,
          minInvestment: body.minInvestment,
          tokenRewardRate: body.tokenRewardRate,
          team: body.team,
          traction: body.traction,
          growth: body.growth,
          campaignEndDate: body.campaignEndDate ? new Date(body.campaignEndDate) : undefined,
          status: body.status,
          updatedAt: new Date(),
        },
      },
      { new: true } // Return the updated document
    )

    return NextResponse.json(
      { 
        success: true, 
        message: "Startup updated successfully", 
        data: updatedStartup 
      }, 
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Error updating startup:", error)
    return NextResponse.json(
      { success: false, message: "Failed to update startup" },
      { status: 500 }
    )
  }
}