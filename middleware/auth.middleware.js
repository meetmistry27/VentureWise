import jwt from "jsonwebtoken"
import User from "../models/User.model.js"
import { asyncHandler } from "./async.middleware.js"
import { ErrorResponse } from "../utils/errorResponse.js"

export const authMiddleware = asyncHandler(async (req, res, next) => {
  let token

  // Check for token in cookies or authorization header
  if (req.cookies.token) {
    token = req.cookies.token
  } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]
  }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401))
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Add user to request object
    req.user = await User.findById(decoded.id)

    if (!req.user) {
      return next(new ErrorResponse("User not found", 404))
    }

    next()
  } catch (error) {
    return next(new ErrorResponse("Not authorized to access this route", 401))
  }
})

// Role-based authorization middleware
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorResponse(`User role ${req.user.role} is not authorized to access this route`, 403))
    }
    next()
  }
}
