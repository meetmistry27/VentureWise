import mongoose from "mongoose"

const TokenTransactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: [true, "Please provide a token amount"],
    },
    type: {
      type: String,
      enum: ["reward", "redeem", "transfer", "bonus"],
      required: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a transaction description"],
    },
    relatedInvestment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Investment",
      default: null,
    },
    relatedStartup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Startup",
      default: null,
    },
    transactionHash: String,
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "completed",
    },
  },
  { timestamps: true },
)

export default mongoose.model("TokenTransaction", TokenTransactionSchema)
