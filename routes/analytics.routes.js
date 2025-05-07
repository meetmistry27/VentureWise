import express from "express"
import {
  getInvestorAnalytics,
  getStartupAnalytics,
  getPlatformAnalytics,
  getMarketTrends,
} from "../controllers/analytics.controller.js"
import { authMiddleware, authorize } from "../middleware/auth.middleware.js"

const router = express.Router()

router.get("/investor", authMiddleware, authorize("investor"), getInvestorAnalytics)
router.get("/startup", authMiddleware, authorize("startup"), getStartupAnalytics)
router.get("/platform", authMiddleware, authorize("admin"), getPlatformAnalytics)
router.get("/market-trends", authMiddleware, getMarketTrends)

export default router
