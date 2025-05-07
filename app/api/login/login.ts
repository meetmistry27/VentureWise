// // app/api/login/login.ts
// import jwt from 'jsonwebtoken';
// import { verifyMessage } from 'ethers';

// const secretKey = 'mySecretKey';

// export async function loginHandlerLogic(signedMessage: string, message: string, address: string) {
//   try {
//     const recoveredAddress = verifyMessage(message, signedMessage);
//     if (recoveredAddress !== address) {
//       return { status: 401, body: { error: 'Invalid signature' } };
//     }

//     const token = jwt.sign({ address }, secretKey, { expiresIn: '10s' });
//     return { status: 200, body: { token } };
//   } catch (error) {
//     return { status: 500, body: { error: 'Server error' } };
//   }
// }


//new login 

// app/api/login/login.ts - Login handler logic file
import { ethers } from 'ethers';
import jwt from 'jsonwebtoken';
import User from '../../../models/User.model'; // Import your User model
import dbConnect from '../../../lib/dbconnect'; // Import your database connection utility

export async function loginHandlerLogic(signedMessage: string, message: string, address: string) {
  try {
    // Verify the signature
    const recoveredAddress = ethers.verifyMessage(message, signedMessage);
    
    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return {
        body: { error: 'Invalid signature' },
        status: 401
      };
    }
    
    // Connect to database
    await dbConnect();
    
    // Check if user exists in database
    const user = await User.findOne({ walletAddress: address.toLowerCase() });
    
    if (!user) {
      // User does not exist, return a specific status code and address
      return {
        body: { 
          status: 'registration_required',
          address: address.toLowerCase()
        },
        status: 200
      };
    }
    
    // User exists, generate and return a JWT token
    const token = jwt.sign(
      { 
        userId: user._id,
        walletAddress: address.toLowerCase(),
        username: user.username,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    
    return {
      body: { 
        token,
        user: {
          userId: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          walletAddress: user.walletAddress
        }
      },
      status: 200
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      body: { error: 'Authentication failed' },
      status: 500
    };
  }
}