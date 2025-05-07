import { NextResponse } from "next/server"
import dbConnect from "@/lib/dbconnect"
import Startup from "@/models/Startup.model"

export async function GET(req: Request, { params }: { params: { name: string } }) {
  try {
    await dbConnect()

    const startup = await Startup.findOne({ name: decodeURIComponent(params.name) })

    console.log(startup)
    if (!startup) {
      return NextResponse.json({ success: false, message: "Startup not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, startup }, { status: 200 })
  } catch (error: any) {
    console.error("Error fetching startup by name:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
