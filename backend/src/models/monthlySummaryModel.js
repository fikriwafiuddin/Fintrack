import mongoose from "mongoose"

const monthlySummarySchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    month: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    totalIncome: {
      type: Number,
      default: 0,
    },
    totalExpense: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

const MonthlySummary = mongoose.model("MonthlySummary", monthlySummarySchema)
export default MonthlySummary
