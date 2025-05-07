import mongoose from "mongoose"

const InvestmentSchema = new mongoose.Schema(
  {
    investor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Startup",
      required: true,
    },
    amount: {
      type: Number,
      required: [true, "Please provide an investment amount"],
    },
    equityPercentage: {
      type: Number,
      required: [false, "Please provide equity percentage"],
    },
    tokenRewards: {
      type: Number,
      required: [false, "Please provide token rewards"],
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },
    transactionHash: {
      type: String,
      default: null,
    },
    paymentMethod: {
      type: String,
      enum: ["bank_transfer", "upi", "credit_card", "debit_card", "wallet"],
      required: false,
    },
    paymentDetails: {
      transactionId: String,
      paymentGatewayResponse: Object,
    },
  },
  { timestamps: true },
)

const Investment = mongoose.models.Investment || mongoose.model('Investment', InvestmentSchema);

export default Investment