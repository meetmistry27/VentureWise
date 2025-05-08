// app/api/investor/portfolio/portfolio.ts

import dbConnect from "@/lib/dbconnect";
import Investment from "../../../../models/Investment.model";

// Retrieves sorted investments for a given userId (investor)
export const getInvestmentsByInvestorId = async (userId: string) => {
  try {
    await dbConnect();
console.log(userId)
    const investments = await Investment.find({ investor: userId })
      .populate("startup", "name industry")
      .sort({ createdAt: -1 }); // Newest investments first
  //console.log("aa jo investments" + investments)
    return investments;
  } catch (error) {
    console.error("Error in getInvestmentsByInvestorId:", error);
    throw new Error("Failed to fetch investments.");
  }
};