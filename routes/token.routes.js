import express from "express"
import {
  getTokenBalance,
  getTokenTransactions,
  redeemTokens,
  transferTokens,
  getTokenBenefits,
} from "../controllers/token.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"

const router = express.Router()

router.get("/balance", authMiddleware, getTokenBalance)
router.get("/transactions", authMiddleware, getTokenTransactions)
router.get("/benefits", authMiddleware, getTokenBenefits)
router.post("/redeem", authMiddleware, redeemTokens)
router.post("/transfer", authMiddleware, transferTokens)

export default router
