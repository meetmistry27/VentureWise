import Investment from "../models/Investment.model.js"
import Startup from "../models/Startup.model.js"
import User from "../models/User.model.js"
import TokenTransaction from "../models/Token.model.js"
import { asyncHandler } from "../middleware/async.middleware.js"
import { ErrorResponse } from "../utils/errorResponse.js"

// @desc    Get all investments
// @route   GET /api/investments
// @access  Private/Admin
export const getInvestments = asyncHandler(async (req, res, next) => {
  // Only allow admins to see all investments
  if (req.user.role !== "admin") {
    return next(new ErrorResponse("Not authorized to access all investments", 403))
  }

  const investments = await Investment.find().populate("investor", "name email").populate("startup", "name tagline")

  res.status(200).json({
    success: true,
    count: investments.length,
    data: investments,
  })
})

// @desc    Get single investment
// @route   GET /api/investments/:id
// @access  Private
export const getInvestment = asyncHandler(async (req, res, next) => {
  const investment = await Investment.findById(req.params.id)
    .populate("investor", "name email")
    .populate("startup", "name tagline description logo industry location fundingGoal fundingRaised")

  if (!investment) {
    return next(new ErrorResponse(`Investment not found with id of ${req.params.id}`, 404))
  }

  // Make sure user is investment owner or admin
  if (investment.investor._id.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse("Not authorized to access this investment", 403))
  }

  res.status(200).json({
    success: true,
    data: investment,
  })
})

// @desc    Create new investment
// @route   POST /api/investments
// @access  Private/Investor
export const createInvestment = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.investor = req.user.id

  // Check if startup exists
  const startup = await Startup.findById(req.body.startup)

  if (!startup) {
    return next(new ErrorResponse(`Startup not found with id of ${req.body.startup}`, 404))
  }

  // Check if investment amount is valid
  if (req.body.amount < startup.minInvestment) {
    return next(new ErrorResponse(`Investment amount must be at least ₹${startup.minInvestment}`, 400))
  }

  // Calculate equity percentage
  const equityPercentage = (req.body.amount / startup.fundingGoal) * startup.equity

  // Calculate token rewards
  const tokenRewards = Math.floor((req.body.amount / 1000) * startup.tokenRewardRate)

  // Create investment
  const investment = await Investment.create({
    ...req.body,
    equityPercentage,
    tokenRewards,
    status: "pending",
  })

  // Update startup funding raised
  startup.fundingRaised += req.body.amount
  startup.investors += 1
  await startup.save()

  // Update user total invested
  await User.findByIdAndUpdate(req.user.id, {
    $inc: { totalInvested: req.body.amount },
  })

  res.status(201).json({
    success: true,
    data: investment,
  })
})

// @desc    Update investment
// @route   PUT /api/investments/:id
// @access  Private/Admin
export const updateInvestment = asyncHandler(async (req, res, next) => {
  // Only allow admins to update investments
  if (req.user.role !== "admin") {
    return next(new ErrorResponse("Not authorized to update investments", 403))
  }

  let investment = await Investment.findById(req.params.id)

  if (!investment) {
    return next(new ErrorResponse(`Investment not found with id of ${req.params.id}`, 404))
  }

  // Update investment
  investment = await Investment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    data: investment,
  })
})

// @desc    Get investments by user
// @route   GET /api/investments/user
// @access  Private
export const getInvestmentsByUser = asyncHandler(async (req, res, next) => {
  const investments = await Investment.find({ investor: req.user.id }).populate(
    "startup",
    "name tagline logo industry location fundingGoal fundingRaised riskAssessment",
  )

  res.status(200).json({
    success: true,
    count: investments.length,
    data: investments,
  })
})

// @desc    Get investments by startup
// @route   GET /api/investments/startup/:startupId
// @access  Private
export const getInvestmentsByStartup = asyncHandler(async (req, res, next) => {
  const startup = await Startup.findById(req.params.startupId)

  if (!startup) {
    return next(new ErrorResponse(`Startup not found with id of ${req.params.startupId}`, 404))
  }

  // Only allow startup owner or admin to see investments
  if (startup.owner.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse("Not authorized to access these investments", 403))
  }

  const investments = await Investment.find({ startup: req.params.startupId }).populate("investor", "name email")

  res.status(200).json({
    success: true,
    count: investments.length,
    data: investments,
  })
})

@desc    Simulate blockchain transaction
@route   POST /api/investments/:id/simulate-blockchain
@access  Private
export const simulateBlockchainTransaction = asyncHandler(async (req, res, next) => {
  const investment = await Investment.findById(req.params.id)

  if (!investment) {
    return next(new ErrorResponse(`Investment not found with id of ${req.params.id}`, 404))
  }

  // Make sure user is investment owner
  if (investment.investor.toString() !== req.user.id) {
    return next(new ErrorResponse("Not authorized to access this investment", 403))
  }

  // Simulate blockchain transaction
  setTimeout(async () => {
    // Generate mock transaction hash
    const transactionHash =
      "0x" + Math.random().toString(16).substring(2, 16) + Math.random().toString(16).substring(2, 16)

    // Update investment status
    investment.status = "completed"
    investment.transactionHash = transactionHash
    await investment.save()

    // Add tokens to user balance
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { tokenBalance: investment.tokenRewards },
    })

    // Create token transaction record
    await TokenTransaction.create({
      user: req.user.id,
      amount: investment.tokenRewards,
      type: "reward",
      description: `Investment reward for ${investment.startup}`,
      relatedInvestment: investment._id,
      relatedStartup: investment.startup,
      transactionHash,
      status: "completed",
    })
  }, 5000) // Simulate 5 second delay

  res.status(200).json({
    success: true,
    message: "Blockchain transaction simulation started",
    data: {
      investmentId: investment._id,
      status: "processing",
    },
  })
})
