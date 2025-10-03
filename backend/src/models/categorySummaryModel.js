import mongoose from "mongoose"

const categorySummarySchema = new mongoose.Schema(
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
    totalAmount: {
      type: Number,
      default: 0,
    },
    categories: [
      {
        category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category",
          required: true,
        },
        amount: {
          type: Number,
          default: 0,
        },
      },
    ],
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
  },
  { timestamps: true }
)

const CategorySummary = mongoose.model("CategorySummary", categorySummarySchema)
export default CategorySummary
