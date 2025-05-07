import express from "express"
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserPortfolio,
  connectWallet,
} from "../controllers/user.controller.js"
import { authMiddleware, authorize } from "../middleware/auth.middleware.js"

const router = express.Router()

router.get("/", authMiddleware, authorize("admin"), getUsers)
router.get("/portfolio", authMiddleware, getUserPortfolio)
router.get("/:id", authMiddleware, getUser)
router.put("/:id", authMiddleware, updateUser)
router.delete("/:id", authMiddleware, authorize("admin"), deleteUser)
router.post("/connect-wallet", authMiddleware, connectWallet)

export default router
