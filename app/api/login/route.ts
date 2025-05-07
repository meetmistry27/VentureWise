// // // app/api/login/route.ts
// // import { NextResponse } from 'next/server';
// // import { loginHandlerLogic } from './login';

// // export async function POST(request: Request) {
// //   const { signedMessage, message, address } = await request.json();
// //   const result = await loginHandlerLogic(signedMessage, message, address);
// //   return NextResponse.json(result.body, { status: result.status });
// // }
// // app/api/login/route.ts - Updated login handler logic

// import { NextResponse } from 'next/server';
// import { ethers } from 'ethers';
// import jwt from 'jsonwebtoken';
// import User from '../../../models/User.model'; // Import your User model
// import dbConnect from '../../../lib/dbconnect'; // Import your database connection utility

// export async function loginHandlerLogic(signedMessage: string, message: string, address: string) {
//   try {
//     // Verify the signature
//     const recoveredAddress = ethers.verifyMessage(message, signedMessage);
    
//     if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
//       return {
//         body: { error: 'Invalid signature' },
//         status: 401
//       };
//     }
    
//     // Connect to database
//     await dbConnect();
    
//     // Check if user exists in database
//     const user = await User.findOne({ walletAddress: address.toLowerCase() });
    
//     if (!user) {
//       // User does not exist, return a specific status code and address
//       return {
//         body: { 
//           status: 'registration_required',
//           address: address.toLowerCase()
//         },
//         status: 200
//       };
//     }
    
//     // User exists, generate and return a JWT token
//     const token = jwt.sign(
//       { 
//         userId: user._id,
//         walletAddress: address.toLowerCase(),
//         username: user.name,
//         email: user.email,
//         role: user.role
//       },
//       process.env.JWT_SECRET || 'your-secret-key',
//       { expiresIn: '24h' }
//     );
    
//     return {
//       body: { 
//         token,
//         user: {
//           username: user.name,
//           email: user.email,
//           role: user.role,
//           walletAddress: user.walletAddress
//         }
//       },
//       status: 200
//     };
//   } catch (error) {
//     console.error('Login error:', error);
//     return {
//       body: { error: 'Authentication failed' },
//       status: 500
//     };
//   }
// }

//new route.ts

// app/api/login/route.ts
import { NextResponse } from 'next/server';
import { loginHandlerLogic } from './login';

// Export a named function for the POST method
export async function POST(request: Request) {
  try {
    const { signedMessage, message, address } = await request.json();
    const result = await loginHandlerLogic(signedMessage, message, address);
    return NextResponse.json(result.body, { status: result.status });
  } catch (error) {
    console.error('Login route error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
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