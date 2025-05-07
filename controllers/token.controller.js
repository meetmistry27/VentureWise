import User from "../models/User.model.js"
import TokenTransaction from "../models/Token.model.js"
import { asyncHandler } from "../middleware/async.middleware.js"
import { ErrorResponse } from "../utils/errorResponse.js"

@desc    Get user token balance
@route   GET /api/tokens/balance
@access  Private
export const getTokenBalance = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id)

  res.status(200).json({
    success: true,
    data: {
      tokenBalance: user.tokenBalance,
    },
  })
})

@desc    Get user token transactions
@route   GET /api/tokens/transactions
@access  Private
export const getTokenTransactions = asyncHandler(async (req, res, next) => {
  const transactions = await TokenTransaction.find({ user: req.user.id })
    .populate("relatedStartup", "name logo")
    .sort("-createdAt")

  res.status(200).json({
    success: true,
    count: transactions.length,
    data: transactions,
  })
})

@desc    Redeem tokens for benefits
@route   POST /api/tokens/redeem
@access  Private
export const redeemTokens = asyncHandler(async (req, res, next) => {
  const { amount, benefitId } = req.body

  if (!amount || !benefitId) {
    return next(new ErrorResponse("Please provide amount and benefit ID", 400))
  }

  const user = await User.findById(req.user.id)

  // Check if user has enough tokens
  if (user.tokenBalance < amount) {
    return next(new ErrorResponse("Insufficient token balance", 400))
  }

  // Mock benefit data - in a real app, you'd fetch this from a benefits database
  const benefits = [
    { id: "priority-access", name: "Priority Access", tokenCost: 50 },
    { id: "reduced-fees", name: "Reduced Platform Fees", tokenCost: 100 },
    { id: "exclusive-event", name: "Exclusive Event Access", tokenCost: 200 },
  ]

  const benefit = benefits.find((b) => b.id === benefitId)

  if (!benefit) {
    return next(new ErrorResponse("Benefit not found", 404))
  }

  if (amount < benefit.tokenCost) {
    return next(new ErrorResponse(`This benefit requires ${benefit.tokenCost} tokens`, 400))
  }

  // Deduct tokens from user balance
  user.tokenBalance -= amount
  await user.save()

  // Create token transaction record
  const transaction = await TokenTransaction.create({
    user: req.user.id,
    amount: -amount, // Negative amount for redemption
    type: "redeem",
    description: `Redeemed for ${benefit.name}`,
    status: "completed",
  })

  res.status(200).json({
    success: true,
    data: {
      transaction,
      benefit,
      remainingBalance: user.tokenBalance,
    },
  })
})

// @desc    Transfer tokens to another user
// @route   POST /api/tokens/transfer
// @access  Private
export const transferTokens = asyncHandler(async (req, res, next) => {
  const { amount, recipientEmail } = req.body

  if (!amount || !recipientEmail) {
    return next(new ErrorResponse("Please provide amount and recipient email", 400))
  }

  // Find recipient
  const recipient = await User.findOne({ email: recipientEmail })

  if (!recipient) {
    return next(new ErrorResponse("Recipient not found", 404))
  }

  // Check if user is trying to transfer to themselves
  if (recipient._id.toString() === req.user.id) {
    return next(new ErrorResponse("Cannot transfer tokens to yourself", 400))
  }

  const sender = await User.findById(req.user.id)

  // Check if sender has enough tokens
  if (sender.tokenBalance < amount) {
    return next(new ErrorResponse("Insufficient token balance", 400))
  }

  // Deduct tokens from sender
  sender.tokenBalance -= amount
  await sender.save()

  // Add tokens to recipient
  recipient.tokenBalance += amount
  await recipient.save()

  // Create token transaction records
  const senderTransaction = await TokenTransaction.create({
    user: req.user.id,
    amount: -amount, // Negative amount for sending
    type: "transfer",
    description: `Transfer to ${recipient.name}`,
    status: "completed",
  })

  const recipientTransaction = await TokenTransaction.create({
    user: recipient._id,
    amount: amount,
    type: "transfer",
    description: `Transfer from ${sender.name}`,
    status: "completed",
  })

  res.status(200).json({
    success: true,
    data: {
      transaction: senderTransaction,
      remainingBalance: sender.tokenBalance,
    },
  })
})

@desc    Get token benefits
@route   GET /api/tokens/benefits
@access  Private
export const getTokenBenefits = asyncHandler(async (req, res, next) => {
  // Mock benefit data - in a real app, you'd fetch this from a database
  const benefits = [
    {
      id: "priority-access",
      name: "Priority Access",
      description: "Early access to new investment opportunities before they're publicly available",
      tokenCost: 50,
      icon: "Star",
    },
    {
      id: "reduced-fees",
      name: "Reduced Platform Fees",
      description: "Lower platform fees when you stake VWT tokens in your account",
      tokenCost: 100,
      icon: "Shield",
    },
    {
      id: "exclusive-event",
      name: "Exclusive Event Access",
      description: "Access to startup networking events and investor meetups",
      tokenCost: 200,
      icon: "Gift",
    },
    {
      id: "premium-insights",
      name: "Premium Market Insights",
      description: "Access to detailed market analysis and startup performance data",
      tokenCost: 300,
      icon: "LineChart",
    },
  ]

  res.status(200).json({
    success: true,
    count: benefits.length,
    data: benefits,
  })
})
