import { NextRequest } from "next/server";
import dbConnect from "@/lib/dbconnect";
import Startup from "../../../../models/Startup.model";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
      await dbConnect();
  
      const startup = await Startup.findById(params.id);
  
      if (!startup) {
        return new Response(
          JSON.stringify({ success: false, message: "Startup not found" }),
          { status: 404 }
        );
      }
  
      return new Response(JSON.stringify(startup), { status: 200 });
    } catch (error) {
      console.error("Error fetching startup by ID:", error);
      return new Response(
        JSON.stringify({ success: false, message: "Internal Server Error" }),
        { status: 500 }
      );
    }
  }