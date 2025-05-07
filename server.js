import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

// Route imports
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import startupRoutes from "./routes/startup.routes.js"
import investmentRoutes from "./routes/investment.routes.js"
import tokenRoutes from "./routes/token.routes.js"
import analyticsRoutes from "./routes/analytics.routes.js"
import EthersSignMessage from "index.tsx"

// Middleware imports
import { errorHandler } from "./middleware/error.middleware.js"
import { authMiddleware } from "./middleware/auth.middleware.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000" || "http://localhost:3001" || "http://127.0.0.1:5000",
    credentials: true,
  }),
)

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", authMiddleware, userRoutes)
app.use("/api/startups", startupRoutes) // Public routes don't need auth
app.use("/api/investments", authMiddleware, investmentRoutes)
app.use("/api/tokens", authMiddleware, tokenRoutes)
app.use("/api/analytics", authMiddleware, analyticsRoutes)
app.use("/api/index", EthersSignMessage)

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "VentureWise API is running" })
})

// Error handling middleware
app.use(errorHandler)

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB")
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error)
  })

export default app
