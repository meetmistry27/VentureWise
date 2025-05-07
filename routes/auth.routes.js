import express from "express"
import {
  register,
  login,
  logout,
  getMe,
  updatePassword,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/logout", logout)
router.get("/me", authMiddleware, getMe)
router.put("/updatepassword", authMiddleware, updatePassword)
router.post("/forgotpassword", forgotPassword)
router.put("/resetpassword/:resettoken", resetPassword)

export default router
