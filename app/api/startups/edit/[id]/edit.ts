// /lib/api/startup.ts
// This file contains all the functions for the startup API

import dbConnect from "@/lib/dbconnect"
import Startup from "@/models/Startup.model"
import { Types } from "mongoose"

export async function getStartupById(id: string, userId: string) {
  try {
    await dbConnect()
    
    // Validate ObjectId
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid startup ID")
    }
    
    // Find the startup by ID
    const startup = await Startup.findById(id)
    
    // Check if startup exists
    if (!startup) {
      throw new Error("Startup not found")
    }
    
    // Check if user is the owner
    if (startup.owner.toString() !== userId) {
      throw new Error("You do not have permission to access this startup")
    }
    
    return startup
  } catch (error) {
    console.error("Error in getStartupById:", error)
    throw error
  }
}

export async function updateStartup(id: string, userId: string, updateData: any) {
  try {
    await dbConnect()
    
    // Validate ObjectId
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid startup ID")
    }
    
    // Check if the startup exists and if the user is the owner
    const existingStartup = await Startup.findById(id)
    
    if (!existingStartup) {
      throw new Error("Startup not found")
    }
    
    if (existingStartup.owner.toString() !== userId) {
      throw new Error("You do not have permission to edit this startup")
    }
    
    // Validate the data if status is being updated to active
    if (updateData.status === "active") {
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
      
      const missingFields = requiredFields.filter(field => !updateData[field])
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(", ")}`)
      }
      
      // Validate that campaign end date is in the future
      if (new Date(updateData.campaignEndDate) <= new Date()) {
        throw new Error("Campaign end date must be in the future")
      }
    }
    
    // Process numeric fields if they exist
    if (updateData.fundingGoal) updateData.fundingGoal = Number(updateData.fundingGoal)
    if (updateData.equity) updateData.equity = Number(updateData.equity)
    if (updateData.minInvestment) updateData.minInvestment = Number(updateData.minInvestment)
    if (updateData.tokenRewardRate) updateData.tokenRewardRate = Number(updateData.tokenRewardRate)
    if (updateData.team) updateData.team = Number(updateData.team)
    
    // Process date fields
    if (updateData.campaignEndDate) {
      updateData.campaignEndDate = new Date(updateData.campaignEndDate)
    }
    
    // Update the startup
    const updatedStartup = await Startup.findByIdAndUpdate(
      id,
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
      },
      { new: true } // Return the updated document
    )
    
    return updatedStartup
  } catch (error) {
    console.error("Error in updateStartup:", error)
    throw error
  }
}

// Function to update just the status
export async function updateStartupStatus(id: string, userId: string, status: string) {
  try {
    await dbConnect()
    
    // Validate ObjectId
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid startup ID")
    }
    
    // Check if the startup exists and if the user is the owner
    const existingStartup = await Startup.findById(id)
    
    if (!existingStartup) {
      throw new Error("Startup not found")
    }
    
    if (existingStartup.owner.toString() !== userId) {
      throw new Error("You do not have permission to edit this startup")
    }
    
    // Validate the data if status is being updated to active
    if (status === "active") {
      // Check if all required fields are present
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
      
      const missingFields = requiredFields.filter(field => !existingStartup[field])
      
      if (missingFields.length > 0) {
        throw new Error(`Cannot publish: Missing required fields: ${missingFields.join(", ")}`)
      }
      
      // Validate that campaign end date is in the future
      if (new Date(existingStartup.campaignEndDate) <= new Date()) {
        throw new Error("Campaign end date must be in the future")
      }
    }
    
    // Update just the status
    const updatedStartup = await Startup.findByIdAndUpdate(
      id,
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
      },
      { new: true } // Return the updated document
    )
    
    return updatedStartup
  } catch (error) {
    console.error("Error in updateStartupStatus:", error)
    throw error
  }
}