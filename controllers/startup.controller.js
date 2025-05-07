import Startup from "../models/Startup.model.js"
import { asyncHandler } from "../middleware/async.middleware.js"
import { ErrorResponse } from "../utils/errorResponse.js"

/**
 * @desc    Get all startups
 * @route   GET /api/startups
 * @access  Public
 */
export const getStartups = asyncHandler(async (req, res, next) => {
  // Copy req.query
  const reqQuery = { ...req.query }

  // Fields to exclude
  const removeFields = ["select", "sort", "page", "limit"]

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param])

  // Create query string
  let queryStr = JSON.stringify(reqQuery)

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => "$" + match)

  // Finding resource
  let query = Startup.find(JSON.parse(queryStr))

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ")
    query = query.select(fields)
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ")
    query = query.sort(sortBy)
  } else {
    query = query.sort("-createdAt")
  }

  // Pagination
  const page = Number.parseInt(req.query.page, 10) || 1
  const limit = Number.parseInt(req.query.limit, 10) || 10
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const total = await Startup.countDocuments(JSON.parse(queryStr))

  query = query.skip(startIndex).limit(limit)

  // Executing query
  const startups = await query

  // Pagination result
  const pagination = {}

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    }
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    }
  }

  res.status(200).json({
    success: true,
    count: startups.length,
    pagination,
    data: startups,
  })
})

/**
 * @desc    Get single startup
 * @route   GET /api/startups/:id
 * @access  Public
 */
export const getStartup = asyncHandler(async (req, res, next) => {
  const startup = await Startup.findById(req.params.id)

  if (!startup) {
    return next(new ErrorResponse(`Startup not found with id of ${req.params.id}`, 404))
  }

  res.status(200).json({
    success: true,
    data: startup,
  })
})

/**
 * @desc    Create new startup
 * @route   POST /api/startups
 * @access  Private
 */
export const createStartup = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.owner = req.user.id

  // Check if user already has a startup
  if (req.user.role === "startup") {
    const existingStartup = await Startup.findOne({ owner: req.user.id })

    if (existingStartup) {
      return next(new ErrorResponse(`The user with ID ${req.user.id} already has a startup`, 400))
    }
  }

  const startup = await Startup.create(req.body)

  res.status(201).json({
    success: true,
    data: startup,
  })
})

/**
 * @desc    Update startup
 * @route   PUT /api/startups/:id
 * @access  Private
 */
export const updateStartup = asyncHandler(async (req, res, next) => {
  let startup = await Startup.findById(req.params.id)

  if (!startup) {
    return next(new ErrorResponse(`Startup not found with id of ${req.params.id}`, 404))
  }

  // Check if user is startup owner or admin
  if (startup.owner.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this startup`, 401))
  }

  startup = await Startup.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(200).json({
    success: true,
    data: startup,
  })
})

/**
 * @desc    Delete startup
 * @route   DELETE /api/startups/:id
 * @access  Private
 */
export const deleteStartup = asyncHandler(async (req, res, next) => {
  const startup = await Startup.findById(req.params.id)

  if (!startup) {
    return next(new ErrorResponse(`Startup not found with id of ${req.params.id}`, 404))
  }

  // Check if user is startup owner or admin
  if (startup.owner.toString() !== req.user.id && req.user.role !== "admin") {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this startup`, 401))
  }

  await startup.deleteOne()

  res.status(200).json({
    success: true,
    data: {},
  })
})

/**
 * @desc    Get startups by risk level
 * @route   GET /api/startups/risk/:riskLevel
 * @access  Public
 */
export const getStartupsByRiskLevel = asyncHandler(async (req, res, next) => {
  const startups = await Startup.find({
    "riskAssessment.riskLevel": req.params.riskLevel,
    status: "active",
  })

  res.status(200).json({
    success: true,
    count: startups.length,
    data: startups,
  })
})

/**
 * @desc    Get startups by industry
 * @route   GET /api/startups/industry/:industry
 * @access  Public
 */
export const getStartupsByIndustry = asyncHandler(async (req, res, next) => {
  const startups = await Startup.find({
    industry: req.params.industry,
    status: "active",
  })

  res.status(200).json({
    success: true,
    count: startups.length,
    data: startups,
  })
})

/**
 * @desc    Get featured startup
 * @route   GET /api/startups/featured
 * @access  Public
 */
export const getFeaturedStartup = asyncHandler(async (req, res, next) => {
  // Get a random featured startup with low risk and high funding percentage
  const featuredStartup = await Startup.findOne({
    "riskAssessment.riskLevel": "Low Risk",
    status: "active",
  })
    .sort({ fundingRaised: -1 })
    .limit(1)

  if (!featuredStartup) {
    return next(new ErrorResponse("No featured startup found", 404))
  }

  res.status(200).json({
    success: true,
    data: featuredStartup,
  })
})
