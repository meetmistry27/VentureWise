import dbConnect from "../../../../../../lib/dbconnect";
import Startup from "../../../../../../models/Startup.model";
import Investment from "../../../../../../models/Investment.model";
import User from "../../../../../../models/User.model";
import jwt from "jsonwebtoken";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  await dbConnect();

  // Extract token from Authorization header (client must send it)
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response(
      JSON.stringify({ success: false, message: "Unauthorized: Token missing" }),
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];
  const userId = authHeader.split(" ")[2];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!);
//     userId = (decoded as any)._id;
//   } catch (error) {
//     return new Response(
//       JSON.stringify({ success: false, message: "Invalid or expired token" }),
//       { status: 401 }
//     );
//   }

  // Validate user
  const user = await User.findById(userId);
  if (!user || user.role !== "investor") {
    return new Response(JSON.stringify({ success: false, message: "Access denied" }), {
      status: 403,
    });
  }

  // Parse and validate request body
  let amount: number;
  let equityPercentage: number;
  let tokenRewards: number;
  try {
    const body = await req.json();
    amount = body.amount;
    equityPercentage = body.equityPercentage;
    tokenRewards = body.tokenRewards;
  } catch {
    return new Response(
      JSON.stringify({ success: false, message: "Invalid JSON body" }),
      { status: 400 }
    );
  }

  if (!amount || typeof amount !== "number" || amount <= 0) {
    return new Response(
      JSON.stringify({ success: false, message: "Invalid investment amount" }),
      { status: 400 }
    );
  }

  const startupId = params.id;

  const startup = await Startup.findById(startupId);
  if (!startup) {
    return new Response(
      JSON.stringify({ success: false, message: "Startup not found" }),
      { status: 404 }
    );
  }

  if (startup.fundingGoal < amount) {
    return new Response(
      JSON.stringify({ success: false, message: "Investment exceeds remaining funding goal" }),
      { status: 400 }
    );
  }

  // Simulate blockchain transaction

    
  // Create investment record
  const investment = await Investment.create({
    investor: user._id,
    startup: startupId,
    amount,
    transactionHash: `0x${Math.random().toString(16).slice(2)}`,
    status: "completed",
    equityPercentage,
    tokenRewards,
    //timestamp: new Date().toISOString(),
  });

  // Update startup funding goal
  startup.fundingRaised += amount;
  startup.investor++;
  await startup.save();

  return new Response(JSON.stringify({ success: true, investment }), { status: 201 });
}
