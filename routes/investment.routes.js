import express from "express"
import {
  getInvestments,
  getInvestment,
  createInvestment,
  updateInvestment,
  getInvestmentsByUser,
  getInvestmentsByStartup,
  simulateBlockchainTransaction,
} from "../controllers/investment.controller.js"
import { authMiddleware, authorize } from "../middleware/auth.middleware.js"

const router = express.Router()

router.get("/", authMiddleware, getInvestments)
router.get("/user", authMiddleware, getInvestmentsByUser)
router.get("/startup/:startupId", authMiddleware, getInvestmentsByStartup)
router.get("/:id", authMiddleware, getInvestment)
router.post("/", authMiddleware, authorize("investor"), createInvestment)
router.put("/:id", authMiddleware, updateInvestment)
router.post("/:id/simulate-blockchain", authMiddleware, simulateBlockchainTransaction)

export default router
