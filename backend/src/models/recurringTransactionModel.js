import mongoose from "mongoose"

const recurringTransactionSchema = new mongoose.Schema(
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
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      required: true,
    },
    nextOccurrence: {
      type: Date,
      required: true,
    },
    lastExecuted: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "paused"],
      default: "active",
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
)

const RecurringTransaction = mongoose.model(
  "RecurringTransaction",
  recurringTransactionSchema,
)
export default RecurringTransaction
