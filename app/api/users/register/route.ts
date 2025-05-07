// import User from "../../../../models/User.model.js";
// import dbConnect from "../../../../lib/dbconnect.ts";
// import type { NextApiRequest, NextApiResponse } from 'next'
// import { log } from "console";

// // POST /api/auth/register
// export async function handler(req: Request) {
//   try {
//     console.log(req);
    
//     await dbConnect(); // Connect to MongoDB

//     const { name, email, password, role } = await req.json();
//     console.log(req);
    

//     // Basic validation
//     if (!name || !email || !password || !role) {
//       return new Response(
//         JSON.stringify({ success: false, message: "All fields are required." }),
//         { status: 400 }
//       );
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return new Response(
//         JSON.stringify({ success: false, message: "Email already registered." }),
//         { status: 400 }
//       );
//     }

//     // Create user
//     const user = await User.create({ name, email, password, role });

//     return new Response(
//       JSON.stringify({
//         success: true,
//         message: "User registered successfully.",
//         user: {
//           id: user._id,
//           name: user.name,
//           email: user.email,
//           role: user.role,
//         },
//       }),
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Registration error:", error);
//     return new Response(
//       JSON.stringify({ success: false, message: "Internal Server Error" }),
//       { status: 500 }
//     );
//   }
// }

//new register 
// app/api/register/route.ts
// import { NextResponse } from 'next/server';
// import User from '../../../../models/User.model';
// import dbConnect from '../../../../lib/dbconnect';
// import jwt from 'jsonwebtoken';

// export async function POST(request: Request) {
//   try {
//     const { name, email, role, walletAddress } = await request.json();
    
//     // Validate required fields
//     if (!name || !email || !role || !walletAddress) {
//       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
//     }
    
//     // Connect to database
//     await dbConnect();
    
//     // Check if user with this wallet or email already exists
//     const existingUser = await User.findOne({
//       $or: [
//         { walletAddress: walletAddress.toLowerCase() },
//         { email: email.toLowerCase() }
//       ]
//     });
    
//     if (existingUser) {
//       return NextResponse.json({ 
//         error: 'User with this wallet address or email already exists' 
//       }, { status: 400 });
//     }
    
//     // Create new user
//     const newUser = await User.create({
//       name,
//       email: email.toLowerCase(),
//       role,
//       walletAddress: walletAddress.toLowerCase(),
//       createdAt: new Date()
//     });
    
//     // Generate JWT token
//     const token = jwt.sign(
//       { 
//         userId: newUser._id,
//         walletAddress: walletAddress.toLowerCase(),
//         name,
//         email,
//         role
//       },
//       process.env.JWT_SECRET || 'your-secret-key',
//       { expiresIn: '24h' }
//     );
    
//     return NextResponse.json({
//       token,
//       user: {
//         username: newUser.name,
//         email: newUser.email,
//         role: newUser.role,
//         walletAddress: newUser.walletAddress
//       }
//     }, { status: 201 });
//   } catch (error) {
//     console.error('Registration error:', error);
//     return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
//   }
// }

// app/api/register/route.ts
import { NextResponse } from 'next/server';
import User from '../../../../models/User.model';
import dbConnect from '../../../../lib/dbconnect';
import jwt from 'jsonwebtoken';

// Export a named function for the POST method
export async function POST(request: Request) {
  try {
    const { username, email, role, walletAddress } = await request.json();
    
    // Validate required fields
    if (!username || !email || !role || !walletAddress) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Connect to database
    await dbConnect();
    
    // Check if user with this wallet or email already exists
    const existingUser = await User.findOne({
      $or: [
        { walletAddress: walletAddress.toLowerCase() },
        { email: email.toLowerCase() }
      ]
    });
    
    if (existingUser) {
      return NextResponse.json({ 
        error: 'User with this wallet address or email already exists' 
      }, { status: 400 });
    }
    
    // Create new user
    const newUser = await User.create({
      username,
      email: email.toLowerCase(),
      role,
      walletAddress: walletAddress.toLowerCase(),
      createdAt: new Date()
    });
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: newUser._id,
        walletAddress: walletAddress.toLowerCase(),
        username,
        email,
        role
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    
    return NextResponse.json({
      token,
      user: {
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        walletAddress: newUser.walletAddress
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}

// Handle other methods with appropriate responses
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function PATCH() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}