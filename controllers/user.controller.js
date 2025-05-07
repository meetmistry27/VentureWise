import User from "../models/User.model.js"
import Investment from "../models/Investment.model.js"
import { asyncHandler } from "../middleware/async.middleware.js"
import { ErrorResponse } from "../utils/errorResponse.js"

@desc    Get all users
@route   GET /api/users
@access  Private/Admin
export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find()

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  })
})

@desc    Get single user
@route   GET /api/users/:id
@access  Private
export const getUser = asyncHandler(async (req, res, next) => {
  // Users can only view their own profile unless they're an admin
  if (req.params.id !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse("Not authorized to access this user", 403))
  }

  const user = await User.findById(req.params.id)

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404))
  }

  res.status(200).json({
    success: true,
    data: user,
  })
})

@desc    Update user
@route   PUT /api/users/:id
@access  Private
export const updateUser = asyncHandler(async (req, res, next) => {
  // Users can only update their own profile unless they're an admin
  if (req.params.id !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse("Not authorized to update this user", 403))
  }

  // Remove fields that shouldn't be updated
  const { password, role, email, ...updateData } = req.body

  const user = await User.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  })

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404))
  }

  res.status(200).json({
    success: true,
    data: user,
  })
})

@desc    Delete user
@route   DELETE /api/users/:id
@access  Private/Admin
export const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404))
  }

  await user.deleteOne()

  res.status(200).json({
    success: true,
    data: {},
  })
})

@desc    Get user portfolio
@route   GET /api/users/portfolio
@access  Private
export const getUserPortfolio = asyncHandler(async (req, res, next) => {
  // Get user's investments
  const investments = await Investment.find({
    investor: req.user.id,
    status: "completed",
  }).populate(
    "startup",
    "name tagline logo industry location fundingGoal fundingRaised riskAssessment projectedReturns",
  )

  // Calculate portfolio stats
  const totalInvested = investments.reduce((total, inv) => total + inv.amount, 0)
  const activeInvestments = investments.length

  // Calculate average return (mock data for demo)
  const averageReturn =
    investments.length > 0
      ? (Math.random() * 10 + 10).toFixed(1)
      : // Random between 10-20%
        0

  // Get user token balance
  const user = await User.findById(req.user.id)

  res.status(200).json({
    success: true,
    data: {
      stats: {
        totalInvested,
        activeInvestments,
        averageReturn,
        tokenBalance: user.tokenBalance,
      },
      investments,
    },
  })
})

@desc    Connect wallet
@route   POST /api/users/connect-wallet
@access  Private
export const connectWallet = asyncHandler(async (req, res, next) => {
  const { walletAddress } = req.body

  if (!walletAddress) {
    return next(new ErrorResponse("Please provide a wallet address", 400))
  }

  // Update user with wallet address
  const user = await User.findByIdAndUpdate(req.user.id, { walletAddress }, { new: true })

  res.status(200).json({
    success: true,
    data: {
      walletAddress: user.walletAddress,
    },
  })
})
