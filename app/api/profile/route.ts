import { NextResponse } from "next/server"
import dbConnect from "@/lib/dbconnect"
import User from "@/models/User.model"
import jwt from "jsonwebtoken"

export async function GET(request: Request) {
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

    // Fetch the user profile
    const user = await User.findById(userId)
      .select("-password") // Exclude password from the response

    // Return 404 if user doesn't exist
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 })
  } catch (error: any) {
    console.error("Error fetching user profile:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch user profile" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
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

    // Parse the request body
    const body = await request.json()
    
    // Check if the user exists
    const existingUser = await User.findById(userId)

    if (!existingUser) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    // Only allow updating specific fields
    const updatableFields = ["name", "email", "phoneNumber", "location", "bio", "profileImage"]
    
    // Create an object with only the fields that should be updated
    const updateData: Record<string, any> = {}
    
    for (const field of updatableFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field]
      }
    }

    // Add updatedAt field
    updateData.updatedAt = new Date()

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true } // Return the updated document
    ).select("-password") // Exclude password from the response

    return NextResponse.json(
      { 
        success: true, 
        message: "Profile updated successfully", 
        data: updatedUser 
      }, 
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Error updating user profile:", error)
    return NextResponse.json(
      { success: false, message: "Failed to update user profile" },
      { status: 500 }
    )
  }
}