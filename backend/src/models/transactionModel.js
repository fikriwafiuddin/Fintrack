import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    date: {
      type: Date,
      default: new Date(),
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
)

const Transaction = mongoose.model("Transaction", transactionSchema)
export default Transaction
