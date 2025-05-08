// app/api/investor/investor.ts
import dbConnect from "../../../lib/dbconnect"
import Startup from "../../../models/Startup.model";
import { NextRequest } from "next/server";

export async function getAllStartups() {
  try {
    await dbConnect(); // Connect to MongoDB using shared utility

    const startups = await Startup.find({ status: "active" });
    console.log(startups);
    return new Response(JSON.stringify(startups), { status: 200 });
  } catch (error) {
    console.error("Error fetching startups:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}

