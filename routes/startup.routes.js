import express from "express"
import {
  getStartups,
  getStartup,
  createStartup,
  updateStartup,
  deleteStartup,
  getStartupsByRiskLevel,
  getStartupsByIndustry,
  getFeaturedStartup,
} from "../controllers/startup.controller.js"
import { authMiddleware, authorize } from "../middleware/auth.middleware.js"

const router = express.Router()

// Public routes
router.get("/", getStartups)
router.get("/featured", getFeaturedStartup)
router.get("/risk/:riskLevel", getStartupsByRiskLevel)
router.get("/industry/:industry", getStartupsByIndustry)
router.get("/:id", getStartup)

// Protected routes
router.post("/", authMiddleware, authorize("startup", "admin"), createStartup)
router.put("/:id", authMiddleware, authorize("startup", "admin"), updateStartup)
router.delete("/:id", authMiddleware, authorize("startup", "admin"), deleteStartup)

export default router
