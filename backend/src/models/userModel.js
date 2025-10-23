import mongoose from "mongoose"

const enumCurrency = ["IDR", "USD", "EUR", "GBP", "JPY", "SGD", "MYR", "THB"]

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      enum: enumCurrency,
      default: "IDR",
    },
  },
  { timestamps: true }
)

const User = mongoose.model("User", userSchema)
export default User
