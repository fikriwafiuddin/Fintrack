import mongoose from "mongoose"

const categorySchema = new mongoose.Schema(
  {
    user: {
      type: String,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["income", "expense", "both"],
      required: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
)

categorySchema.pre(/^find/, function (next) {
  this.where({ deleted: { $ne: true } })
  next()
})

const Category = mongoose.model("Category", categorySchema)
export default Category
